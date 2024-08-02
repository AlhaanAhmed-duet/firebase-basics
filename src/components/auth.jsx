import {auth, googleProvider} from "../config/firebase-config";
import { createUserWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { useState } from "react"
const Auth = function() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const logInUser = async function() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (err) {
            console.error(err);
        }
        
    }
    
    const logOutUser = async function() {
        try {
            await signOut(auth);
        }
        catch (err) {
            console.error(err);
        }
        
    }
    const loginWithGoogle = async function() {
        try {
            await signInWithPopup(auth, googleProvider);
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        <>
            <input type="text" placeholder="Email.." onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" placeholder="Password..." onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={logInUser}>Log In</button>
            <button onClick={loginWithGoogle}>Log In With Google</button>
            <button onClick={logOutUser}>Log Out</button>
        </>
    )
}

export default Auth;