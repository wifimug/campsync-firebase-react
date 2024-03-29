import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateCampaign } from "../../hooks/useCreateCampaign";
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { NavBar } from '../../navbar';
import { useGetCampaigns } from '../../hooks/useGetCampaigns';
import { useJoinCampaign } from '../../hooks/useJoinCampaign';
import { useGetCampaignByID } from '../../hooks/useGetCampaignByID';
import './styles.css';

export const CampaignSelection = () => {
    const navigate = useNavigate();
    const { createCampaign } = useCreateCampaign();
    const { joinCampaign } = useJoinCampaign();
    const { userID } = useGetUserInfo();
    const [campaignName, setCampaignName] = useState("");
    const [description, setDescription] = useState("");
    const [campaignID, setCampaignID] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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

    const joinCampaignSubmit = async (e) => {    //form for creating a new campaign
        let errorMessage;
        e.preventDefault();
        try {

            await joinCampaign({
                userID,
                campaignID
            });
    
            setCampaignID("");
            navigate("/campaign-summaries");

        } catch (err) {
            setErrorMessage(err.message);
        }

    };

    return (
        <>
        <NavBar/>
        <h1>CampaignSelection</h1>
        <form className="createCampaign" onSubmit={createCampaignSubmit}>
            <label> Name: </label>
            <input 
                type="text"
                placeholder="Campaign Name"
                value={campaignName}
                required
                onChange={(e) => setCampaignName(e.target.value)}
            />
            <label> Description: </label>
            <input 
                type="text"
                placeholder="Campaign Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit"> Create Campaign </button>
        </form>

        <p>{errorMessage}</p>
        <form className="joinCampaign" onSubmit={joinCampaignSubmit}>
            <label> Campaign ID: </label>
            <input 
                type="text"
                placeholder="Campaign ID"
                value={campaignID}
                required
                onChange={(e) => setCampaignID(e.target.value)}
            />
            <button type='submit'> Join Campaign </button>

        </form>

        <div className="campaigns">
            <h3> Joined Campaigns </h3>
            <ul>
                {campaigns.map((campaign) => {
                    return <li className='campaignOption'>
                        <h3 className='campaignName'>
                            Name: {campaign["name"]}
                        </h3>
                        <h5 className='campaignDesc'>
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