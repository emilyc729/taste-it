import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantCard.css';

const RestaurantCard = (props) => {
    let restaurantCard = props.info ?
        <Link to={`/restaurant/${props.idx}`}>
            <div className="card bg-dark text-white mb-4">
                <img src={props.info.restaurant_photo} className="card-img" alt="props.info.description" />
                <div className="card-img-overlay">
                    <h5 className="card-title">{props.info.name}</h5>
                    <p className="card-text">{props.info.address}</p>
                    <p className="card-text">{props.info.phone}</p>
                </div>
            </div>
        </Link>
        :
        <div>
            no restaurants available
        </div>

    return (
        <div>
            {restaurantCard}
        </div>
    );
};

export default RestaurantCard;