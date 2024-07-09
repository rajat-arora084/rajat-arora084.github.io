import { useCallback, useEffect, useState } from 'react';
import { fetchMovieData } from './apis/apis';
import './App.scss';
import ListingPage from './components/listingPage/ListingPage';
import SearchBox from './components/search/SearchBox';
import { STATUS_MAP } from './utils/constants';
import ContextProvider from './utils/ContextProvider';


function App() {

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


  const fetchData = async () => {
    try {
      if (hasFetchedAllMovies) return;
      setIsLoading(true);
      const result = await fetchMovieData({ currentPage: pageIndex });
      if (result.status === STATUS_MAP.OK) {
        let newMovies = result?.data?.page?.["content-items"]?.content

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
      if (err.response.status === STATUS_MAP.FORBIDDEN) {
        setHasFetchedAllMovies(true);
      }
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }

  }
  useEffect(() => {
    fetchData();
  },//eslint-disable-next-line
    []);

  const onChangeTextSearch = (e) => {
    setTextSearch(prev => e.target.value);
  }

  useEffect(() => {
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
          onChangeTextSearch={onChangeTextSearch} />
        <ListingPage />
      </ContextProvider.Provider>
    </div>
  );
}

export default App;
