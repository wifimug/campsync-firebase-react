import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetSummary = (props) => {

    const collectionRef = collection(db, "summaries");
    const { userID } = useGetUserInfo();
    const campaignID = props;

    const [summaries, setSummaries] = useState([]);

    console.log("getting summary")


    const getSummary = async () => {
        const q = query(collectionRef, where("campaignID", "==", campaignID))
        const snapshot = await getDocs(q)
        snapshot.forEach(doc => {
            setSummaries(
                summaries=>[...summaries, doc.data()["summary"]]
            )
                })
    }

    useEffect(() => {
        getSummary();
    }, [])

    return [summaries]
}