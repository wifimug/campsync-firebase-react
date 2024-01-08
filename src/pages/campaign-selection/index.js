import { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useCreateCampaign } from "../../hooks/useCreateCampaign";
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

export const CampaignSelection = () => {
    const navigate = useNavigate();
    const { createCampaign } = useCreateCampaign();
    const { userID } = useGetUserInfo();
    const [campaignName, setCampaignName] = useState("");
    const [description, setDescription] = useState("");

    const createCampaignSubmit = (e) => {    //form for creating a new campaign
        e.preventDefault();
        createCampaign({
            userID,
            campaignName,
            description
        });

        setCampaignName("");
        setDescription("");
        navigate("/campaign-summaries");
    };

    const joinCampaign = (e) => {   //form for joining an existing campaign

    };

    return (
        <>
        <h1>CampaignSelection</h1>
        <form className="createCampaign" onSubmit={createCampaignSubmit}>
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
            <button type="submit"> Create Campaign </button>
        </form>

        <form className="joinCampaign">

        </form>

        <div className="campaigns">

        </div>
        </>
    );
};