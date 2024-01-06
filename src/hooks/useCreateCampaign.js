import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useCreateCampaign = () => {
    const transactionCollectionRef = collection(db, "campaigns");
    const createCampaign = async ({
        userID, 
        description, 
        campaignName
    }) => {
        console.log(userID);
        console.log(description);
        console.log(campaignName);
        await addDoc(transactionCollectionRef, {
            creator: userID,
            description: description,
            name: campaignName,
            players: [userID]
        });
    };
     return {createCampaign};

}