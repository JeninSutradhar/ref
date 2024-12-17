import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OfferDetail = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
     const [chain, setChain] = useState(['You', 'Referred 1', 'Referred 2', 'Referred 3', 'Referred 4']); // Example chain

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await axios.get(`/api/offers/${id}`);
                setOffer(response.data);
            } catch (error) {
                console.error('Error fetching offer:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchOffer();
    }, [id]);

    if(loading) {
     return <div className='container mt-5'>Loading Offer Details...</div>
    }

    if(!offer){
         return  <div className='container mt-5'>Offer Not Found</div>
    }
    return (
        <div className="container mt-5">
           <h2>{offer.title}</h2>
            <p>{offer.description}</p>
            <p>Earnings Ladder:</p>
            <ul>
                {chain.map((user, index) => (
                    <li key={index}>{index + 1}) {user}</li>
                ))}
           </ul>
         <button className='btn btn-success'>Complete Offer</button>
        </div>
    );
};

export default OfferDetail;