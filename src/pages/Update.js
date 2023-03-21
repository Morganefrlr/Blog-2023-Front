import React from 'react';
import Navbar from '../components/navbar/Navbar';
import RightBar from '../components/rightbar/RightBar';
import UpdateProfil from '../components/updateprofil/UpdateProfil';

const Settings = () => {
    return (
        <div>
            <Navbar />
            <div className="mainContainer">
                <div className="mainContainer_left">
                  <UpdateProfil />
                </div>
                <div className="mainContainer_right">
                    <RightBar />
                </div>

            </div>
        </div>
    );
};

export default Settings;