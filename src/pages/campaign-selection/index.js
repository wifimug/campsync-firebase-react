import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateCampaign } from "../../hooks/useCreateCampaign";
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { NavBar } from '../../navbar';
import { useGetCampaigns } from '../../hooks/useGetCampaigns';
import { useGetCampaignByID } from '../../hooks/useGetCampaignByID';

export const CampaignSelection = () => {
    const navigate = useNavigate();
    const { createCampaign } = useCreateCampaign();
    const { userID } = useGetUserInfo();
    const [campaignName, setCampaignName] = useState("");
    const [description, setDescription] = useState("");

    const { campaigns } = useGetCampaigns();

    const createCampaignSubmit = async (e) => {    //form for creating a new campaign
        e.preventDefault();
        await createCampaign({
            userID,
            campaignName,
            description
        });

        setCampaignName("");
        setDescription("");
        navigate("/campaign-summaries");
    };

    return (
        <>
        <NavBar/>
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
            <h3> Joined Campaigns </h3>
            <ul>
                {campaigns.map((campaign) => {
                    return <li>
                        <h4>
                            Name: {campaign["name"]}
                        </h4>
                        <h5>
                            Description: {campaign["description"]}
                        </h5>
                        <div className="campaignSelect" onClick={async () => {
                            await localStorage.setItem("currentCampaign", campaign.id);
                            navigate("/campaign-summaries")
                        }}>
                            Select 
                        </div>
                    </li>
                })}
            </ul>
        </div>
        </>
    );
};