import {collection, getDocs} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useEffect } from "react";

function searchGames() {

    const gamesCollectionRef = collection(db, "games");


    const getGameInfo = async () => {
        try {
        const data = await getDocs(gamesCollectionRef);
        console.log(data);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        try {
            getGameInfo();
        }
        catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <>
            <input placeholder="Search by name.." />
            
        </>
    )
}

export default searchGames;