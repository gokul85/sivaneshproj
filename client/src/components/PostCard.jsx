import React from 'react'
import { FaPencilAlt } from "react-icons/fa";   
import { Link } from 'react-router-dom';
const PostCard = () => {
  return (
    <div className='section-container'>
        <div class="card w-96 bg-base-100 shadow-xl relative">
                <div className={`rating gap-1 absolute right-2 top-2 p-4 bg-gray-400 rounded-full`} >
                    <FaPencilAlt className='h-5 w-5 cursor-pointer '/>
                </div>
                <figure><img className=' md:h-72 rounded-sm' src="../public/Assets/hero.jpg" alt="" /></figure>
                    <div class="card-body">
                        <h2 class="card-title"></h2>
                        <p>Individual House</p>
                        <div class="card-actions justify-between items-center mt-2">
                            <h5 className='font-semibold'><span className='text-sm text-red-500'>Rs</span>25Lakhs</h5>
                            
                        </div>
                        <button class="btn bg-green-500 text-white justify-center space-y-4"><Link to='/enquiry'>More Details</Link></button>
                    </div>
            </div>
    </div>
  )
}

export default PostCard