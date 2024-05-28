import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cardowner from '../../components/Cardowner';
import CardTenant from '../../components/CardTenant';
import { useNavigate } from 'react-router-dom';

const TenantHome = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    searchTerm: "",
    bedrooms: "",
    bathrooms: "",
    parking: false,
    furnished: false,
    offer: false,
  });
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    fetchListings();
    if (localStorage.getItem("token") == null) {
      navigate('/login')
    }
  }, []);

  const fetchListings = () => {
    setLoading(true);
    axios.get('/api/properties/', {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    })
      .then((response) => {
        setListings(response.data);
        setFilteredListings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data.message === "Token is not valid") {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate('/login');
        }
      });
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = listings;
    if (filters.searchTerm) {
      filtered = filtered.filter(listing =>
        listing.propertyName.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(listing =>
        listing.bedrooms === parseInt(filters.bedrooms)
      );
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(listing =>
        listing.bathrooms === parseInt(filters.bathrooms)
      );
    }
    if (filters.parking) {
      filtered = filtered.filter(listing => listing.parking);
    }
    if (filters.furnished) {
      filtered = filtered.filter(listing => listing.furnished);
    }
    if (filters.offer) {
      filtered = filtered.filter(listing => listing.offer);
    }
    setFilteredListings(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search...."
              className="border rounded-lg p-3 w-full"
              value={filters.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Bedrooms:</label>
            <input
              type="number"
              id="bedrooms"
              className="border rounded-lg p-3 w-full"
              placeholder="Number of Bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Bathrooms:</label>
            <input
              type="number"
              id="bathrooms"
              className="border rounded-lg p-3 w-full"
              placeholder="Number of Bathrooms"
              value={filters.bathrooms}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading && filteredListings.length === 0 && (
            <p className="text-xl text-slate-700 text-center w-full">
              No listings found.
            </p>
          )}
          {!loading &&
            filteredListings.map((listing) => (
              <CardTenant
                key={listing._id}
                propertyName={listing.propertyName}
                place={listing.place}
                area={listing.area}
                id={listing._id}
                likes={listing.likes}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TenantHome;
