import React, { useCallback, useEffect, useState } from 'react';
import { fetchMovieData } from './apis/apis';
import './App.scss';
import ListingPage from './components/listingPage/ListingPage';
import SearchBox from './components/search/SearchBox';
import { STATUS_MAP } from './utils/constants';
import ContextProvider from './utils/ContextProvider';


function App() {

  // Inital states for maintaining movies list, loader state, pageNumber & text search
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasFetchedAllMovies, setHasFetchedAllMovies] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleScroll = useCallback((e, ref) => {
    //const numberOfRows = Math.ceil(filteredMovies.length / 3);
    /* Consider 1 row height to be 130px.
    For n number of rows total height of content will be n*130;
    now when scroll position is (n-1)*130 -20; -> make an api call.
    */
    // if ((numberOfRows - 1) * 130 - 30 > window.scrollY) {
    //   console.log("yes height is there")
    // }
    if (window.scrollY + 400 >= document.documentElement.clientHeight) {

      if (!isLoading) {
        fetchData();
      }

    }
  }, //eslint-disable-next-line
    [isLoading]);

  useEffect(() => {

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, //eslint-disable-next-line 
    [allMovies, isLoading]);

  // Fetch data via api call.
  const fetchData = async () => {
    try {
      if (hasFetchedAllMovies) return;
      setIsLoading(true);
      const result = await fetchMovieData({ currentPage: pageIndex });
      if (result.status === STATUS_MAP.OK) {
        let newMovies = result?.data?.page?.["content-items"]?.content

        // Update the current page movies list to existing list.
        setAllMovies(prev => {
          return [
            ...prev,
            ...newMovies
          ]

        });
        setTimeout(() => setPageIndex((prev) => prev + 1));
      } else {
        throw new Error();
      }
    } catch (err) {
      // When api gives 403, means that all movies have been fetched.
      if (err.response.status === STATUS_MAP.FORBIDDEN) {
        setHasFetchedAllMovies(true);
      }
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }

  }

  // Fetch the 1st list of movies on mounting.
  useEffect(() => {
    fetchData();
  },//eslint-disable-next-line
    []);

  const onChangeTextSearch = (e) => {
    setTextSearch(prev => e.target.value);
  }

  useEffect(() => {
    // Filter all movies based on the search text.
    if (textSearch) {
      let lowerCaseTextSearch = textSearch.toLowerCase();
      let filteredDataOfMovies = allMovies.filter(movieData => {
        if (movieData?.name?.toLowerCase().includes(lowerCaseTextSearch))
          return true;
        return false;
      });
      setFilteredMovies(filteredDataOfMovies);
    } else {
      setFilteredMovies([...allMovies]);
    }
  }, [textSearch, allMovies]);

  const onBackBtnClick = () => {
    setTextSearch(""); // Reset text bar.
  }


  return (
    <div className="App">
      <ContextProvider.Provider value={{
        allMovies,
        isLoading,
        pageIndex,
        hasFetchedAllMovies,
        filteredMovies
      }}>
        <SearchBox
          textSearch={textSearch}
          onChangeTextSearch={onChangeTextSearch}
          onBackBtnClick={onBackBtnClick} />
        <ListingPage />
      </ContextProvider.Provider>
    </div>
  );
}

export default App;
