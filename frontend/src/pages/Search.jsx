import { useState } from "react";
import { Search, ExternalLink } from 'lucide-react';
import { useEffect } from "react";

export default function SearchResults() {

  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || ""; // Get query from URL

  const [searchFocused, setSearchFocused] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  // Hardcoded response data
  const mockResponseData = {
    category: "Misleading Claim",
    confidence: 85,
    explanation: "This claim contains elements of truth but lacks important context. While the initial study did show promising results, subsequent larger studies demonstrated that the effects were significantly smaller than initially reported. Most experts in the field now agree that while there are benefits, they are more modest than what is being claimed in popular media. Additional research is still ongoing to determine the full extent of effectiveness across different populations.",
    relatedArticles: [
      {
        title: "Comprehensive Analysis of Recent Clinical Trials",
        url: "https://example.com/article1",
        source: "Journal of Medical Research"
      },
      {
        title: "Expert Panel Reviews Evidence and Provides Updated Guidelines",
        url: "https://example.com/article2",
        source: "Health Policy Institute"
      },
      {
        title: "What the Latest Data Actually Tells Us: A Fact Check",
        url: "https://example.com/article3",
        source: "Science Fact Checker"
      }
    ]
  };

  const exampleQueries = [
    "COVID-19 vaccine safety",
    "climate change facts",
    "viral social media claim",
    "election integrity",
  ];

  const handleExampleClick = (query) => {
    setSearchQuery(query);
  };

  const handleSearch = async (event) => {
    // event.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSearchResults(null);

    // const response = await fetch('/api/search', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ query: searchQuery }),
    //   });
      
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch results');
    //   }
      
    //   const data = await response.json();
    //   setSearchResults(data);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Return hardcoded data instead of making an API call
        setSearchResults(mockResponseData);
        setIsLoading(false);
      } catch (err) {
        setError("An error occurred while searching");
        setIsLoading(false);
      }
    }, 1200); // Simulate network delay of 1.2 seconds
  };

  // Auto-trigger search when the page loads with a query
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  // Function to render confidence level with appropriate color
  const renderConfidence = (confidence) => {
    let color;
    if (confidence >= 80) color = 'text-green-600';
    else if (confidence >= 50) color = 'text-yellow-600';
    else color = 'text-red-600';
    
    return <span className={`font-bold ${color}`}>{confidence}%</span>;
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="font-bold text-xl text-blue-600">FactFinder</div>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Resources</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Contact</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Find factual information you can trust
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search for claims, news stories, or topics to get fact-checked information from reliable sources.
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="relative">
            <div 
              className={`flex items-center bg-white rounded-xl border-2 ${
                searchFocused ? 'border-blue-500 shadow-lg' : 'border-gray-200 shadow-md'
              } transition-all duration-300`}
            >
              <input
                type="text"
                placeholder="Search for a claim, news story, or topic..."
                className="w-full px-6 py-4 h-14 text-lg rounded-l-xl focus:outline-none transition-all duration-200"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 h-14 hover:bg-blue-700 text-white px-6 py-4 rounded-r-[0.5rem] transition-all duration-200 flex items-center cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Search size={22} className="mr-2" />
                )}
                <span>{isLoading ? "Searching..." : "Search"}</span>
              </button>
            </div>
          </form>
          
          {!searchResults && !isLoading && !error && (
            <div className="mt-6">
              <p className="text-gray-600 text-sm mb-3 font-medium">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQueries.map((query, index) => (
                  <button
                    key={index}
                    className="bg-white hover:bg-gray-50 text-gray-700 text-sm py-2 px-4 rounded-full border border-gray-200 shadow-sm transition-colors duration-200"
                    onClick={() => handleExampleClick(query)}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Error message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {/* Search results */}
          {searchResults && (
            <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {searchResults.category}
                  </div>
                  <div className="ml-4 text-sm">
                    Confidence: {renderConfidence(searchResults.confidence)}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-3">Fact Check Result</h2>
                
                <div className="text-gray-700 mb-6 prose max-w-none">
                  <p>{searchResults.explanation}</p>
                </div>
                
                {searchResults.relatedArticles && searchResults.relatedArticles.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Related Articles</h3>
                    <ul className="space-y-3">
                      {searchResults.relatedArticles.map((article, index) => (
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
            </div>
          )}
        </div>
      </main>
      
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