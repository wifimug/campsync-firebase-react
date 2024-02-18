import { useState, useEffect } from "react";
import { collection, setDoc, getDocs, addDoc, arrayUnion, doc, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetCharData } from "./useGetCharData";

export const useLinkCharID = () => {
    const playersCollectionRef = collection(db, "players");
    const [playerID, setPlayerID] = useState("");
    const [charName, setCharName] = useState("");

    const linkCharID = async ({
        userID,  
        campaignID,
        charID
    }) => {
        await fetch("/character-data", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"characterid": charID})
        }
        ).then(result => result.json()).then(data => {
            console.log("heilo")
            setCharName(data["data"]["name"])
        })
        console.log(charName)

        const queryPlayers = query(playersCollectionRef, where("campaign", "==", campaignID), where("user", "==", userID));
        if (queryPlayers.empty) {
            throw Error("Player does not exist") 
        } else {
            const querySnapshot = await getDocs(queryPlayers);
            querySnapshot.forEach((doc) => {
                setPlayerID(doc.id);
            });
        }
        const playerRef = doc(db, 'players', playerID);
        await setDoc(playerRef, {
            name: charName,
            charID: charID
        }, {merge: true});
        console.log(charName)
    };
    
    return {linkCharID};

}