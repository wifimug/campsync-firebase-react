import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from "./useGetUserInfo";
import { SignInMethod } from 'firebase/auth';

export const useGetCampaignByID = async () => {
    let [campaign, setCampaign] = useState({
        players: [],
        creator: "",
        decription: "",
        name: ""
    });
    const campaignID = localStorage.getItem("currentCampaign");

    const campaignRef = doc(db, "campaigns", campaignID);
    const campaignSnap = await getDoc(campaignRef);

    campaign = campaignSnap.data();

    //if (campaignSnap.exists()) {
        //console.log("Document data:", campaignSnap.data());
        //console.log(JSON.stringify(campaignSnap.data()));
        //setCampaign(campaignSnap.data());
    //} else {
        //console.log("No such campaign!");
    //}
    console.log(JSON.stringify(campaign));
    return { campaign };
}