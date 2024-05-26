// this is the card which is going to displayed on the tenant dashboard
// i have designed a row of cards here...you please change the attributes and get the values from the owners



import React from 'react'
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Card from './Cards';
const Tenantcards = () => {
    const cardsData = [
        { title: 'Ss Nivas', description: 'This is the first card', imageUrl: '../public/Assets/343021.jpg', likeButtonText: 'Like', showMoreButtonText: 'Show More' },
        { title: 'Gk House', description: 'This is the second card', imageUrl: '../public/Assets/343021.jpg', likeButtonText: 'Like', showMoreButtonText: 'Show More' },
        { title: 'Rbs Arcade', description: 'This is the third card', imageUrl: '../public/Assets/343021.jpg', likeButtonText: 'Like', showMoreButtonText: 'Show More' },
        // Add more cards as needed
    ];

    return (
        <div className="card-row">
            {cardsData.map((card, index) => (
                <Card 
                    key={index}
                    title={card.title}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    likeButtonText={card.likeButtonText}
                    showMoreButtonText={card.showMoreButtonText}
                />
            ))}
        </div>
    );

//   return (
//     <div className='section-container'>
//         <div class="card w-96 bg-base-100 shadow-xl relative">
//                 <div className={`rating gap-1 absolute right-2 top-2 p-4 bg-gray-400 hear heartStar`} >
//                     <FaHeart className='h-5 w-5 cursor-pointer '/>
//                 </div>
//                 <figure><img className=' md:h-72 rounded-sm' src="../public/Assets/hero.jpg" alt="" /></figure>
//                     <div class="card-body">
//                         <h2 class="card-title"></h2>
//                         <p>Individual House</p>
//                         <div class="card-actions justify-between items-center mt-2">
//                             <h5 className='font-semibold'><span className='text-sm text-red-500'>Rs</span>25Lakhs</h5>
                            
//                         </div>
//                         <button class="btn bg-green-500 text-white justify-center space-y-4"><Link to='/enquiry'>More Details</Link></button>
//                     </div>
//             </div>
//     </div>
//   )
}

export default Tenantcards