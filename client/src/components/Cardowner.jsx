import React from 'react';
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Cardowner = ({ propertyName, place, area, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/owner/editproperty/${id}`);
  };
  return (
    <div>
      <div className="card w-full sm:w-96 bg-base-100 shadow-2xl relative">
        <div className={`rating gap-1 absolute right-2 p-4 top-2 rounded-full bg-gray-400`}>
          <button onClick={handleEdit}><BsPencilSquare className='h-6 w-6 cursor-pointer text-white' /></button>
        </div>
        <img src="../public/Assets/343021.jpg" alt={propertyName} className="card-image w-full h-48 object-cover" />
        <div className="card-content p-4">
          <h3 className="text-lg font-bold">{propertyName}</h3>
          <p>{place}</p>
          <p>{area}</p>
          <div className="card-buttons mt-4">
            <button className="card-button show-more-button bg-blue-500 text-white px-4 py-2 rounded">Show More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cardowner;
