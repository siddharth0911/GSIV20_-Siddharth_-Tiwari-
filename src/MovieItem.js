import React from 'react';

const Item = (props) => {
    const handleClick = () => {
        props.details(props.id);
    }

    return (
        <div className="card border-secondary" style={{width: '16rem',marginLeft:'0.5rem',marginTop:'0.5rem',borderRadius:'0.5rem'}} onClick={handleClick}>
            <img className="card-img-top" src={props.image} alt={props.title}/>
            <div>
                <div className="row align-items-center" style={{marginTop:'0.35rem'}}>
                    <div className="col">
                        <span className="d-flex justify-content-start">{props.title}</span>
                    </div>
                    
                    <div className="col-2">
                        <span className="d-flex justify-content-end">({props.rating})</span>
                    </div>
                </div>
                <p className="crop-text-1">{props.description}</p>
            </div>
        </div>
    )
}

export default Item;