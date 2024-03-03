import { useEffect, useState } from 'react';
import { db } from '../config/firebase-config';
import { doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";


export const useGetCharacterIDByPlayer = (playerID) => {


    const [characterID, setCharacterID] = useState("");

    const getCharacterID = async (playerID) => {
        console.log("Hook2 playerID", playerID)

        const ref = doc(db, "players", playerID);
        const playerDoc = await getDoc(ref);

        if (!playerDoc.exists()) {
            console.log("Doc doesn't exist");
        } else {
            console.log("Doc exists");
            const playerData = playerDoc.data();
            setCharacterID(playerData["charID"]);
            console.log("hook charID", characterID);
        }
        
    }

    useEffect(() => {
        console.log("Hook1 playerID", playerID)
        if (playerID != "") {
            getCharacterID(playerID)
        } 
    }, [])


    return { characterID };
}