import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantCard.css';

const RestaurantCard = (props) => {
    let restaurantCard = props.restaurant ?
        <Link to={`/restaurant/${props.restaurant.id}/${props.idx}`}>
            <div className="card bg-dark text-white mb-4">
                <img src={props.restaurant.restaurant_photo} className="card-img" alt="props.restaurant.description" />
                <div className="card-img-overlay">
                    <h5 className="card-title">{props.restaurant.name}</h5>
                    <p className="card-text">{props.restaurant.address}</p>
                    <p className="card-text">{props.restaurant.phone}</p>
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