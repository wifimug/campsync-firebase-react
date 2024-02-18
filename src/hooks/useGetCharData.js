import { useEffect, useState } from 'react';
import { query, collection, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useGetUserInfo } from './useGetUserInfo';
import { db } from "../config/firebase-config";


export const useGetCharData = (charID) => {
    const [charName, setCharName] = useState("");

    useEffect(() => {
        fetch("/character-data", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"characterid": charID})
        }
        ).then(result => result.json()).then(data => {
            console.log("heilo")
            setCharName(data["data"]["name"])
        })
    })

    return { charName };
}