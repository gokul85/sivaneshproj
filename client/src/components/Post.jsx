import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [propertyName, setPropertyName] = useState("");
  const [price, setPrice] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [nearestLandmark, setNearestLandmark] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [noOfBedrooms, setNoOfBedrooms] = useState("");
  const [noOfBathrooms, setNoOfBathrooms] = useState("");
  const [houseFacing, setHouseFacing] = useState("");
  const [nearbyHospitals, setNearbyHospitals] = useState(false);
  const [nearbyColleges, setNearbyColleges] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [parking, setParking] = useState(false);
  const [waterConnection, setWaterConnection] = useState(false);
  const [securityService, setSecurityService] = useState(false);
  const [housePhotos, setHousePhotos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setHousePhotos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (propertyName && price && houseAddress) {
      // const formData = new FormData();
      // formData.append('propertyName', propertyName);
      // formData.append('price', price);
      // formData.append('houseAddress', houseAddress);
      // // formData.append('nearestLandmark', nearestLandmark);
      // formData.append('email', email);
      // formData.append('phone', phone);
      // formData.append('noOfBedrooms', noOfBedrooms);
      // formData.append('noOfBathrooms', noOfBathrooms);
      // // formData.append('houseFacing', houseFacing);
      // // formData.append('nearbyHospitals', nearbyHospitals);
      // // formData.append('nearbyColleges', nearbyColleges);
      // // formData.append('furnished', furnished);
      // // formData.append('parking', parking);
      // // formData.append('waterConnection', waterConnection);
      // // formData.append('securityService', securityService);
      // housePhotos.forEach(photo => {
      //   formData.append('housePhotos', photo);
      // });

      try {
        const config = {
          headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        };
        await axios.post("http://localhost:5000/api/properties", {
          propertyName: propertyName,
          price: price,
          place: houseAddress,
          area: nearestLandmark,
          bedrooms: noOfBedrooms,
          bathrooms: noOfBathrooms,
          nearbyHospitals: "Hosipital A",
          nearbyColleges: "College A"
        }, config).then((data) => {
          toast.success("Property posted successfully");
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
        {/* <label className="label cursor-pointer w-56">
          <span className="label-text">Hospitals Nearby</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={nearbyHospitals}
            onChange={(e) => setNearbyHospitals(e.target.checked)}
          />
        </label>
        <label className="label cursor-pointer w-56">
          <span className="label-text">Colleges Nearby</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={nearbyColleges}
            onChange={(e) => setNearbyColleges(e.target.checked)}
          />
        </label> */}
        {/* <label className='ml-1 font-semibold'>
          <h2>Amenities:</h2>
        </label>
        <label className='w-56'>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Furnished</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={furnished}
                onChange={(e) => setFurnished(e.target.checked)}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Parking</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Water Connection</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={waterConnection}
                onChange={(e) => setWaterConnection(e.target.checked)}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Security Service</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={securityService}
                onChange={(e) => setSecurityService(e.target.checked)}
              />
            </label>
          </div>
        </label>
        <label className="form-control">
          <span className="label-text text-white font-semibold"></span>
          <select
            className="bg-white text-black input input-bordered required"
            value={houseFacing}
            onChange={(e) => setHouseFacing(e.target.value)}
          >
            <option value="">House Facing*</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
        </label> */}
        {/* <label className="input input-bordered flex items-center gap-4 text-white">
          <span className="label-text text-white font-semibold">House Photos</span>
          <input
            type="file"
            className=" bg-white text-white"
            multiple
            onChange={handleFileChange}
          />
        </label> */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Post;

// import React from 'react'
// import { IoMdMail } from "react-icons/io";
// import { FaUserCircle } from "react-icons/fa";
// import { FaKey } from "react-icons/fa6";
// import { FaPhoneAlt } from "react-icons/fa";
// import { Link,useNavigate} from 'react-router-dom';
// const Post = () => {
//     const [propertyname, setPropertyname] = useState("");
//     const [price, setPrice] = useState("");
//     const [houseaddress, setHouseaddress] = useState("");
//     const [nearestlandmark, setNearestlandmark] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [noofbedrooms, setNoofbedrooms] = useState(0);
//     const [noofbathrooms, setNoofbathrooms] = useState(0);
//     const [housefacing, setHousefacing] = useState("");
//     const navigate = useNavigate();
//     useEffect(() => {
//       if(localStorage.getItem("token")==null){
//             navigate('/login');
//       }
//     }, []);
//     const HandleSubmit = () => {
//         if(email != "" && password != "" ){
//             axios.post("http://localhost:5000/api/properties/",
//                 {
//                     email:email,
//                     password:password,
//                 }
//             ).then((data=>{
//                 console.log(data.data);
//                 toast.success("User Login Successful");
//                 localStorage.setItem("token",data.data.token);
//                 localStorage.setItem("role",data.data.role);
//                 if(data.data.role==='owner')
//                     {
//                         navigate('/owner');
//                     }
//                     else
//                     {
//                         navigate('/tenant');
//                     }
//             }))
//             .catch(error => {
//                 console.log(error.response);
//                 toast.error(error.response.data.message);
//             })
//         }
//         else{
//             toast.error("Please Fill all the required fields");
//         }
//     }
//     return (
//         <div className='section-container bg-white md:w-max '>
//             <h1 className='text-center text-4xl font-semibold p-5'>Post your Property</h1>
//             <div className='flex flex-col space-y-4'>
//                 <label className="input input-bordered flex items-center gap-4">
//                     <input type="text" className="grow" placeholder="Property Name" value={propertyname} required />
//                 </label>
//                 <label className="input input-bordered flex items-center gap-4">
//                     <input type="number" className="grow" placeholder="Rs. Price" value={price} required />
//                 </label>
//                 <label className="input input-bordered flex items-center gap-4">
//                     <input type="text" className="grow" placeholder="House Address" value={houseaddress} required />
//                 </label>
//                 <label className="input input-bordered flex items-center gap-4">
//                     <input type="text" className="grow" placeholder="Nearest Landmark" value={nearestlandmark} required />
//                 </label>
//                 <label className="input input-bordered flex items-center gap-4">
//                     <input type="text" className="grow" placeholder="Contact Email" value={email} required />
//                     <IoMdMail />
//                 </label>
//                 <label className="input input-bordered flex items-center gap-4">
//                     <input type="number" className="grow" placeholder="Contact Mobile Number" value={phone} required />
//                     <FaPhoneAlt />

//                 </label>
//                 <label className='ml-1 font-semibold'>
//                     <h2>Property Details:</h2>
//                 </label>
//                 <label className="input input-bordered flex items-center gap-4">
//                     <input type="number" className="grow" placeholder="No.of Bedrooms" value={noofbedrooms} required />
//                 </label>
//                 <label className="input input-bordered flex items-center gap-4">
//                     <input type="number" className="grow" placeholder="No.of Bathrooms" value={noofbathrooms} required />
//                 </label>
//                 <label className="label cursor-pointer w-56">
//                             <span className="label-text">Hospitas Nearby</span>
//                             <input type="checkbox" className="checkbox" />
//                 </label>
//                 <label className="label cursor-pointer w-56">
//                             <span className="label-text">colleges Nearby</span>
//                             <input type="checkbox" className="checkbox" />
//                 </label>
//                 <label className='ml-1 font-semibold'>
//                     <h2>Aminities:</h2>
//                 </label>
//                 <label className='w-56'>
//                     <div className="form-control">
//                         <label className="label cursor-pointer">
//                             <span className="label-text">Furnished</span>
//                             <input type="checkbox" className="checkbox" />
//                         </label>
//                     </div>
//                     <div className="form-control">
//                         <label className="label cursor-pointer">
//                             <span className="label-text">Parking</span>
//                             <input type="checkbox" className="checkbox" />
//                         </label>
//                     </div>
//                     <div className="form-control">
//                         <label className="label cursor-pointer">
//                             <span className="label-text">Water Connection</span>
//                             <input type="checkbox" className="checkbox" />
//                         </label>
//                     </div>
//                     <div className="form-control">
//                         <label className="label cursor-pointer">
//                             <span className="label-text">Security Service</span>
//                             <input type="checkbox" className="checkbox" />
//                         </label>
//                     </div>
//                     <div>

//                     </div>
//                 </label>
//                 <label className="form-control">
//                     <span className="label-text text-white font-semibold"></span>
//                     <select className="bg-white text-black input input-bordered required" value={housefacing}>
//                         <option value="">House Facing*</option>
//                         <option value="owner">East</option>
//                         <option value="tenant">West</option>
//                         <option value="tenant">North</option>
//                         <option value="tenant">South</option>
//                     </select>
//                 </label>
//                 <label>
//                     <div className='flex flex-col justify-between gap-5'>
//                         <h2 className='font-semibold'>Upload house photos:</h2>
//                         <input type="file" className="file-input file-input-bordered w-72 max-w-xs" />
//                     </div>
//                 </label>
//                 <div className="btn w-52  bg-green-500 ">
//                     <div>
//                     <button type='submit' className='font-bold text-white items-center'><Link to='/ownercard'>Post</Link></button>
//                     </div>
//                 </div>
//                 {/* <Link to='/ownercard'>view post</Link> */}

//             </div>
//         </div>
//     )
// }

// export default Post