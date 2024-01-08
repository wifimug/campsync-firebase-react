import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useCreateCampaign = () => {
    const campaignCollectionRef = collection(db, "campaigns");
    const createCampaign = async ({
        userID, 
        description, 
        campaignName
    }) => {

        const campaignRef = await addDoc(campaignCollectionRef, {
            creator: userID,
            description: description,
            name: campaignName,
            players: [userID]
        });

        console.log("id of new campaign: ",campaignRef.id);

        localStorage.setItem("currentCampaign", campaignRef.id);
    };

    return {createCampaign};

}