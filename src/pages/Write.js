import Navbar from "../components/navbar/Navbar";
import { useState } from "react";
import { makeRequest } from "../axios";

const Write = () => {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [tags, setTags] = useState("")



  const cat =[
    "Cinéma",
    "Cuisine",
    "Famille",
    "Sorties",
    "Photo",
    "Sport",
    "Voyage"
  ]
    
  const [errInputsWrite, setErrInputsWrite] = useState(null)
    
  const handleTags = (e) =>{
    if(tags.includes(e.target.value)){
      setTags(tags.filter(el => el !== e.target.value))
    } else return (
      setTags(tags => {return [...tags, e.target.value]})
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(title !== "" && desc !== "" && tags !== "" && file !== null){
      const newPost = {
        title,
        desc,
        tags
      };
      if (file) {
        const data =new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          await makeRequest.post("/upload", data);
        } catch (err) {}
      }
      try {
        await makeRequest.post("/post/", newPost);
        window.location ="https://blog2023-justwrite.netlify.app/"
      } catch (err) {
          setErrInputsWrite(err)
      }

    } else { 
      setErrInputsWrite(true)
    }
  };
    



    return (
        <div>
            <Navbar />
            <div className="writeDash">
                <form>
                    <input type="text" placeholder="Titre du Post" name="title" required onChange={e => setTitle(e.target.value)}/>
                    <div className="writeTags">
                    {cat.map(item => 
                        <div key={item}>
                            <input type="checkbox" className="tag" id={item} value={item} onClick={(e) => handleTags(e)}/>
                            <label htmlFor={item}>{item}</label>
                        </div>
                    )} 
                    </div>
                    <div className="writeAddImg">
                        <label htmlFor="fileInput"><div className="addIcon">+</div></label>
                        <input type="file" id="fileInput" name="imgUrl" style={{display: "none"}} onChange={e =>setFile(e.target.files[0])} />
                        <span>ajouter une image</span>
                        {file && 
                            <img src={URL.createObjectURL(file)} alt="" className="addImg"/>
                        }
                    </div>
                    <textarea name="desc" id="" cols="30" rows="10"  placeholder="Votre post commence ici...." required onChange={e => setDesc(e.target.value)}></textarea>
                    <button onClick={handleSubmit}>Poster</button>
                    {errInputsWrite &&
                        <span>Les champs doivent tous être renseignés.</span>
                    }
                </form>
            </div>
        </div>
    );
};

export default Write;