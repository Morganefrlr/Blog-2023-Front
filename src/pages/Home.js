import { useEffect, useState } from "react";
import { makeRequest } from "../axios"
import Card from "../components/card/Card";
import Navbar from "../components/navbar/Navbar";




const Home = () => {


    const [posts, setPosts] = useState([])

    useEffect(() =>{
        const fetchPosts = async () => {
            makeRequest.get("/post/")
            .then(res => {
                setPosts(res.data.reverse())
             })
        }
        fetchPosts()
    },[])

    return (
        <>
            <Navbar larger={true}/>
            <div className="listePosts">
                <span>Derniers Posts</span>
                <div className="postsContainer">
                    {posts && posts.map(item =>
                        <Card key={item._id} post={item}/>
                    )}
                    {posts.length === 0 &&
                        <span className="postsContainer_empty">Il n'y a aucun post pour le moment!</span>
                    }

                </div>
            </div>
        </>
    );
};

export default Home;