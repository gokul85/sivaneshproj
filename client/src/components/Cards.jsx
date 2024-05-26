// Card.js
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Card = ({ title, description, imageUrl, likeButtonText, showMoreButtonText }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-2xl relative">
            <div className={`rating gap-1 absolute right-2 p-4 top-2 rounded-full heartStar bg-green-300`} >
                 <button><FaHeart className='h-6 w-6 cursor-pointer text-white'/></button>
               </div>
            <img src={imageUrl} alt={title} className="card-image" />
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="card-buttons">
                <button className="card-button show-more-button">{showMoreButtonText}</button>
            </div>
        </div>
    );
};

export default Card;
