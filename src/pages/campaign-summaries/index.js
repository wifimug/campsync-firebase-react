import { useGetCampaignByID } from "../../hooks/useGetCampaignByID"


export const CampaignSummaries = () => {
    const currentCampaign = useGetCampaignByID();
    const campaignID = localStorage.getItem("currentCampaign");

    return <>
        <p>CampaignSummaries {campaignID}</p>
    </>
}