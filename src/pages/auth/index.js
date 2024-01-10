import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import './styles.css';
import { NavBar } from "../../navbar";

export const Auth = () => {

    const { isAuth } = useGetUserInfo();
    const navigate = useNavigate();
    

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        };
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