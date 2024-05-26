import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditProperty = () => {
    const { id } = useParams();
    const [propertyName, setPropertyName] = useState("");
    const [price, setPrice] = useState("");
    const [houseAddress, setHouseAddress] = useState("");
    const [nearestLandmark, setNearestLandmark] = useState("");
    const [noOfBedrooms, setNoOfBedrooms] = useState("");
    const [noOfBathrooms, setNoOfBathrooms] = useState("");
    const [nearbyHospitals, setNearbyHospitals] = useState(false);
    const [nearbyColleges, setNearbyColleges] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigate('/login');
        }
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/properties/find/${id}`, {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                    }
                });
                setPropertyName(response.data.propertyName);
                setPrice(response.data.price);
                setHouseAddress(response.data.place);
                setNearestLandmark(response.data.area);
                setNoOfBedrooms(response.data.bedrooms);
                setNoOfBathrooms(response.data.bathrooms);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching property data:', error);
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleFileChange = (e) => {
        setHousePhotos([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (propertyName && price && houseAddress) {
            try {
                const config = {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                };
                await axios.put(`http://localhost:5000/api/properties/${id}`, {
                    propertyName: propertyName,
                    price: price,
                    place: houseAddress,
                    area: nearestLandmark,
                    bedrooms: noOfBedrooms,
                    bathrooms: noOfBathrooms,
                    nearbyHospitals: "Hosipital A",
                    nearbyColleges: "College A"
                }, config).then((data) => {
                    toast.success("Property Eddited successfully");
                    navigate('/owner/dashboard');
                })
            } catch (error) {
                toast.error(error.response.data.message);
            }
        } else {
            toast.error("Please fill all the required fields");
        }
    };

    return (
        <div className='section-container md:w-max '>
            <h1 className='text-center text-4xl font-semibold p-5'>Post your Property</h1>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                <label className="input input-bordered flex items-center gap-4">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Property Name"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-4">
                    <input
                        type="number"
                        className="grow"
                        placeholder="Rs. Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-4">
                    <input
                        type="text"
                        className="grow"
                        placeholder="House Address"
                        value={houseAddress}
                        onChange={(e) => setHouseAddress(e.target.value)}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-4">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Nearest Landmark"
                        value={nearestLandmark}
                        onChange={(e) => setNearestLandmark(e.target.value)}
                        required
                    />
                </label>
                <label className='ml-1 font-semibold'>
                    <h2>Property Details:</h2>
                </label>
                <label className="input input-bordered flex items-center gap-4">
                    <input
                        type="number"
                        className="grow"
                        placeholder="No.of Bedrooms"
                        value={noOfBedrooms}
                        onChange={(e) => setNoOfBedrooms(e.target.value)}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-4">
                    <input
                        type="number"
                        className="grow"
                        placeholder="No.of Bathrooms"
                        value={noOfBathrooms}
                        onChange={(e) => setNoOfBathrooms(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default EditProperty;