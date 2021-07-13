import React,{useEffect,useState} from "react";
import {Home} from '@material-ui/icons';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Detail = (props) => {
    const history = useHistory();
    const detail = useSelector(state=>state.search.moviedetail);
    const [imageSrc,setImageSrc] = useState();

    const handleOnClick = () => history.push('/');

    useEffect(()=>{
        let imageUrl = `https://image.tmdb.org/t/p/w500${detail.poster_path}`;
        setImageSrc(imageUrl);
    },[]);

    return(
        <div className="container-fluid mt-3">
           <div className="row align-items-center">
                <div className="col">
                    <div className="d-flex justify-content-start">
                        <h4>Movie Details</h4>
                    </div>
                </div>
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <div onClick={handleOnClick}>
                            <Home/>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-4">
                    <img src={imageSrc} style={{height:'400px',width:'100%'}}/>
                </div>
                <div className="col">
                    <div className="ml-2">
                        <h4>{detail.title} ({detail.vote_average})</h4>
                        <h6 className="mt-0.25">{detail.release_date} | {detail.runtime} Mins </h6>
                        <h6>Genres: {detail.genres.map((ele,index)=>{
                            if(index==0){
                                return <span key={ele.id}> {ele.name} </span>
                            }
                            else{
                                return <span key={ele.id}>| {ele.name} </span>
                            }
                        })}
                        </h6>
                        <p className="mt-0.50">{detail.overview}</p>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Detail;