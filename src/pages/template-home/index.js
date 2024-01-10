import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import './styles.css';
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../navbar";

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { name, profilePhoto } = useGetUserInfo();
    const { transactions, transactionTotals } = useGetTransactions();
    const { balance, income, expenses } = transactionTotals;
    const navigate = useNavigate();
    
    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (err) {
            console.err(err);
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            description, 
            transactionAmount, 
            transactionType});
        setDescription("");
        setTransactionAmount(0);
    };    
    return (
    <>
    <NavBar/>
    <div className="expense-tracker">
        <div className="container">
            <h1> {name}'s Expense Tracker </h1>
            <div className="balance">
                <h3> Your Balance </h3>
                {balance >= 0 ? (
                    <h2> ${balance} </h2>
                ) : (
                    <h2> -${balance * -1} </h2>
                )}
                
            </div>
            <div className="summary">
                <div className="income"></div>
                <h4> Income </h4>
                <p> ${income} </p>
                <div className="expenses"></div>
                <h4> Expenses </h4>
                <p> ${expenses} </p>
            </div>
            <form className="add-transaction" onSubmit={onSubmit}>
                <input type="text" 
                placeholder="Description" 
                value={description}
                required 
                onChange={(e) => setDescription(e.target.value)}/>
                <input type="number" 
                placeholder="Amount" 
                value={transactionAmount}
                required 
                onChange={(e) => setTransactionAmount(e.target.value)}/>
                <input type="radio" 
                id="expense"
                 value="expense" 
                 checked={transactionType === "expense"}
                 required 
                 onChange={(e) => setTransactionType(e.target.value)} />
                <label htmlFor="expense"> Expense </label>
                <input type="radio" 
                id="income" 
                value="income" 
                checked={transactionType === "income"}
                required 
                onChange={(e) => setTransactionType(e.target.value)} />
                <label htmlFor="income"> Income </label>
                <button type="submit" className="add-transaction-btn"> Add Transaction </button>
            </form>
        </div>
        {profilePhoto && (
            <div className="profile-container">
                <div className="profile"> 
                    { " " }
                    <img className="profile-photo" src={profilePhoto} width="200" />
                    <button className="sign-out-btn" onClick={signUserOut}> 
                        Sign Out
                    </button>

                </div>
            </div>
        
        )}
        
    </div>
    <div className="transactions">
        <h3> Transactions </h3>
        <ul>
            {transactions.map((transaction) => {
                const {description, transactionAmount, transactionType} = transaction;
                return (
                    <li>
                        <h4> { description } </h4>
                        <p>
                            ${ transactionAmount } . <label style={{color: transactionType === "expense" ? "red" : "green"}}> { transactionType } </label>
                        </p>
                    </li>
                )
            })}
        </ul>

    </div>
    </>);
}