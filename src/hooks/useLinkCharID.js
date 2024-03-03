import { useState, useEffect } from "react";
import { collection, updateDoc, getDocs, addDoc, arrayUnion, doc, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetCharData } from "./useGetCharData";

export const useLinkCharID = () => {
    const playersCollectionRef = collection(db, "players");

    const linkCharID = async ({
        playerID,
        charID
    }) => {
        const playerRef = doc(db, "players", playerID);
        await updateDoc(playerRef, {
            charID: charID
        });
    };
    
    return {linkCharID};
}