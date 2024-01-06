import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from './useGetUserInfo';

export const useAddCampaign = () => {
    const transactionCollectionRef = collection(db, "campaigns");
    const { userID } = useGetUserInfo();
    const addCampaign = async ({
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
            name: campaignName
        });
    };
     return {addCampaign};

}