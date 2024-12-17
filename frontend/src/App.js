import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import OffersList from './pages/OffersList';
import OfferDetail from './pages/OfferDetail';
import Admin from './pages/Admin';

function App() {
    return (
        <Router>
          <Navbar />
            <div className='container'>
              <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/questionnaire" element={<Questionnaire />} />
                     <Route path="/offers" element={<OffersList />} />
                   <Route path="/offers/:id" element={<OfferDetail />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
           </div>
        </Router>
    );
}

export default App;