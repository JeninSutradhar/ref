import React, { useState } from 'react';
import axios from 'axios';

const QuestionnaireForm = () => {
    const [referralSource, setReferralSource] = useState('');
    const [referredBy, setReferredBy] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const [showReferralInput, setShowReferralInput] = useState(false);


     const handleReferralSourceChange = (e) => {
        setReferralSource(e.target.value);
        setShowReferralInput(e.target.value === 'referral');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/users', {
                referralSource,
                referredBy: showReferralInput ? referredBy: "",
                 subscribe,
            });
            console.log('Questionnaire submitted:', response.data);
             setReferralSource('')
             setReferredBy('')
             setSubscribe(false)
            alert("Thank you for submitting the questionaire")
        } catch (error) {
             console.error('Error submitting questionnaire:', error);
              alert("There was an error processing your request.")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="referralSource">How did you find us?</label>
                <select className="form-control" id="referralSource"
                        value={referralSource} onChange={handleReferralSourceChange} required>
                    <option value="">Select an Option</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="other">Other</option>
                </select>
            </div>
             {showReferralInput && (
                <div className="form-group">
                  <label htmlFor="referredBy">Who referred you?</label>
                 <input type="text" className="form-control" id="referredBy"
                  value={referredBy}  onChange={(e)=> setReferredBy(e.target.value)}  required />
               </div>
            )}
             <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="subscribe"
                       checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />
                    <label className="form-check-label" htmlFor="subscribe">Subscribe to our newsletter</label>
                </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default QuestionnaireForm;