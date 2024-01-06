import { useState } from 'react'
import { useAddCampaign } from "../../hooks/useAddCampaign";
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

export const CampaignSelection = () => {

    const { addCampaign } = useAddCampaign();
    const { userID } = useGetUserInfo();
    const [campaignName, setCampaignName] = useState("");
    const [description, setDescription] = useState("");

    const addCampaignSubmit = (e) => {    //form for creating a new campaign
        e.preventDefault();
        addCampaign({
            userID,
            campaignName,
            description
        });

        setCampaignName("");
        setDescription("");
    };

    const joinCampaign = (e) => {   //form for joining an existing campaign

    };

    return (
        <>
        <h1>CampaignSelection</h1>
        <form className="addCampaign" onSubmit={addCampaignSubmit}>
            <input 
                type="text"
                placeholder="Campaign Name"
                value={campaignName}
                required
                onChange={(e) => setCampaignName(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Campaign Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit"> Add Campaign </button>
        </form>

        <form className="joinCampaign">

        </form>

        <div className="campaigns">

        </div>
        </>
    );
};