import React, { useState } from 'react';
import HeaderClient from '../../../components/client/HeaderClient';
import ClientRouters from "../../../routes/ClientRouters"
import LoginModal from '../Navbar/LoginModal';
import SignUpModal from '../Navbar/SignUpModal';
function Home(props) {
     const [openLogin,setOpenLogin] = useState(false);
     const [openSignUp,setOpenSignUp] = useState(false);
     const handleCloseLogin = () => {
        setOpenLogin(false);
     }
     const handleOpenLogin = () => {
        setOpenLogin(true);
        setOpenSignUp(false);
     }
     const handleCloseSignUp = () => {
      setOpenSignUp(false);
   }
   const handleOpenSignUp = () => {
      setOpenSignUp(true);
      setOpenLogin(false);
   }
    return (
        <div>
             <HeaderClient handleOpenLogin={handleOpenLogin} />
             <ClientRouters/>
             <LoginModal openLogin={openLogin} handleCloseLogin={handleCloseLogin} handleOpenSignUp={handleOpenSignUp}/>
             <SignUpModal handleOpenLogin={handleOpenLogin} openSignUp={openSignUp} handleCloseSignUp={handleCloseSignUp} />
        </div>
    );
}

export default Home;