import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';

const TopSearches = () => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  
  // Sample data for top searches
  const topSearches = [
    { id: 1, query: "COVID booster effectiveness", searches: 12458, trending: true },
    { id: 2, query: "Climate change statistics 2025", searches: 9873, trending: false },
    { id: 3, query: "AI-generated news detection", searches: 8645, trending: true },
    { id: 4, query: "Election fact checking", searches: 7920, trending: true },
    { id: 5, query: "Vaccine misinformation debunked", searches: 6534, trending: false },
    { id: 6, query: "Social media false claims", searches: 5872, trending: false }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when component enters viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can stop observing
          observer.unobserve(entry.target);
        }
      },
      {
        // Component will start to fade in when it's 10% visible
        threshold: 0.1,
        // Start observing a bit before the component comes into view
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    // Clean up observer on component unmount
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={componentRef}
      className={`w-full bg-white py-12 px-4 shadow-sm transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`flex items-center justify-between mb-8 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <h2 className="text-4xl font-bold text-gray-900">Top Keywords searched this month</h2>
          <div className="text-blue-600 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            <span>Trending Topics</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSearches.map((search, index) => (
            <div 
              key={search.id} 
              className={`bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg text-gray-900">{search.query}</h3>
                  <p className="text-gray-500 text-sm mt-1">{search.searches.toLocaleString()} searches</p>
                </div>
                {search.trending && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <TrendingUp size={12} className="mr-1" /> 
                    Trending
                  </span>
                )}
              </div>
              <div className="mt-3 flex justify-between items-center">
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  View fact checks
                </a>
                <button className="text-sm text-gray-600 hover:text-blue-600">
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-8 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200">
            View All Top Searches
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSearches;