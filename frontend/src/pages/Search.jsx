import { useState, useEffect, useRef } from "react";
import { Search, ExternalLink } from 'lucide-react';
import Header from "../components/Header";

export default function SearchResults() {
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || ""; // Get query from URL

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hardcoded response data (you can replace with API call later)
  const mockResponseData = {
    category: "Misleading Claim",
    confidence: 85,
    explanation: "This claim contains elements of truth but lacks important context...",
    relatedArticles: [
      { title: "Comprehensive Analysis", url: "https://example.com/article1", source: "Journal of Medical Research" },
      { title: "Expert Panel Reviews", url: "https://example.com/article2", source: "Health Policy Institute" },
      { title: "Fact Check", url: "https://example.com/article3", source: "Science Fact Checker" }
    ]
  };

  const resultsContainerRef = useRef(null);  // Ref for the results container

  // Scroll to bottom whenever searchResults change
  useEffect(() => {
    if (resultsContainerRef.current) {
      resultsContainerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [searchResults]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Update the results with the current search query and results
        setSearchResults((prevResults) => [
          ...prevResults,
          { query: searchQuery, data: mockResponseData }
        ]);
        setIsLoading(false);
      } catch (err) {
        setError("An error occurred while searching");
        setIsLoading(false);
      }
    }, 1200); // Simulate network delay of 1.2 seconds
  };

  // Function to render confidence level with appropriate color
  const renderConfidence = (confidence) => {
    let color;
    if (confidence >= 80) color = 'text-green-600';
    else if (confidence >= 50) color = 'text-yellow-600';
    else color = 'text-red-600';
    
    return <span className={`font-bold ${color}`}>{confidence}%</span>;
  };

  return (
    <div className="flex flex-col w-full h-screen from-blue-50 to-indigo-100">
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto pb-20">
        <div className="w-full max-w-3xl">
          {/* Chat-like results */}
          <div className="mb-16">
            <div ref={resultsContainerRef}> {/* This is the container to scroll to */}
              {searchResults.map((result, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {result.data.category}
                    </div>
                    <div className="ml-4 text-sm">
                      Confidence: {renderConfidence(result.data.confidence)}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-3">Fact Check Result</h2>

                  <div className="text-gray-700 mb-6 prose max-w-none">
                    <p>{result.data.explanation}</p>
                  </div>

                  {result.data.relatedArticles && result.data.relatedArticles.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Related Articles</h3>
                      <ul className="space-y-3">
                        {result.data.relatedArticles.map((article, index) => (
                          <li key={index} className="bg-gray-50 p-3 rounded-md">
                            <a 
                              href={article.url} 
                              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {article.title}
                              <ExternalLink size={16} className="ml-2" />
                            </a>
                            {article.source && (
                              <p className="text-sm text-gray-500 mt-1">Source: {article.source}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Input at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t-2 border-gray-200">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for a claim, news story, or topic..."
            className="w-full px-6 py-4 h-14 text-lg rounded-l-xl focus:outline-none transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <button
            type="submit"
            className="bg-blue-600 h-14 w-14 flex justify-center items-center rounded-lg hover:bg-blue-700 text-white transition-all duration-200 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Search size={22} className="" />
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>© 2025 FactFinder. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600">Privacy</a>
              <a href="#" className="hover:text-blue-600">Terms</a>
              <a href="#" className="hover:text-blue-600">Help</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
