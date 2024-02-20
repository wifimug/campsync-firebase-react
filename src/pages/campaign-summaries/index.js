import { useGetCampaignByID } from "../../hooks/useGetCampaignByID"
import { NavBar } from "../../navbar";
import { useNavigate } from 'react-router-dom';



export const CampaignSummaries = () => {
    const campaignID = localStorage.getItem("currentCampaign");
    //console.log(campaignID);
    const navigate = useNavigate();
    const {campaignName, campaignDesc} = useGetCampaignByID(campaignID);

    const onSubmit = (e) => {
      e.preventDefault();
      navigate("/add-summary", {state: {campaignID: campaignID}})
    }
    console.log("summaries page");

    return (
      <main>
        <NavBar/>
        <h1>Campaign Summaries</h1>
        <p>Campaign ID: {campaignID}</p>
        <p>Campaign name: {campaignName}</p>
        <p>Campaign description: {campaignDesc}</p>

        <button onClick={onSubmit}>
            Add Summary
        </button>

      </main>
  )
}