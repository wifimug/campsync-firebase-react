import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddSummary = () => {

    const collectionRef = collection(db, "summaries");
    const { userID } = useGetUserInfo();


    const addSummary = async ({
        campaignID,
        summary
    }) => {
        console.log("Hello ID", campaignID)
        await addDoc(collectionRef, {
            creator: userID,
            summary: summary,
            campaignID: campaignID,
            createdAt: serverTimestamp()
        })
    }
    return {addSummary}
}