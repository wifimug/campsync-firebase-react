import { useGetCampaignByID } from "../../hooks/useGetCampaignByID"
import { NavBar } from "../../navbar";


export const CampaignSummaries = () => {
    const campaignID = localStorage.getItem("currentCampaign");
    //console.log(campaignID);
    const {campaignName, campaignDesc} = useGetCampaignByID(campaignID);

    //console.log("outside hook");

    return (
      <>
        <NavBar/>
        <h1>Campaign Summaries</h1>
        <p>Campaign ID: {campaignID}</p>
        <p>Campaign name: {campaignName}</p>
        <p>Campaign description: {campaignDesc}</p>
      </>
  )
}