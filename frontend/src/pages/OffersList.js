import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OfferCard from '../components/OfferCard';

const OffersList = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get('/api/offers');
                setOffers(response.data);
            } catch (error) {
                console.error('Error fetching offers:', error);
            } finally {
               setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Offers List</h2>
           {loading ? <p>Loading Offers...</p> : offers.length === 0 ? (
                 <p>No Active Offers</p>
             ) : (
                 offers.map(offer => <OfferCard key={offer._id} offer={offer} />)
             )}
        </div>
    );
};

export default OffersList;