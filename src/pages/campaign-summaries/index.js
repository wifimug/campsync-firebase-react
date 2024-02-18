import { useState, useEffect } from "react";
import { useGetCampaignByID } from "../../hooks/useGetCampaignByID"
import { NavBar } from "../../navbar";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useLinkCharID } from "../../hooks/useLinkCharID";
import { useGetCharData } from "../../hooks/useGetCharData";


export const CampaignSummaries = () => {
    const campaignID = localStorage.getItem("currentCampaign");
    //console.log(campaignID);
    const { userID } = useGetUserInfo();
    const {campaignName, campaignDesc} = useGetCampaignByID(campaignID);
    const [charID, setCharID] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {linkCharID} = useLinkCharID();

    //console.log("outside hook");
    const linkCharIDSubmit = async (e) => {    //form for linking character id
      e.preventDefault();

      //try {
        //const {charName} = useGetCharData(charID)

        await linkCharID({
          userID,
          campaignID,
          charID
        });

      //} catch (err) {
        //console.log(err.message)
      //}
      setCharID("");
    };

    return (
      <>
        <NavBar/>
        <h1>Campaign Summaries</h1>
        <p>Campaign ID: {campaignID}</p>
        <p>Campaign name: {campaignName}</p>
        <p>Campaign description: {campaignDesc}</p>

        <form className="linkCharID" onSubmit={linkCharIDSubmit}>
            <label> DnDBeyond Character ID: </label>
            <input 
                type="text"
                placeholder="Character ID"
                value={charID}
                required
                onChange={(e) => setCharID(e.target.value)}
            />
            <button type="submit"> Link Character ID </button>
        </form>
      </>
  )
}