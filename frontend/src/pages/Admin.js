import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [offers, setOffers] = useState([]);
    const [newOffer, setNewOffer] = useState({ title: '', description: '', status:'active' });
    const [selectedOffer, setSelectedOffer] = useState(null)
    const [editOffer, setEditOffer] = useState({ title: '', description: '', status: 'active'})
     const [loading, setLoading] = useState(true)


    useEffect(() => {
       const fetchOffers = async () => {
        try {
            const response = await axios.get('/api/offers');
             setOffers(response.data);
        } catch (error){
             console.error('Error fetching offers:', error);
        } finally {
          setLoading(false)
        }
       }
       fetchOffers()
   },[])


     const handleInputChange = (e) => {
        setNewOffer({ ...newOffer, [e.target.name]: e.target.value });
    };

    const handleEditChange = (e) => {
      setEditOffer({ ...editOffer, [e.target.name]: e.target.value });
   }

   const handleAddOffer = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/offers', newOffer);
            setNewOffer({ title: '', description: '', status: 'active'}); //clear form
            alert("Offer added");
            fetchOffers()
        } catch (error) {
            console.error('Error adding offer:', error);
            alert("There was an issue submitting the offer")
        }
    };

    const handleDeleteOffer = async (id) => {
         if(window.confirm("Are you sure you want to delete this offer?")){
            try{
                 await axios.delete(`/api/offers/${id}`);
                alert("Offer Deleted")
                 fetchOffers()
           } catch(error) {
                console.error('Error deleting offer:', error);
                alert("There was an issue deleting the offer")
           }
         }

    }

    const handleEditOfferClick = (offer) => {
         setSelectedOffer(offer._id)
        setEditOffer({
            title: offer.title,
            description: offer.description,
            status: offer.status
       })
    }

    const handleUpdateOffer = async (e) => {
         e.preventDefault()
      try {
        await axios.put(`/api/offers/${selectedOffer}`, editOffer);
           alert('Offer updated')
           setSelectedOffer(null)
          setEditOffer({ title: '', description: '', status: 'active'})
          fetchOffers();
        } catch(error) {
           console.error('Error updating offer', error);
           alert('There was an error updating this offer')
        }
    }
    const fetchOffers = async () => {
        try {
            const response = await axios.get('/api/offers');
             setOffers(response.data);
        } catch (error){
             console.error('Error fetching offers:', error);
        } finally {
            setLoading(false)
        }
       }

    return (
        <div className="container mt-5">
            <h2>Admin Page</h2>
             { loading ? <p>Loading Offers...</p> :
             ( <>
             <h3>Offers</h3>
             <ul className="list-group">
             {offers.map(offer => (
                  <li key={offer._id} className="list-group-item d-flex justify-content-between align-items-center">
                      {offer.title}
                       <div>
                             <button className='btn btn-sm btn-info mr-2'
                                  onClick={() => handleEditOfferClick(offer)}>Edit</button>
                              <button className='btn btn-sm btn-danger' onClick={() => handleDeleteOffer(offer._id)}>Delete</button>
                       </div>
                  </li>
                ))}
                </ul>
              </>
              )}

            <h3>Add New Offer</h3>
            <form onSubmit={handleAddOffer}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" value={newOffer.title} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" name="description" value={newOffer.description} onChange={handleInputChange} rows="3" required />
               </div>
                <div className="form-group">
                    <label>Status</label>
                    <select className='form-control' name='status' value={newOffer.status} onChange={handleInputChange}>
                       <option value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                   </select>
                </div>
                <button type="submit" className="btn btn-primary">Add Offer</button>
           </form>

             {selectedOffer && (
                <>
                 <h3>Edit Offer</h3>
                 <form onSubmit={handleUpdateOffer}>
                      <div className="form-group">
                            <label>Title</label>
                           <input type="text" className="form-control" name="title" value={editOffer.title} onChange={handleEditChange} required />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                           <textarea className="form-control" name="description" value={editOffer.description} onChange={handleEditChange} rows="3" required />
                       </div>
                         <div className="form-group">
                            <label>Status</label>
                            <select className='form-control' name='status' value={editOffer.status} onChange={handleEditChange}>
                              <option value='active'>Active</option>
                              <option value='inactive'>Inactive</option>
                            </select>
                        </div>
                      <button type="submit" className="btn btn-primary">Update</button>
                 </form>
                </>
           )}

        </div>
    );
};

export default Admin;