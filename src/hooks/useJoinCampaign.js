import { collection, updateDoc, getDoc, addDoc, arrayUnion, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useJoinCampaign = () => {
    const playerCollectionRef = collection(db, "players");
    const joinCampaign = async ({
        userID,  
        campaignID
    }) => {
        const campaignRef = doc(db, "campaigns", campaignID);
        const campaignSnap = await getDoc(campaignRef);

        if (campaignSnap.exists()) {

            await updateDoc(campaignRef, {
                players: arrayUnion(userID)
            });
            //console.log("id of new campaign: ",campaignRef.id);
            localStorage.setItem("currentCampaign", campaignRef.id);
    
            addDoc(playerCollectionRef, {
                campaign: campaignRef.id,
                isDM: false,
                name: campaignID + " Character",
                user: userID
            });

        } else {
            console.log("Campaign does not exist.")
        }

    };
    
    return {joinCampaign};

}