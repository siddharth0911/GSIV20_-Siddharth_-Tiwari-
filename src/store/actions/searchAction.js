import axios from 'axios';
import { API_KEY } from '../../config';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const DETAIL_MOVIE = 'DETAIL_MOVIE';

export const searchMovies = (query) => {
    return async (dispatch,getState) => {
        if(query == '') return
        try {
            let response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`,{params:{'query':query}});
            dispatch({type:SEARCH_MOVIES,result:response.data.results})
    
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const movieDetail = (id) => {
    return async (dispatch,getState) => {
        try {
            let response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
            dispatch({type:DETAIL_MOVIE,result:response.data})
    
        } catch (error) {
            throw new Error(error.message);
        }
    }
}