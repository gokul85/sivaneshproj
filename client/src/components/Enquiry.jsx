import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Enquiry = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPropertyDetails();
    }, []);

    const fetchPropertyDetails = () => {
        axios.get(`http://localhost:5000/api/properties/find/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        })
            .then((response) => {
                setProperty(response.data);
                console.log(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const handleInterested = () => {
        axios.post(`http://localhost:5000/api/properties/${id}/interested`, {}, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='flex md:flex-row flex-col gap-5'>
            <div className="hero min-h-screen bg-base-200 ">
                <div className="hero-content flex-col lg:flex-row mb-52">
                    <div>
                        <img src="../../public/Assets/hero.jpg" alt={property.propertyName} className="max-w-lg rounded-lg shadow-2xl" />
                    </div>
                    <div className='pl-20 space-y-3 font-semibold'>
                        <h2>Property Name: {property.propertyName}</h2>
                        <h2>Price: {property.price}</h2>
                        <h2>Location: {property.place}</h2>
                        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-blue-400" onClick={handleInterested}>I'm Interested</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enquiry;
