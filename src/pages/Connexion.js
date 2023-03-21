import Navbar from "../components/navbar/Navbar";
import FormConnexion from "../components/formConnexion/FormConnexion";
import {useState} from 'react'


const Connexion = () => {
    const[connecter, setConnecter] = useState(true)
    const[enregistrer, setEnregistrer] = useState()
    const handleClick = (e) =>{
        if(connecter){
            setEnregistrer(true)
            setConnecter(false)
        }
        if(enregistrer){
            setEnregistrer(false)
            setConnecter(true)
        }
        
    }




    return (
        <div>
            <Navbar larger={true} connect={true}/>
            {connecter && 
                <>
                    <button className='btnConnect' onClick={() => handleClick()}>S'enregistrer</button>
                    <FormConnexion connect={true}/>
                </>
            }
            {enregistrer && 
                <>
                    <button className='btnConnect' onClick={() => handleClick()}>Se Connecter</button>
                    <FormConnexion connect={false}/>
                </>   
            }            
        </div>
    );
};

export default Connexion;