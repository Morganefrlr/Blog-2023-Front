import {Link} from 'react-router-dom'
import { useEffect, useState} from "react";
import { makeRequest } from '../../axios';


const Card = ({post, about}) => {


    const url = "https://blog-2023-backend.onrender.com/images/"
    const [writer, setWriter] = useState()


    useEffect(() =>{
        if(post){
            const fetchUser = async () => {
                await makeRequest.get("/user/" + post.userId)
                  .then(res => {
                      setWriter(res.data.user.name)
                   })
              }
              fetchUser()
        }
    },[post])




    

    return (
        <div className={about ? "Card Adapt" : "Card"}>
            <div className="Card_imgTag">
                <img src={post && url + post.photo} alt="" />
                <div className="containerCardTags">
                    {post.tags && post.tags.map(tag =>
                        <div className="cardTag" key={tag}>
                            <span>{tag}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="Card_infos">
                <h1>{post.title}</h1>
                <div className="timeName">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <hr />
                    <span>Écrit par {writer && writer}</span>
                </div>
                <span className="cardDesc">{post.desc}</span>
                <Link className='card-btn' to={`/read/${post._id}`}>Lire</Link>
            </div>
            
        </div>
    );
};

export default Card;