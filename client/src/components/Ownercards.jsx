import React, { useState, useEffect } from 'react';
import Cardowner from './Cardowner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Ownercards = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const cardsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigate('/login')
        }
        const fetchCardsData = async () => {
            await axios.get('http://localhost:5000/api/properties/owner', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(data => {
                setCardsData(data.data);
                setLoading(false);
            }).catch(error => {
                console.error('Error fetching data:', error.response.data.message);
                toast.error(error.response.data.message);
                setLoading(false);
            })

        };

        fetchCardsData();
    }, []);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(cardsData.length / cardsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAddProperty = () => {
        navigate('/owner/addproperty');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={handleAddProperty}>Add Property</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCards.map((card, index) => (
                    <Cardowner
                        key={index}
                        propertyName={card.propertyName}
                        place={card.place}
                        area={card.area}
                        id={card._id}
                    />
                ))}
            </div>
            <div className="pagination mt-4 flex justify-center">
                <button
                    className="px-4 py-2 bg-gray-300 rounded-l"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 rounded-r"
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(cardsData.length / cardsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Ownercards;
