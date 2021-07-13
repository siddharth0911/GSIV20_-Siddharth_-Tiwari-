import React,{useEffect,useState,useCallback,useRef} from 'react';
import {Home,Search} from '@material-ui/icons';
import Item from './MovieItem';
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as upcomingActions from './store/actions/upcomingAction';
import * as searchActions from './store/actions/searchAction';

const Header = (props) => {
    const [data,setData] = useState('');
    const [loading,setLoading] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
    const history = useHistory();
    const moviesUpcoming = useSelector(state=>state.upcoming.upcomingMovies);
    const hasMore = useSelector(state=>state.upcoming.hasMore);
    const moviesSearched = useSelector(state=>state.search.movies);
    const dispatch = useDispatch();
    const timerRef = useRef();

    const handleOnClick = useCallback(() => history.push('/detail'), [history]);

    useEffect(()=>{
        setLoading(true);
        load()
        .then(()=>{
            
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            setLoading(false);
        })
    },[setLoading])

    const load = async () => {
        setRefreshing(true);
        await dispatch(upcomingActions.loadMovies(false));
        setRefreshing(false);
    }

    const loadMore = async () => {
        setRefreshing(true);
        await dispatch(upcomingActions.loadMovies(true));
        setRefreshing(false);
    }

    const handleSearch = async (query) => {
        setRefreshing(true)
        await dispatch(searchActions.searchMovies(query));
        setRefreshing(false);
    }

    const debounceMethod = (fn,interval,value) => {
        let query = value;
        clearTimeout(timerRef.current);
        setRefreshing(true);
        timerRef.current = setTimeout(()=>{
            fn(query);
        },interval)
    }

    const handleChange = (event) => {
        setData(event.target.value);
        debounceMethod(handleSearch,400,event.target.value);
    }


    const details = async (id) => {
        await dispatch(searchActions.movieDetail(id));
        handleOnClick();
    }

    return (
        <div className="container-fluid mt-3">
            <div className="row align-items-center">
                <div className="col">
                    <div className="d-flex justify-content-start">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm"><Search /></span>
                            </div>
                            <input style={{backgroundColor:'#e9ecef'}} disabled={loading} type="text" value={data} className="form-control" placeholder="Search" onChange={handleChange} aria-label="Search" id="inputGroup-sizing-sm"/>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <Home/>
                    </div>
                </div>
            </div>
            <hr/>
            {loading?
                <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-grow" role="status"></div>
                </div>
               :<div>
                   {data?
                   <div>
                       {refreshing?
                       <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-grow" role="status"></div>
                        </div>
                       :<div className="row">
                       {moviesSearched.map((ele,index)=>{
                           let imageUrl = `https://image.tmdb.org/t/p/w500${ele.poster_path}`;
                           return <Item key={ele.id} details={details} id={ele.id} title={ele.title} rating={ele.vote_average} description={ele.overview} image={imageUrl}/>
                       })}
                   </div>}
                   </div>:
                   <div className="row">
                        {moviesUpcoming.map((ele,index)=>{
                            let imageUrl = `https://image.tmdb.org/t/p/w500${ele.poster_path}`;
                            return <Item key={ele.id} details={details} id={ele.id} title={ele.title} rating={ele.vote_average} description={ele.overview} image={imageUrl}/>
                        })}
                    </div>}
                    
                    {refreshing?
                        <div>
                            {data?null:<div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-grow" role="status"></div>
                            </div>}
                        </div>
                        :
                        <div>
                            {data?null:<div className="mt-1" style={{textAlign:'center'}}>
                            <   button type="button" className="btn btn-info" onClick={loadMore} disabled={!hasMore}>{hasMore?'Load More':'Thamks for visiting'}</button>
                            </div>}
                        </div>
                        
                    }
               </div>
            }
        </div>
    )

};

export default Header;