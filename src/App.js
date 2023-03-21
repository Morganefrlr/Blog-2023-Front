
import './styles/styles.scss';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home.js'
import About from './pages/About.js'
import Write from './pages/Write.js'
import Contact from './pages/Contact.js'
import Read from './pages/Read.js'
import Update from './pages/Update';
import Connexion from './pages/Connexion';
import { useContext } from 'react';
import { AuthContext } from './authContext';

function App() {

  const {currentUser} = useContext(AuthContext)

  const RouteProtected = ({children}) =>{
    if(!currentUser){

      return <Navigate to={'/connect'} />
    }
    return children
  }   
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<RouteProtected><Home /></RouteProtected>}/>
        <Route path='/about/:id' element={<RouteProtected><About /></RouteProtected>}/>
        <Route path='/write' element={<RouteProtected><Write /></RouteProtected>}/>
        <Route path='/contact' element={<RouteProtected><Contact /></RouteProtected>}/>
        <Route path='/read/:id' element={<RouteProtected><Read /></RouteProtected>}/>
        <Route path='/update' element={<RouteProtected><Update /></RouteProtected>}/>
        <Route path='/connect' element={<Connexion />}/>
      </Routes>
    </Router>
  );
}

export default App;
