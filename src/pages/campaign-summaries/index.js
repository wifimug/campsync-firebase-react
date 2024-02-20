import { useGetCampaignByID } from "../../hooks/useGetCampaignByID"
import { NavBar } from "../../navbar";
import { useNavigate } from 'react-router-dom';
import { useGetSummary } from "../../hooks/useGetSummary";



export const CampaignSummaries = () => {
    const campaignID = localStorage.getItem("currentCampaign");
    //console.log(campaignID);
    const navigate = useNavigate();
    const summaries = useGetSummary(campaignID);
    const {campaignName, campaignDesc} = useGetCampaignByID(campaignID);

    const onSubmit = (e) => {
      e.preventDefault();
      navigate("/add-summary", {state: {campaignID: campaignID}})
    }
    console.log("summaries page");
    console.log(summaries.length)
    return (
      <main>
        <NavBar/>
        <h1>Campaign Summaries</h1>
        <p>Campaign ID: {campaignID}</p>
        <p>Campaign name: {campaignName}</p>
        <p>Campaign description: {campaignDesc}</p>
        <p>Summaries:     
          {summaries.map(item => {
            return (
              <ul>
                <li>{item}</li>
              </ul>
            )
          })}
        </p>

        <button onClick={onSubmit}>
            Add Summary
        </button>

      </main>
  )
}