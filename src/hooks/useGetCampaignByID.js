import { useEffect, useState } from 'react';
import { db } from '../config/firebase-config';
import { doc, getDoc } from "firebase/firestore";

export const useGetCampaignByID = (props) => {
    // let [campaign, setCampaign] = useState({
    //     players: [],
    //     creator: "",
    //     decription: "",
    //     name: ""
    // });
    // const campaignID = localStorage.getItem("currentCampaign");

    // const campaignRef = doc(db, "campaigns", campaignID);
    // const campaignSnap = getDoc(campaignRef);
    // campaign = campaignSnapawait.data();

    const campaignID = props;
    console.log(props)

    const [campaignName, setCampaignNames] = useState("");
    const [campaignDesc, setCampaignDesc] = useState("");


    const getCampaign = async () => {
        
        const ref = doc(db, "campaigns", campaignID);
        const campaignDoc = await getDoc(ref);

        if (!campaignDoc.exists()) {
            console.log("Doc doesn't exist");
        } else {
            console.log("Doc exists");
            const campaignData = campaignDoc.data();
            // console.log(JSON.stringify(campaignData), "retrieved data");
            setCampaignNames(campaignData["name"]);
            setCampaignDesc(campaignData["description"]);
            console.log(campaignName, campaignDesc);
        }
        
    }

    useEffect(() => {
        getCampaign()
    }, [])


    // if (campaignSnap.exists()) {
    //     console.log("Document data:", campaignSnap.data());
    //     console.log(JSON.stringify(campaignSnap.data()));
    //     setCampaign(campaignSnap.data());
    // } else {
    //     console.log("No such campaign!");
    // }
    return { campaignName, campaignDesc };
}