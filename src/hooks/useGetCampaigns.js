import { useEffect, useState } from 'react';
import { query, collection, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useGetUserInfo } from './useGetUserInfo';
import { db } from "../config/firebase-config";


export const useGetCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const campaignCollectionRef = collection(db, "campaigns");
    const { userID } = useGetUserInfo();

    const getCampaigns = async () => {
        let i;
        try {
            const queryCampaigns = query(campaignCollectionRef, where("players", "array-contains", userID));

            i = onSnapshot(queryCampaigns, (snapshot) => {

                let docs = [];

                snapshot.forEach((doc) => {
                    const campaign = doc.data();
                    const id = doc.id;
                    docs.push({...campaign, id});
                })

                setCampaigns(docs);
            });

        } catch (err) {
            console.error(err)
        }
        return () => i();
    };

    useEffect(() => {
        getCampaigns()
    }, []);

    return { campaigns };
}