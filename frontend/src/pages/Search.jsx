import { useState, useEffect, useRef, useContext } from "react";
import { Search, ExternalLink, Image } from "lucide-react";
import Header from "../components/Header";
import { UserContext } from "../context/UserContext";

export default function SearchResults() {
  const {user, setUser} = useContext(UserContext)
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allQueries, setAllQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsEndRef = useRef(null);
  const inputFile = useRef(null);

  // Fetch all queries from backend on component mount
  useEffect(() => {
    fetchAllQueries();
    console.log(allQueries);
  }, []);

  useEffect(() => {
    console.log(allQueries);
  }, [allQueries]);

  // Function to fetch all queries
  const fetchAllQueries = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/query/all?username=" + user);
      if (!response.ok) {
        throw new Error("Failed to fetch queries");
      }
      const data = await response.json();
      setAllQueries(data);
    } catch (err) {
      console.error("Error fetching queries:", err);
      setError(err.message);
    }
  };

  // Simulate search function - would be replaced with actual API call
  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file.name);
    }
  };

  // Trigger file input click
  const onButtonClick = () => {
    inputFile.current.click();
  };

  // Scroll to bottom whenever searchResults change
  useEffect(() => {
    if (resultsEndRef.current) {
      resultsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchResults]);

  // Function to render truth score with appropriate color
  const renderTruthScore = (score) => {
    let color;
    if (score >= 80) color = "text-green-600";
    else if (score >= 50) color = "text-yellow-600";
    else color = "text-red-600";

    return <span className={`font-bold ${color}`}>{score}%</span>;
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Header */}
      <Header user={user}/>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center p-6 overflow-y-auto">
        <div className="w-3/5">
          {/* Welcome message if no results yet */}
          {searchResults.length === 0 && allQueries.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Welcome to FactFinder
              </h2>
              <p className="text-gray-600 mb-6">
                Search for a claim, news story, or topic to get a fact-check
                analysis.
              </p>
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-blue-100 rounded-lg text-blue-800 text-l">
                  <p className="font-medium">Try searching for:</p>
                  <ul className="mt-2 space-y-1 text-left pl-5">
                    <li>"Does drinking coffee cause cancer?"</li>
                    <li>"Are electric cars better for the environment?"</li>
                    <li>"Do vaccines cause autism?"</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Previously stored queries */}
          {allQueries.length > 0 && searchResults.length === 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                Previous Fact Checks
              </h2>
              <div className="space-y-12">
                {allQueries.map((item) => (
                  <div key={item.messageId} className="flex flex-col">
                    <div className="flex justify-end mb-3">
                      <div className="flex flex-col">
                        <div className="bg-blue-600 text-white text-xl px-4 py-3 rounded-2xl rounded-tr-none max-w-[80%]">
                          {item.query == null && item.image!= null ? <div className="mb-4 rounded-lg overflow-hidden">
                            <img
                              src={`data:image/jpeg;base64,${item.image}`}
                              alt="Uploaded content"
                              className="w-full object-contain max-h-64"
                            />
                          </div>: item.query}
                        </div>
                        <div className="text-m text-gray-500 mt-1 text-right mr-1">
                          {formatDate(item.createdAt)} by {item.username}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-start mb-4">
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none shadow-md p-4 sm:p-5 max-w-[90%]">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-l font-medium">
                            {item.category}
                          </div>
                          <div className="text-l">
                            Truth Score: {renderTruthScore(item.truthScore)}
                          </div>
                        </div>

                        {item.image && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img
                              src={`data:image/jpeg;base64,${item.image}`}
                              alt="Uploaded content"
                              className="w-full object-contain max-h-64"
                            />
                          </div>
                        )}

                        <div className="text-gray-700 mb-5 prose max-w-none">
                          <p className="text-xl">{item.reasoning}</p>
                        </div>
                        {item.messages && item.messages.length > 0 && (
                          <div className="mt-4 border-t pt-3">
                            <details className="group">
                              <summary className="flex items-center cursor-pointer text-l font-medium text-blue-700 hover:text-blue-800">
                                <span className="mr-2">
                                  View Model Workings
                                </span>
                                <svg
                                  className="w-5 h-5 transition-transform group-open:rotate-180"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                              </summary>
                              <div className="mt-3 text-l bg-gray-50 p-3 rounded-md max-h-240 overflow-y-auto">
                                {item.messages
                                  .filter(
                                    (message) =>
                                      message.content != "" &&
                                      message.type != "human"
                                  )
                                  .map((message, idx) => (
                                    <div
                                      key={idx}
                                      className="mb-3 pb-3 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0"
                                    >
                                      <div className="flex items-start mb-1">
                                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-m font-semibold mr-2">
                                          {message.type != "ai"
                                            ? message.name
                                            : "Result"}
                                        </span>
                                        {message.id && (
                                          <span className="text-m text-gray-500">
                                            ID: {message.id.substring(0, 8)}...
                                          </span>
                                        )}
                                      </div>
                                      <pre className="whitespace-pre-wrap text-m text-gray-700 mt-1 font-mono">
                                        {message.content}
                                      </pre>
                                    </div>
                                  ))}
                              </div>
                            </details>
                          </div>
                        )}

                        {item.citations && item.citations.length > 0 && (
                          <div>
                            <h3 className="text-l font-semibold text-gray-800 mb-2">
                              Citations
                            </h3>
                            <ul className="space-y-2">
                              {item.citations.map((citation, idx) => (
                                <li
                                  key={idx}
                                  className="bg-gray-50 p-2 rounded-md text-l text-gray-700"
                                >
                                  {citation}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat-like results */}
          <div className="space-y-6 pb-24">
            {searchResults.map((result, index) => (
              <div key={result.messageId} className="flex flex-col">
                {/* User query */}
                <div className="flex justify-end mb-3">
                  <div className="flex flex-col">
                    <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-[80%]">
                      {result.query}
                    </div>
                    <div className="text-m text-gray-500 mt-1 text-right mr-1">
                      {formatDate(result.createdAt)} by {result.username}
                    </div>
                  </div>
                </div>

                {/* Response */}
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none shadow-md p-4 sm:p-5 max-w-[90%]">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {result.category}
                      </div>
                      <div className="text-sm">
                        Truth Score: {renderTruthScore(result.truthScore)}
                      </div>
                    </div>

                    {result.image && (
                      <div className="mb-4 border rounded-lg overflow-hidden">
                        <img
                          src={`data:image/jpeg;base64,${result.image}`}
                          alt="Uploaded content"
                          className="w-full object-contain max-h-64"
                        />
                      </div>
                    )}

                    <div className="text-gray-700 mb-5 prose max-w-none">
                      <p>{result.reasoning}</p>
                    </div>

                    {result.citations && result.citations.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-2">
                          Citations
                        </h3>
                        <ul className="space-y-2">
                          {result.citations.map((citation, idx) => (
                            <li
                              key={idx}
                              className="bg-gray-50 p-2 rounded-md text-sm text-gray-700"
                            >
                              {citation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={resultsEndRef} />
          </div>
        </div>

        {/* Input form at the bottom */}
        <div className="w-full max-w-2xl mt-auto mb-4">
          <form className="w-full" onSubmit={handleSearch}>
            <div className="flex items-center bg-white rounded-lg border-2 border-blue-600 shadow-lg overflow-hidden">
              <textarea
                placeholder="Search for a claim, news story, or topic..."
                className="w-full px-6 py-4 text-base md:text-lg text-black bg-transparent focus:outline-none resize-none min-h-[60px]"
                value={query}
                rows={2}
                onChange={(e) => setQuery(e.target.value)}
              />

              {/* Image Upload Button */}
              <div className="flex-shrink-0 px-2">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-gray-500 hover:text-blue-600 transition-colors duration-200"
                >
                  <input
                    id="image-upload"
                    ref={inputFile}
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={onButtonClick}
                    id="upload"
                    type="button"
                    className="p-2 hover:bg-blue-50 rounded-full cursor-pointer"
                  >
                    <Image className="stroke-blue-600 stroke-2 h-6 w-6 transition-transform duration-200 transform hover:scale-105" />
                  </button>
                </label>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white w-14 h-22 flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Search
                    size={24}
                    className="transition-transform duration-200 transform hover:scale-105"
                  />
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
