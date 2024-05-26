import React, { useEffect, useState } from 'react';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CardTenant = ({ propertyName, place, area, id, likes }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setLikeCount(likes);
    }, []);

    const handleLike = () => {
        if (!liked) {
            axios.post(`http://localhost:5000/api/properties/${id}/like`, {}, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })
                .then((response) => {
                    setLiked(true);
                    setLikeCount(response.data.likes);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleIntrested = () => {
        navigate(`/enquiry/${id}`);
    }

    return (
        <div>
            <div className="card w-full sm:w-96 bg-base-100 shadow-2xl relative">
                <div className={`rating gap-1 absolute right-2 p-4 top-2 rounded-full bg-gray-400`}>
                    <button onClick={handleLike}>
                        {liked ? (
                            <BsHeartFill className='h-6 w-6 cursor-pointer text-red-500' />
                        ) : (
                            <BsHeart className='h-6 w-6 cursor-pointer text-red-500' />
                        )}
                    </button>
                    <span className="ml-2">{likeCount}</span>
                </div>
                <img src="../public/Assets/343021.jpg" alt={propertyName} className="card-image w-full h-48 object-cover" />
                <div className="card-content p-4">
                    <h3 className="text-lg font-bold">{propertyName}</h3>
                    <p>{place}</p>
                    <p>{area}</p>
                    <div className="card-buttons mt-4">
                        <button className="card-button show-more-button bg-blue-500 text-white px-4 py-2 rounded" onClick={handleIntrested}>Show More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardTenant;
