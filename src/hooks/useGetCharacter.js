import { useState, useEffect } from "react"
export async function useGetCharacter() {
    const [charData, setCharData] = useState()

    useEffect(() => {
        const options = {
            method: 'GET', 
        }
        fetch("https://character-service.dndbeyond.com/character/v5/character/101991519/", {mode:'no-cors'}, {options})
            .then(function (response) {
                console.log("response:", response.ok)
                if (response.status === 200) {
                    console.log("STATUS OK")
                    setCharData(response.text())
                    return response.text()
                } else {
                    console.log("STATUS BAD")
                }
            })  

    }, [])
    
}

