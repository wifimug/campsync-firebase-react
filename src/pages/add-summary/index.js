import { useState } from "react";
import { useAddSummary } from "../../hooks/useAddSummary";
import { useGetCampaignByID } from "../../hooks/useGetCampaignByID"
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { NavBar } from "../../navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const AddSummary = (props) => {
    const location = useLocation();
    const campaignID  = location.state.campaignID || {}



    const { addSummary } = useAddSummary();
    const [ summary, setSummary ] = useState("");
    const { campaignName, campaignDesc } = useGetCampaignByID(campaignID);

    const navigate = useNavigate();



    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("submit function campaignID", campaignID)
        await addSummary({
            campaignID,
            summary
        })
        navigate('/campaign-summaries')
    }

    return (
      <main>
        <NavBar/>
        <h1>Post a Summary to {campaignName}</h1>
        <form onSubmit={onSubmit}>
            <label for="summary"> Summary: </label>
            <input 
            type="text"
            value={summary}
            required
            onChange={(e) => {
              setSummary(e.target.value)
            }}
            ></input>
            <button type="submit"> Submit </button>
        </form>
      </main>
  )
}