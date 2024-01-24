import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import './styles.css';
import { NavBar } from "../../navbar";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

export const Auth = () => {

    const { isAuth } = useGetUserInfo();
    const navigate = useNavigate();
    

    const signInWithGoogle = async () => {
   
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            email: results.user.email,
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        };
        const collectionRef = doc(db, "users", authInfo.email)
        const existingUser = await getDoc(collectionRef)
        if (existingUser.exists()) {
            console.log("exisitng user")
            const userData = existingUser.data()
            authInfo.userID = userData["uid"]
        } else {
            console.log("not exist")
            await setDoc(doc(db, "users", authInfo.email), {
                uid: authInfo.userID
            })
        }
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/expense-tracker");
    }


    if (isAuth) {
        return <Navigate to="/expense-tracker" />
    }
    
    return (
        <>
        <NavBar/>
        <div className="login-page">
            <p>Sign in with Google to Continue</p>
            <button className="sign-in-with-google-btn" onClick={signInWithGoogle}> 
            {""}
                Sign in with Google 
            </button>
        </div>;
        </>
    )
}