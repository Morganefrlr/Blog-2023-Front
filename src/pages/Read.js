import Navbar from "../components/navbar/Navbar";
import Post from "../components/post/Post";
import RightBar from "../components/rightbar/RightBar";
import { useParams} from 'react-router-dom';
import { useContext, useEffect, useState} from "react";
import { makeRequest } from '../axios';
import { AuthContext} from '../authContext.js'



const Read = () => {

    const params = useParams()
    const id = params.id
    const { currentUser} = useContext(AuthContext)
    const [post, setPost] = useState()
    const [writer, setWriter] = useState()


    useEffect(() =>{
            const fetchPost = async () => {
            await makeRequest.get("/post/" + id)
                .then(res => {
                    setPost(res.data)
                })
            }
            fetchPost()
        
    },[id])
   
    
    useEffect(() =>{
            const fetchUser = async () => {
                await makeRequest.get("/user/" + post.userId)
                  .then(res => {
                      setWriter(res.data.user.name)
                   })
              }
              fetchUser()
        
    },[post])


    return (
        <div>
            <Navbar />
            <div className="mainContainer">
                <div className="mainContainer_left">
                    {post && 
                        <Post post={post} currentUser={currentUser.userId} writer={writer}/>
                    } 
                </div>
                <div className="mainContainer_right">
                    {post && 
                        <RightBar userId={post.userId}/>
                    }

                </div>
            </div>
        </div>
    );
};

export default Read;