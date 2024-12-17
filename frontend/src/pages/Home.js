import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
         <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Welcome to Our Project!</h1>
                <p className="lead">Learn about what we do.</p>
                <div className="embed-responsive embed-responsive-16by9">
                   <video controls  class="embed-responsive-item">
                      <source src="/your-video.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
               <p className="mt-4"> We answer the 5 Ws here</p>
               <Link className="btn btn-primary btn-lg mt-3" to="/questionnaire" role="button">Sign Up</Link>
            </div>
        </div>

    );
};

export default Home;