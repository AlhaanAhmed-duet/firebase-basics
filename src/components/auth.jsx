import {auth} from "../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
const Auth = function() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    

    const logInUser = async function() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (err) {
            console.error(err)
        }
        
    }

    return (
        <>
            <input type="text" placeholder="Email.." onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" placeholder="Password..." onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={logInUser}>Log In</button>
        </>
    )
}

export default Auth;