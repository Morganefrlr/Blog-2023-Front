import {Link} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { makeRequest } from '../../axios';


const Post = ({post, currentUser, writer}) => {

    const url = "https://blog-2023-backend.onrender.com/images/"
    const [update, setUpdate] = useState(false)
    const [errUpdate, setErrUpdate] = useState(null)
    

    const [title, setTitle] = useState(post && `${post.title}`)
    const [desc, setDesc] = useState(post && `${post.desc}`)
    

    const handleUpdate = async e =>{
        e.preventDefault()
       
        try {
            await makeRequest.put("/post/" + post._id, {title, desc})
            window.location = `https://blog2023-justwrite.netlify.app/read/${post._id}`
        }
        catch(errUpdate){
            setErrUpdate(errUpdate)
        }
    }



    const handleDelete = async e =>{
        e.preventDefault()
        try {
            await makeRequest.delete("/post/" + post._id)
            window.location = `https://blog2023-justwrite.netlify.app`
        }
        catch(errUpdate){
            setErrUpdate(errUpdate)
        }
    }

    
    

    return (
        <div className="Post">
            {post  &&
                <> 
                    {update ? (<input type="text" name='title'  className='titleUpdate' value={title} onChange={(e) => setTitle(e.target.value)}/>):(<h1>{post.title}</h1>)}
                    {post.userId === currentUser &&
                        <div className="iconUpdate">
                            <EditIcon className='icon' onClick={() => setUpdate(true)}/>
                            <DeleteForeverIcon className='icon' onClick={handleDelete}/>
                        </div>
                    }
                    <div className="PostTags">
                        {post.tags && post.tags.map(tag =>
                            <div key={tag} className='PostTags_tag'>{tag}</div>
                        )}
                    </div>
                    <div className="PostInfos">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <hr />
                        <span>Écrit par {writer && writer}</span>
                    </div>
                    <img src={post.photo && url + post.photo} alt="" className='PostImg' />
                    {update ? (<textarea name="desc" cols="30" rows="10" value={desc} className="descUpdate" onChange={(e) => setDesc(e.target.value)}></textarea>) : (<span className='PostDesc'>{post.desc}</span>)}
                    {update ? (<div className='bouton' onClick={handleUpdate}>Enregistrer</div>) : (<Link to={'/'}><div className='bouton'>Retour</div></Link>)}
                    {errUpdate && 
                        <span>Il y a un problème</span>
                    }
                </>
            }
        </div>
    );
};

export default Post;
