import { LOAD_MOVIES } from "../actions/upcomingAction";

const intialState = {
    upcomingMovies:[],
    totalNumberOfPages:0,
    currentPage:0,
    totaResults:0,
    hasMore:true
};

export default (state=intialState,action) => {

    switch(action.type){
        case LOAD_MOVIES:
            let more = true;
            if(action.current == action.totalPages){
                more = false;
            }
            return{
                ...state,
                upcomingMovies:state.upcomingMovies.concat(action.movies),
                currentPage:action.current,
                totalNumberOfPages:action.totalPages,
                totaResults:action.totalResults,
                hasMore:more
            }
    }
    return state;
}