import React from 'react';
import './FoodCard.css';


const FoodCard = (props) => {
    return (
        <div className="container">
            
            <div className="row">
                {props.foods.map((food, idx) =>
                    <div key={food.name} className="col-md-6 col-lg-4">
                        <div className="card bg-dark mt-4">
                            <img src={food.food_photo} className="card-img-top" alt={food.description} />
                                <div className="card-body bg-light">
                                    <h5 className="card-title d-flex justify-content-between">
                                        <span>{food.name}</span>
                                        <span>${food.price}</span>
                                    </h5>
                                    <div className="card-text text-center d-flex justify-content-around">
                                        <div>
                                            <button className="btn"><i className="far fa-minus-square"></i></button>
                                            <span className="quantity">0</span>
                                            <button className="btn"><i className="far fa-plus-square"></i></button>
                                        </div>
                                        <button className="btn btn-outline-primary btn-sm" 
                                            onClick={() => props.handleAddToOrderBtn()}>Add to Order</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
        
export default FoodCard;