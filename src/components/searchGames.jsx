import { useState } from "react";
import {collection, getDocs} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useEffect } from "react";

function searchGames() {

    const gamesCollectionRef = collection(db, "games");

    const [gamesList, setGamesList] = useState([]);

    const getGameInfo = async () => {
        try {
        const data = await getDocs(gamesCollectionRef);
        const filteredData = data.docs.map((doc) => {
            return {...doc.data(),
                    id: doc.id,
            }
        });
        console.log(filteredData);
        setGamesList(filteredData);
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
            
            <div>
                {gamesList.map((game) => {
                    return (
                        <>
                            <h1>Name: {game.name}</h1>
                            <p>Year: {game.releaseData}</p>
                            <p>{game.avaialbleOnPC ? "For Windows" : "Windows not supported"}</p>
                            <div>{game.availableOnAndroid ? "For Android" : "Android Not Supported"}</div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default searchGames;