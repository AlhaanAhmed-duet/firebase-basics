import { useState } from "react";
import {addDoc, collection, deleteDoc, getDocs, doc, updateDoc} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useEffect } from "react";

function searchGames() {

    const gamesCollectionRef = collection(db, "games");

    const [gamesList, setGamesList] = useState([]);
    const [newGameList, setNewGameList] = useState({
        gameName: "",
        gameReleaseYear: "",
        onPC: false,
        onAndroid: false
    });
    const [updatedgameTitle, setupdatedGameTitle] = useState("");

    const addGameData = async () => {
        try {
            await addDoc(gamesCollectionRef, {
                name: newGameList.gameName,
                releaseYear: newGameList.gameReleaseYear,
                avaialbleOnPC: newGameList.onPC,
                availableOnAndroid: newGameList.onAndroid
            });
            setNewGameList((prev) => {
                return {...prev};
            })
            getGameInfo();
        }
        catch(err) {
            console.error(err)
        }
        
        console.log(newGameList);
    }


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

    const deleteGame = async (id) => {
        const gameDoc = doc(db, "games", id);
        await deleteDoc(gameDoc);
        getGameInfo();
    }

    const updateGameInfo = async (id) => {
        const gameDoc = doc(db, "games", id);
        await updateDoc(gameDoc, {name: updatedgameTitle})
        getGameInfo();
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
            <br />
            <p>Add Game Info </p>
            <input placeholder="Name of Game" onChange={(e) => {
                setNewGameList((prev) => {
                    return {...prev, gameName: e.target.value}
                })
            }}/>
            <input placeholder="Year of release" type="number" onChange={(e) => {
                setNewGameList((prev) => {
                    return {...prev, gameReleaseYear: Number(e.target.value)}
                })
            }}/>
            <label>Available for Windows</label>
            <input type="checkbox" onChange={(e) => {
                setNewGameList((prev) => {
                    return {...prev, onPC: e.target.checked}
                })
            }} checked={newGameList.onPC}/>
            <label>Available for Android</label>
            <input type="checkbox" onChange={(e) => {
                setNewGameList((prev) => {
                    return {...prev, onAndroid: e.target.checked}
                })
            }} checked={newGameList.onAndroid}/>
            <button onClick={addGameData}>Add Game Info</button>
            <div>
                {gamesList.map((game) => {
                    return (
                        <>
                        <ul>
                            <li key={game.id}>
                            <h1>Name: {game.name}</h1>
                            <p>Year: {game.releaseYear}</p>
                            <p>{game.avaialbleOnPC ? "For Windows" : "Windows not supported"}</p>
                            <div>{game.availableOnAndroid ? "For Android" : "Android Not Supported"}</div>
                            <button onClick={() => deleteGame(game.id)}>Delete Game Info</button>
                            <input placeholder="Update Game Name" onChange={(e) => {setupdatedGameTitle(e.target.value)}}/>
                            <button onClick={() => updateGameInfo(game.id)}>Update Title</button>
                            </li>
                        </ul>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default searchGames;