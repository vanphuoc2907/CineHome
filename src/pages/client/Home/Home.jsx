import React, { useState } from 'react';
import HeaderClient from '../../../components/client/HeaderClient';
import ClientRouters from "../../../routes/ClientRouters"
import LoginModal from '../Navbar/LoginModal';
import SignUpModal from '../Navbar/SignUpModal';
import Footer from '../Footer/Footer';
import ChatBox from '../Chat/ChatBox';
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
             <ChatBox/>
             <Footer/>
        </div>
    );
}

export default Home;