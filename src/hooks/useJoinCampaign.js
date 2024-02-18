import { collection, updateDoc, getDoc, addDoc, arrayUnion, doc, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useJoinCampaign = () => {
    const playersCollectionRef = collection(db, "players");
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
            
            localStorage.setItem("currentCampaign", campaignID);

            const queryPlayers = query(playersCollectionRef, where("campaign", "==", campaignID), where("user", "==", userID));

            if (queryPlayers.empty) {
                addDoc(playersCollectionRef, {
                    campaign: campaignID,
                    isDM: false,
                    name: campaignID + " Character",
                    user: userID,
                    charID: null
                });
            } else {
                throw Error("Already joined campaign")
            }

        } else {
           throw Error("Campaign does not exist");
        }

    };
    
    return {joinCampaign};

}