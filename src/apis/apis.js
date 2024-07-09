import axiosInstance from "./axiosInstance";

const fetchMovieData = async ({ currentPage }) => {
    return axiosInstance.get(`data/page${currentPage}.json`);
};

const fetchMoviePoster = async ({ posterId }) => {
    return axiosInstance.get(`images/${posterId}`)
}
export {
    fetchMovieData,
    fetchMoviePoster
};
