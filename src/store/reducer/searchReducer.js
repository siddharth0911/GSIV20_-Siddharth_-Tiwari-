import { SEARCH_MOVIES,DETAIL_MOVIE } from "../actions/searchAction";

const intialState = {
    movies:[],
    moviedetail:{}
};

export default (state=intialState,action) => {

    switch(action.type){
        case SEARCH_MOVIES:
            return{
                ...state,
                movies:action.result
            }
        case DETAIL_MOVIE:
            return{
                ...state,
                moviedetail:action.result
            }
    }
    return state;
}