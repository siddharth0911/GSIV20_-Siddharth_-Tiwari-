import axios from 'axios';
import { API_KEY } from '../../config';
export const LOAD_MOVIES = 'LOAD_MOVIES';


export const loadMovies = (loadMore) => {
    return async (dispatch,getState) => {
        try {
            if(!loadMore && getState().upcoming.upcomingMovies.length>0) return
            const hasMore = getState().upcoming.hasMore;
            if(hasMore){
                let page = getState().upcoming.currentPage + 1;
                let response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`);
                dispatch({type:LOAD_MOVIES,movies:response.data.results,current:response.data.page,totalPages:response.data.total_pages,totalResults:response.data.total_results})
            }
            return hasMore;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}