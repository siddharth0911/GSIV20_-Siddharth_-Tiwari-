import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers,applyMiddleware} from 'redux';
import upcomingReducer from './reducer/upcomingReducer';
import searchReducer from './reducer/searchReducer';

const rootReducer = combineReducers({
    upcoming:upcomingReducer,
    search:searchReducer
  });

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default store;