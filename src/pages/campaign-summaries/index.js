import { useGetCampaignByID } from "../../hooks/useGetCampaignByID"


export const CampaignSummaries = () => {
    const campaign = useGetCampaignByID();
    const campaignID = localStorage.getItem("currentCampaign");

    console.log(JSON.stringify(campaign));

    return <>
        <h1>Campaign Summaries</h1>
        <p>Campaign ID: {campaignID}</p>
        <p>Campaign name: {campaign["name"]}</p>
        <p>Campaign description: {campaign["description"]}</p>
    </>
}