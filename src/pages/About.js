
import Navbar from "../components/navbar/Navbar";
import RightBar from "../components/rightbar/RightBar";
import Card from "../components/card/Card";
import { useState, useEffect} from "react";
import { makeRequest } from "../axios";
import { useParams } from "react-router-dom";




const About = () => {

    const [posts, setPosts] = useState([])
    const params = useParams()
    const id = params.id
    const [userAbout, setUserAbout] = useState([])
    const url = "https://blog-2023-backend.onrender.com/images/"


    useEffect(() =>{
            const fetchUser = async () => {
                makeRequest.get("/user/" + id)
                .then(res => {
                    setUserAbout(res.data.user)
                    setPosts(res.data.posts)
                })
            }
            fetchUser()

        
    },[id]) 


    
    return (
        <div>
            <Navbar />
            <div className="mainContainer">
                <div className="mainContainer_left">
                    <h1 className='aboutTitle'>À propos de {userAbout && userAbout.name},</h1>
                    <span className='aboutInfos'>{userAbout && userAbout.bio}</span>
                    <img src={userAbout && url + `${userAbout.photo}`} alt="" className='aboutImg'/>
                </div>
                <div className="mainContainer_right">
                    <RightBar userId={id}/>
                </div>

            </div>
            <div className="postsAbout">
                <span className="postsAbout_title">Posts: </span>
                    <div className="postsAbout_container">
                        { posts && posts.map(post =>
                            <Card key={post._id} post={post} about={true}/>
                        )}
                    </div>
            </div>
        </div>
    );
};

export default About;