import { useState, useEffect } from "react";
import { useGetCampaignByID } from "../../hooks/useGetCampaignByID"
import { NavBar } from "../../navbar";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useLinkCharID } from "../../hooks/useLinkCharID";
import { useGetCharacterIDByPlayer } from "../../hooks/useGetCharacterIDByPlayer";
import { useGetPlayerID } from "../../hooks/useGetPlayerID";


export const CampaignSummaries = () => {
    const campaignID = localStorage.getItem("currentCampaign");
    //console.log(campaignID);
    const { userID } = useGetUserInfo();
    const { playerID } = useGetPlayerID(userID, campaignID);
    const {campaignName, campaignDesc} = useGetCampaignByID(campaignID);
    const [charID, setCharID] = useState("");
    console.log("playerID", playerID)
    const {characterID} = useGetCharacterIDByPlayer(playerID);
    console.log("characterID", characterID)
    const [errorMessage, setErrorMessage] = useState("");
    const {linkCharID} = useLinkCharID();
    const [charData, setCharData] = useState("")

    //console.log("outside hook");
    const linkCharIDSubmit = async (e) => {    //form for linking character id
      e.preventDefault();

      await linkCharID({
        playerID,
        charID
      });

      //setCharacterID(charID);
      setCharID("");
    };

    useEffect((characterID) => {
      if (characterID == "") {
        // do nothing
      } else {
        fetch("/character-data", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({"characterid": characterID})
        }
        ).then(result => result.json()).then(data => {
            console.log("heilo")
            setCharData(data["data"]["name"])
        })
      }
    });

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

        <h1>Current Character: {characterID}</h1>
      </>
  )
}