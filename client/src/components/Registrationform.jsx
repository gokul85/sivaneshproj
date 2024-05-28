import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoMdMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Registrationform = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const HandleReset = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setRole("");
    }
    const HandleSubmit = () => {
        if (firstName != "" && lastName != "" && email != "" && phone != "" && password != "" && role != "") {
            axios.post("/api/auth/register",
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phone,
                    password: password,
                    role: role,
                }
            ).then((data => {
                console.log(data.data);
                toast.success("User Registration Successful");
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("role", data.data.role);
                HandleReset();
                if (data.data.role === 'owner') {
                    navigate('/owner/dashboard');
                }
                else {
                    navigate('/dashboard');
                }
            }))
                .catch(error => {
                    console.log(error.response);
                    toast.error(error.response.data.message);
                })
        }
        else {
            toast.error("Please Fill all the required fields");
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            if (localStorage.getItem("role") == "owner") {
                navigate('/owner/dashboard');
            }
            else {
                navigate('/dashboard');
            }
        }
    }, []);

    return (
        <div>
            <h2 className='text-center font-bold text-white py-2'>Registration</h2>
            <div className='flex flex-col space-y-4'>
                <label className="input input-bordered flex items-center gap-4">
                    <input type="text" className="grow" placeholder="First Name*" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </label>
                <label className="input input-bordered flex items-center gap-4">
                    <input type="text" className="grow" placeholder="Last Name*" value={lastName} onChange={e => setLastName(e.target.value)} required />
                </label>
                <label className="input input-bordered flex items-center gap-4">
                    <input type="text" className="grow" placeholder="Email*" value={email} onChange={e => setEmail(e.target.value)} required />
                    <IoMdMail />
                </label>
                <label className="input input-bordered flex items-center gap-4">
                    <input type="number" className="grow" placeholder="Phone Number*" value={phone} onChange={e => setPhone(e.target.value)} required />
                    <FaPhoneAlt />

                </label>
                {/* <label className="input input-bordered flex items-center gap-4">

                    <input type="text" className="grow" placeholder="Username" required />
                    <FaUserCircle />

                </label> */}
                <label className="input input-bordered flex items-center gap-4">

                    <input type="password" className="grow" name='password' placeholder='Password*' value={password} onChange={e => setPassword(e.target.value)} required />
                    <FaKey />

                </label>
                <label className="form-control">
                    <span className="label-text text-white font-semibold">Select Role*</span>
                    <select
                        className="bg-white text-black font-semibold input input-bordered"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        <option value="owner">Owner</option>
                        <option value="tenant">Tenant</option>
                    </select>
                </label>
                <label className="btn w-52 ml-8 bg-green-500">

                    <button type='submit' className='font-bold text-white' onClick={HandleSubmit}>Register</button>

                </label>

            </div>
        </div>
    )
}

export default Registrationform