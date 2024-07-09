import './App.scss';
import ListingPage from './components/listingPage/ListingPage';
import { createContext, useCallback, useEffect, useState } from 'react';
import { fetchMovieData } from './apis/apis';
import { STATUS_MAP } from './utils/constants';
import ContextProvider from './utils/ContextProvider';
import SearchBox from './components/search/SearchBox';
import Loader from './components/commons/loader/Loader';


function App() {

  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasFetchedAllMovies, setHasFetchedAllMovies] = useState(false);

  const handleScroll = useCallback((e, ref) => {
    const numberOfRows = Math.ceil(allMovies.length / 3);
    console.log("scroll", e);
    console.log("handle scrolling", window.scrollY, numberOfRows, document.documentElement.clientHeight);
    /* Consider 1 row height to be 130px.
    For n number of rows total height of content will be n*130;
    now when scroll position is (n-1)*130 -20; -> make an api call.
    */
    // if ((numberOfRows - 1) * 130 - 30 > window.scrollY) {
    //   console.log("yes height is there")
    // }
    if (window.scrollY + 400 >= document.documentElement.clientHeight) {

      if (!isLoading) {
        console.log("call api");
        fetchData();
      }

    }
  }, [allMovies.length, isLoading]);

  useEffect(() => {

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [allMovies, isLoading]);


  const fetchData = async () => {
    try {
      if (hasFetchedAllMovies) return;
      setIsLoading(true);
      const result = await fetchMovieData({ currentPage: pageIndex });
      console.log("data", result?.data?.page?.["content-items"]);
      if (result.status == STATUS_MAP.OK) {
        let newMovies = result?.data?.page?.["content-items"]?.content
        //newMovies = newMovies.slice(0, 3);
        console.log("new movies", newMovies);

        setAllMovies(prev => {
          return [
            ...prev,
            ...newMovies
          ]

        });
        setPageIndex((prev) => prev + 1);
      } else {
        console.log(result);
        throw new Error();
      }
    } catch (err) {
      if (err.response.status == STATUS_MAP.FORBIDDEN) {
        setHasFetchedAllMovies(true);
      }
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }

  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <ContextProvider.Provider value={{
        allMovies,
        isLoading,
        pageIndex
      }}>
        <SearchBox />
        <ListingPage />
      </ContextProvider.Provider>
    </div>
  );
}

export default App;
