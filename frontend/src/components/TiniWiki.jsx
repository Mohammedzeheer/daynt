import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Axios } from '../api/axiosInstance';
import { FaSearch } from "react-icons/fa";

function TiniWiki() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPageContent, setSelectedPageContent] = useState('');

  const handleSearch = async () => {
    try {
      const response = await Axios.get(`search/${searchTerm}`); 
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePageClick = async (title) => {
    try {
      const response = await Axios.get(`read/${encodeURIComponent(title)}`);
      setSelectedPageContent(DOMPurify.sanitize(response.data.content));
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    const updateSearchResultsHeight = () => {
      const wikiContentHeight = document.querySelector('.wiki-page-content').offsetHeight;
      const searchResultsContainer = document.getElementById('searchResultsContainer');
      if (searchResultsContainer) {
        searchResultsContainer.style.height = `${wikiContentHeight}px`;
      }
    };

    updateSearchResultsHeight();
  }, [selectedPageContent]);

  return (
    <div className="App bg-gray-100 min-h-screen font-sans">
       <header className="bg-white border-b p-4">
         <h1 className="text-2xl font-bold">TinyWiki</h1>
         <div className="mt-2 flex">
           <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // className="border border-gray-300 px-2 py-1 rounded-l w-full"
            className="border border-gray-300 px-2 py-1 rounded-l w-full focus:border-customBlue1 focus:outline-none"

          />
          <button
            onClick={handleSearch}
            className="bg-customBlue1 hover:bg-blue-600 text-white px-4 py-1 rounded-r ml-1"
          >
            {/* Search */}
            <FaSearch />
          </button>
        </div>
      </header>
      <main className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-xl font-semibold mt-4">Search Results</h2>
          <div className="mt-2" id="searchResultsContainer">
                    <ul className="mt-2">
            {searchResults.map((result) => (
              <li
                key={result.pageid}
                onClick={() => handlePageClick(result.title)}
                className="cursor-pointer border-b py-2"
              >
                <h3 className="text-blue-500 hover:underline">{result.title}</h3>
                <p
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result.snippet) }}
                ></p>
              </li>
            ))}
          </ul>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-xl font-semibold mt-4">Wiki Page Content</h2>
          <div className="mt-2 text-justify wiki-page-content" style={{ maxHeight: '900px', overflowY: 'auto' }}>
            {selectedPageContent ? (
              <div dangerouslySetInnerHTML={{ __html: selectedPageContent }} />
            ) : (
              <p>Select an article to view its content.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TiniWiki;