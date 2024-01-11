import { useEffect, useState } from 'react';
import { query, collection, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useGetUserInfo } from './useGetUserInfo';
import { db } from "../config/firebase-config";


export const useGetCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);

    const playerCollectionRef = collection(db, "players");
    const { userID } = useGetUserInfo();

    const getCampaigns = async () => {
        let i;
        try {
            const queryPlayers = query(playerCollectionRef, where("user", "==", userID));

            i = onSnapshot(queryPlayers, (snapshot) => {

                let docs = [];

                snapshot.forEach((doc) => {
                    const player = doc.data();
                    docs.push(player["campaign"])
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

    console.log(campaigns);
    return { campaigns };
}