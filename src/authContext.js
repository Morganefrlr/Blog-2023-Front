import { createContext, useEffect, useState } from "react";
import { makeRequest } from "./axios";



export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || false
    )
    const login = async (inputs) =>{
        const res = await makeRequest.post('/auth/login', inputs)
        setCurrentUser(res.data)
    }
    
    useEffect(() =>{
        localStorage.setItem('user', JSON.stringify(currentUser))
    },[currentUser])

    const [userInfos, setUserInfos] = useState()
    useEffect(() =>{
        if(currentUser){
            const infosUser = async () =>{
            await makeRequest.get('/user/' + currentUser.userId)
                .then(res =>{
                    setUserInfos(res.data.user)
                })
            }
            infosUser()
        }
        
    },[currentUser])

    const logout = async () => {
        await makeRequest.post('/auth/logout',{}, { withCredentials: true });
        localStorage.removeItem("user");
        window.location = "https://blog2023-justwrite.netlify.app";
       
    };


    return(
        <AuthContext.Provider value={{ currentUser, login, userInfos, logout}}>
            {children}
        </AuthContext.Provider>
    )
}