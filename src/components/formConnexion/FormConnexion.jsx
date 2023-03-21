import { useContext, useState } from "react";
import {makeRequest} from '../../axios.js'
import { AuthContext } from '../../authContext.js'

const FormConnexion = ({connect}) => {
    

    


    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errPassword, setErrPassword] = useState(false)


    const [file, setFile] = useState(null)
    const [errFile, setErrFile] = useState(false)


    const [errRegister, setErrRegister] = useState(null)
    const [errRegisPass, setErrRegisPass] = useState(false)




    const handlePassword = e =>{
        const regEx = /^[A-Za-z0-9]\w{8,}$/

        if(regEx.test(e.target.value)){
            setPassword(e.target.value)
            setErrPassword(false)
        }
        if(!regEx.test(e.target.value)){
            setErrPassword(true)
            setPassword(false)
        }
    }


    const handleRegister = async e =>{
        e.preventDefault();
        if(password){
            const newUser = {
                name,
                email,
                password
            }; 
            if(!file){
                setErrFile(true)
                console.log("pas d'image")
                console.log(errFile)
            } 
            if (file) {
              const data =new FormData();
              const filename = Date.now() + file.name;
              data.append("name", filename);
              data.append("file", file);
              newUser.photo = filename;
              try {
                await makeRequest.post("/upload", data);
              } catch (err) {}
            }
            try {
                await makeRequest.post("auth/register", newUser);
                alert('Votre compte a bien été crée, vous pouvez vous connecter.')
                window.location.reload()
            } catch (err) {
                setErrRegister(err.response.data.message)
            }
        } else if (!password){
            return setErrRegisPass(true)
        }
    }










    const {login} = useContext(AuthContext)
    const [inputsLogin, setInputsLogin] = useState({
        email:"",
        password:""
    })
    const [errLogin, setErrLogin] = useState(null)
    const handleChangeLogin = e =>{
        const value = e.target.value
        setInputsLogin({
            ...inputsLogin,
            [e.target.name]:value
        })
    }
    const handleLogin = async e =>{
        e.preventDefault()
        try {
            await login(inputsLogin)
            window.location = "https://blog2023-justwrite.netlify.app/"
        }
        catch(err){
            setErrLogin(err.response.data.message)
        }
    }


    return (
        <div className="formConnect">
            {connect && 
            <>
                <h1>Se Connecter</h1>
                <div className="itemsConnect">
                    <div className="itemFormConnect" >
                        <span>Email</span>
                        <input type="email" name="email" required onChange={handleChangeLogin}/>
                    </div>
                    <div className="itemFormConnect" >
                        <span>Mot de Passe</span>
                        <input type="password" name="password" required onChange={handleChangeLogin}/>
                    </div>
                </div>
                <div className="containerBtnConnect">
                    <button onClick={handleLogin}>Connexion</button>
                    {errLogin && 
                     <span className="errMessageConnect">{errLogin}</span>
                    }
                </div>
            </>
            }
            {!connect && 
            <>
                <h1>S'enregistrer</h1>
                <div className="itemsConnect">
                    <div className="itemFormConnect_img">
                        <><span>Ajouter une image</span></>
                        <label htmlFor="fileInput"><div className="addPicIcon">+</div></label>
                        <input type="file" id="fileInput" name="picProfil" style={{display: "none"}} onChange={e =>setFile(e.target.files[0])} />
                        {file && 
                            <img src={URL.createObjectURL(file)} alt="" className="addPicture"/>
                        }
                    </div>
                    <div className="itemFormConnect">
                        <span>Nom d'utilisateur</span>
                        <input type="text" name="name"  required onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="itemFormConnect">
                        <span>Email</span>
                        <input type="email" name="email"  required onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="itemFormConnect password">
                        <span>Mot de Passe</span>
                        <input type="password" name="password" required onChange={e => handlePassword(e)}/>
                        {errPassword && 
                            <div className="mdp wrong">X</div>
                        }
                        {!errPassword && password &&
                            <div className="mdp right">ok</div>
                        }
                    </div>
                </div>
                <div className="containerBtnConnect">
                    <button onClick={handleRegister}>S'enregistrer</button>
                    {errRegister && 
                     <span className="errMessageConnect">{errRegister}</span>
                    }
                    {errFile && 
                        <span className="errMessageConnect">Vous devez ajouter une photo de profil</span>
                    }
                    {errRegisPass && 
                        <span className="errMessageConnect">Votre mot de passe doit contenir minimum 8 caractères,dont au moins une majuscule, une minuscule et un chiffre.</span>
                    }
                </div>
            </>
            }
            
        </div>
    );
};

export default FormConnexion;