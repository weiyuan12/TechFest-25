import { useState, useEffect, useRef, useCallback } from "react";
import { Image, Search, ExternalLink } from "lucide-react";
import { IconButton } from "@material-tailwind/react";
import Header from "../components/Header";

export default function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsEndRef = useRef(null);
  const [query, setQuery] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    const fileUpload = event.target.files[0];
    setFile(fileUpload);
    setImagePreview(URL.createObjectURL(fileUpload));
    console.log(fileUpload);
  };
  const removeImage = () => {
    setImagePreview(null);
    setFile(null);
  };

  async function handleSearch(event) {
    event.preventDefault();
    if (file) {
      const response = await sendSearchImageRequest(file);
    } else {
      const response = await sendSearchTextRequest(query);
    }
    console.log(response);
    navigate("/search");
  }

  // Scroll to bottom whenever searchResults change
  useEffect(() => {
    if (resultsEndRef.current) {
      resultsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchResults]);

  // Function to render confidence level with appropriate color
  const renderConfidence = (confidence) => {
    let color;
    if (confidence >= 80) color = "text-green-600";
    else if (confidence >= 50) color = "text-yellow-600";
    else color = "text-red-600";

    return <span className={`font-bold ${color}`}>{confidence}%</span>;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center p-6 overflow-y-auto">
        <div className="w-full max-w-3xl">
          {/* Welcome message if no results yet */}
          {searchResults.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Welcome to FactFinder
              </h2>
              <p className="text-gray-600 mb-6">
                Search for a claim, news story, or topic to get a fact-check
                analysis.
              </p>
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-blue-100 rounded-lg text-blue-800 text-sm">
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

          {/* Chat-like results */}
          <div className="space-y-6 pb-24">
            {searchResults.map((result, index) => (
              <div key={index} className="flex flex-col">
                {/* User query */}
                <div className="flex justify-end mb-3">
                  <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-[80%]">
                    {result.query}
                  </div>
                </div>

                {/* Response */}
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none shadow-md p-4 sm:p-5 max-w-[90%]">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {result.data.category}
                      </div>
                      <div className="text-sm">
                        Confidence: {renderConfidence(result.data.confidence)}
                      </div>
                    </div>

                    <div className="text-gray-700 mb-5 prose max-w-none">
                      <p>{result.data.explanation}</p>
                    </div>

                    {result.data.relatedArticles &&
                      result.data.relatedArticles.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800 mb-2">
                            Related Articles
                          </h3>
                          <ul className="space-y-2">
                            {result.data.relatedArticles.map((article, idx) => (
                              <li
                                key={idx}
                                className="bg-gray-50 p-2 rounded-md"
                              >
                                <a
                                  href={article.url}
                                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {article.title}
                                  <ExternalLink
                                    size={14}
                                    className="ml-1 flex-shrink-0"
                                  />
                                </a>
                                {article.source && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Source: {article.source}
                                  </p>
                                )}
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
        <form className="w-2/3 mt-auto" onSubmit={handleSearch}>
          <div className="flex items-center bg-white rounded-lg border-2 border-blue-600 shadow-lg">
            <textarea
              type="text"
              placeholder="Search for a claim, news story, or topic..."
              className="w-full px-6 py-4 text-2xl text-black bg-transparent rounded-full focus:outline-none"
              value={query}
              rows={2}
              onChange={(e) => setQuery(e.target.value)}
            />

            {/* Image Upload Button */}
            <label
              htmlFor="image-upload"
              className="cursor-pointer mx-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              <input
                id="image-upload"
                ref={inputFile}
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                className="hidden"
                rows='3'
              />
              <IconButton onClick={onButtonClick} id="upload" type="button">
                <Image className="stroke-blue-600 stroke-2 h-8 w-8 transition-transform duration-200 transform hover:scale-105" />
              </IconButton>
            </label>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-lg transition-transform duration-200 transform hover:scale-105 mr-2 flex items-center justify-center cursor-pointer"
            >
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg> */}
              <Search
                size={28}
                viewBox="0 0 24 24"
                className="transition-transform duration-200 transform hover:scale-105"
              />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
