import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { FALSE } from "sass";
import ListingPage from "../components/listingPage/ListingPage";
import ContextProvider from "../utils/ContextProvider";

describe("Listing page test", () => {


    const getMockComponent = ({
        isLoading = false,
        pageIndex = 1,
        hasFetchedAllMovies,
        filteredMovies = []
    }) => {
        return <><ContextProvider.Provider value={{
            isLoading: isLoading,
            pageIndex,
            hasFetchedAllMovies,
            filteredMovies: [{
                "name": "The Birds",
                "poster-image": "poster1.jpg"
            },
            {
                "name": "Rear Window",
                "poster-image": "poster2.jpg"
            },
            {
                "name": "Family Pot",
                "poster-image": "poster3.jpg"
            },
            {
                "name": "Family Pot - a title with big name.",
                "poster-image": "poster2.jpg"
            }]
        }}>
            <ListingPage />
        </ContextProvider.Provider ></>
    }

    it("Movies are loading", () => {
        render(getMockComponent({
            isLoading: true,
        }));
        const loaderContainer = screen.getByText((_, ele) => ele.classList.contains("loader-container"));
        expect(loaderContainer).toBeVisible();
    })

    it("Movies are listed", () => {
        render(getMockComponent({}));
        screen.debug();
        const containerGrid = screen.getByText((_, ele) => ele.classList.contains("container-fluid"));
        expect(containerGrid).toBeVisible();
        const rowELements = within(containerGrid).getAllByText((_, ele) => ele.classList.contains("row"));
        expect(rowELements.length).toBe(2); // Total number of rows are 2. 
        const [theBirdsMovie,] = within(rowELements[0]).getAllByText((_, ele) => ele.classList.contains("movie-pane"));
        expect(theBirdsMovie).toBeVisible();
        const movieTitle = within(theBirdsMovie).getByText((_, ele) => ele.classList.contains("truncated-text"));
        expect(movieTitle.innerHTML).toBe("The Birds");
    });

    it("One movie name is large", async () => {
        window.innerWidth = 300;
        await waitFor(() =>
            fireEvent(window, new Event('resize'))
        );
        render(getMockComponent({}));
        screen.debug();
        const containerGrid = screen.getByText((_, ele) => ele.classList.contains("container-fluid"));
        expect(containerGrid).toBeVisible();
        const rowELements = within(containerGrid).getAllByText((_, ele) => ele.classList.contains("row"));
        expect(rowELements.length).toBe(2); // Total number of rows are 2. 
        const [bigTitleMovie,] = within(rowELements[1]).getAllByText((_, ele) => ele.classList.contains("movie-pane"));
        expect(bigTitleMovie).toBeVisible();
        const movieTitle = within(bigTitleMovie).getByText((_, ele) => ele.classList.contains("truncated-text"));
        expect(movieTitle.innerHTML).toBe("Family Pot - a title with big name.");
    })

    it("Fetched all movies", async () => {

        render(getMockComponent({
            hasFetchedAllMovies: true
        }));
        screen.debug();
        const containerGrid = screen.getByText((_, ele) => ele.classList.contains("container-fluid"));
        expect(containerGrid).toBeVisible();
        const rowELements = within(containerGrid).getAllByText((_, ele) => ele.classList.contains("row"));
        expect(rowELements.length).toBe(3); // Total number of rows are 2. 
        const [, , endoFListRow] = rowELements;
        const endOfList = within(endoFListRow).getByText((_, ele) => ele.tagName?.toLowerCase() === "p");
        expect(endOfList.innerHTML).toBe("End of List.")

    })


})