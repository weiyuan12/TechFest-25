import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';

const TopSearches = () => {
  
  // Sample data for top searches
  const topSearches = [
    { id: 1, query: "COVID booster effectiveness", searches: 12458, trending: true },
    { id: 2, query: "Climate change statistics 2025", searches: 9873, trending: false },
    { id: 3, query: "AI-generated news detection", searches: 8645, trending: true },
    { id: 4, query: "Election fact checking", searches: 7920, trending: true },
    { id: 5, query: "Vaccine misinformation debunked", searches: 6534, trending: false },
    { id: 6, query: "Social media false claims", searches: 5872, trending: false }
  ];

  return (
    <div 
      className={`w-full bg-white p-24 shadow-sm transition-all duration-1000 ease-out`}
    >
      <div className="mx-auto">
        <div className={`flex items-center justify-between mb-16 transition-all duration-700 delay-100`}>
          <h2 className="text-5xl font-bold text-gray-900">Top Keywords searched this month</h2>
          <div className="text-blue-600 flex items-center">
            <TrendingUp size={40} className="mr-2" />
            <span className='text-2xl'>Trending Topics</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 justify-center items-center">
          {topSearches.map((search, index) => (
            <div 
              key={search.id} 
              className={`bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all duration-700 w-1/2 min-h-40`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg text-gray-900">{search.query}</h3>
                  <p className="text-gray-500 text-m mt-1">{search.searches.toLocaleString()} searches</p>
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
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-8 transition-all duration-700 delay-700`}>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
            View All Top Searches
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSearches;