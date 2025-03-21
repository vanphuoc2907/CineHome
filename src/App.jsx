import { useContext } from 'react';
import './App.css';
import HomeAdmin from './pages/admin/HomeAdmin/HomeAdmin';
import Home from './pages/client/Home/Home';
import { ContextAuth } from './context/AuthProvider';

function App() {
  const { accountLogin } = useContext(ContextAuth);
  return (
    <>
   <HomeAdmin/>
    </>
  );
} 
 

export default App;