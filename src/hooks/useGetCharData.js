import { useEffect, useState } from 'react';
import { query, collection, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useGetUserInfo } from './useGetUserInfo';
import { db } from "../config/firebase-config";


export const useGetCharData = () => {
    const [charName, setCharName] = useState("");

    const getCharData = (charID) => {
        fetch("/character-data", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"characterid": charID})
        }
        ).then(result => result.json()).then(data => {
            setCharName(data["data"]["name"])
        })
    }

    useEffect((charID) => {
        getCharData(charID)
    }, [])

    return { charName, getCharData };
}