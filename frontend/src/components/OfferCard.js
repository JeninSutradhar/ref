import React from 'react';
import { Link } from 'react-router-dom';

const OfferCard = ({ offer }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{offer.title}</h5>
                <p className="card-text">{offer.description}</p>
                <Link to={`/offers/${offer._id}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    );
};

export default OfferCard;