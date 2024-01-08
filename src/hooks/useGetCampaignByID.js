import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetCampaignByID = async () => {
    const [campaign, setCampaign] = useState([]);
    const campaignID = localStorage.getItem("currentCampaign");

    const campaignRef = doc(db, "campaigns", campaignID);
    const campaignSnap = await getDoc(campaignRef);

    if (campaignSnap.exists()) {
        //console.log("Document data:", campaignSnap.data());
        setCampaign(campaignSnap);
    } else {
        console.log("No such campaign!");
    }

    return { campaign };
};