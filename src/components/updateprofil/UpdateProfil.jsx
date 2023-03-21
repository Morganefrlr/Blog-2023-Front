import { useState, useContext} from "react";
import { AuthContext} from '../../authContext.js'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { makeRequest } from "../../axios.js";



const UpdateProfil = () => {

    const { userInfos} = useContext(AuthContext)
    const url = "https://blog-2023-backend.onrender.com/images/"


    const[name, setName] = useState(userInfos && `${userInfos.name}`)
    const[email, setEmail] = useState(userInfos && `${userInfos.email}`)
    const[shortBio, setShortBio] = useState(userInfos && userInfos.shortBio ? `${userInfos.shortBio}` : "")
    const[bio, setBio] = useState(userInfos && userInfos.bio ? `${userInfos.bio}` : "")
    const[facebook, setFacebook] = useState(userInfos && userInfos.facebook ? `${userInfos.facebook}` : "")
    const[instagram, setInstagram] = useState(userInfos && userInfos.instagram ? `${userInfos.instagram}` : "")
    const[pinterest, setPinterest] = useState(userInfos && userInfos.pinterest ? `${userInfos.pinterest}` : "")
    const[youtube, setYoutube] = useState(userInfos && userInfos.youtube ? `${userInfos.youtube}` : "")
    const [file, setFile] = useState(null)




    const handleUpdate = async (e) => {
        e.preventDefault();
        const userUpdate = {
          name,
          email,
          shortBio,
          bio,
          facebook,
          instagram,
          pinterest,
          youtube
        };
        if (file) {
          const data =new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          userUpdate.photo = filename;
          try {
            await makeRequest.post("/upload", data);
          } catch (err) {
                console.log(err)
            }
        }
        try {
            await makeRequest.put("/user/" + userInfos._id, userUpdate);
            window.location = `https://blog2023-justwrite.netlify.app/about/${userInfos._id}`
        } catch (err) {
            console.log(err)
        }
      };


      
    return (
        <div className="UpdateProfil">
            <h1>Mettre à jour votre profil</h1>
            <div className="UpdateProfil_up">
                <div className="UP-Img">
                    <input type="file" id="fileInput" style={{display: "none"}} onChange={e =>setFile(e.target.files[0])} />
                    {file ? (<img src={URL.createObjectURL(file)} alt="" />):( <img src={userInfos && url + userInfos.photo} alt=""/>)}
                    <label htmlFor="fileInput"><div className="addIcon">Changer votre photo</div></label>
                </div>
                <div className="UP-Name">
                    <input type="text"  value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>            
            <div className="UpdateProfil_down">
                <div className="socialMediaProfil">
                    <FacebookIcon />
                    <input type="text" placeholder="https://www.facebook.com/" value={facebook} onChange={(e) => setFacebook(e.target.value)}/>
                </div>
                <div className="socialMediaProfil">
                    <InstagramIcon />
                    <input type="text" placeholder="https://www.instagram.com/" value={instagram} onChange={(e) => setInstagram(e.target.value)}/>
                </div>
                <div className="socialMediaProfil">
                    <PinterestIcon />
                    <input type="text" placeholder="https://www.pinterest.com/" value={pinterest} onChange={(e) => setPinterest(e.target.value)}/>
                </div>
                <div className="socialMediaProfil">
                    <YouTubeIcon />
                    <input type="text" placeholder="https://www.youtube.com/" value={youtube} onChange={(e) => setYoutube(e.target.value)}/>
                </div>
                <input type="text" placeholder="Changer votre phrase d'accroche" value={shortBio} onChange={(e) => setShortBio(e.target.value)} />
                <textarea name="" id="" cols="30" rows="10" placeholder="Changer votre 'À propos'" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </div> 
            <button onClick={handleUpdate}>Mettre à jour</button>           
        </div>
    );
};

export default UpdateProfil;