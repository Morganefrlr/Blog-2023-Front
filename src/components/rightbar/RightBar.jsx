import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../authContext';


const RightBar = ({userId}) => {
    
    const { userInfos} = useContext(AuthContext)
    const url = "https://blog-2023-backend.onrender.com/images/"

    const [userPost, setUserPost] = useState()

    useEffect(() => {
        if(userId){
            const fetchUser = async () => {
            await makeRequest.get("/user/" + userId)
            .then(res =>{
                setUserPost(res.data.user)
            })
        };fetchUser()  
        }
    },[userId])
        
    return (
        <>
        {userInfos && 
            <>
            <div className="RB-title">
                <hr />
                <span>À propos de moi</span>
                <hr />
            </div>
            <div className="RB-user">
                <img src={userPost ? url + userPost.photo : url + userInfos.photo} alt="" />
                < Link to={`/about/${userId}`}><span>{userPost ? userPost.name : userInfos.name}</span></Link>
                <span>{userPost ? userPost.shortBio : userInfos.shortBio}</span>
            </div>
            <div className="RB-title">
                <hr />
                <span>Suivez-moi</span>
                <hr />
            </div>
            <div className="RB-medias">
                    <div className="RB-medias_item">
                        <hr />
                        <a  href={userPost ? userPost.facebook : userInfos.facebook} target='_blank' rel='noreferrer'>Facebook</a>
                        <hr />
                    </div> 
                    <div className="RB-medias_item">
                        <hr />
                        <a href={userPost ? userPost.instagram : userInfos.instagram} target='_blank' rel='noreferrer'>Instagram</a>
                        <hr />
                    </div> 
                    <div className="RB-medias_item">
                        <hr />
                        <a href={userPost ? userPost.pinterest : userInfos.pinterest} target='_blank' rel='noreferrer'>Pinterest</a>
                        <hr />
                    </div> 
                    <div className="RB-medias_item">
                        <hr />
                        <a href={userPost ? userPost.youtube : userInfos.youtube} target='_blank' rel='noreferrer'>Youtube</a>
                        <hr />
                    </div> 
            </div>

        </>
        }
        </>
    );
};

export default RightBar;