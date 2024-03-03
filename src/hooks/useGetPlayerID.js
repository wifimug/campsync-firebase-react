import { useEffect, useState } from 'react';
import { db } from '../config/firebase-config';
import { doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";


export const useGetPlayerID = (userID, campaignID) => {

    const [playerID, setPlayerID] = useState("");

    const getPlayerID = async () => {

        const playersCollectionRef = collection(db, "players");
        const queryPlayers = query(playersCollectionRef, where("campaign", "==", campaignID), where("user", "==", userID));
        if (queryPlayers.empty) {
            throw Error("Player does not exist") 
        } else {
            const querySnapshot = await getDocs(queryPlayers);
            querySnapshot.forEach((doc) => {
                setPlayerID(doc.id);
            });
        }
        
    }

    useEffect(() => {
        getPlayerID()
    }, [])


    return { playerID };
}