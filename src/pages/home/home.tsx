import Link from "next/link";
import { Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from './home.module.scss';
import { InputTextField } from "@/components/signMethods/signIn";
import { FormEvent, useEffect, useState, MouseEvent } from "react";
import { database, auth } from '../../libs/firebase.js'
import NavButton from "@/components/navButton";
import { get, ref, set } from "firebase/database";
import { Income } from "@/interfaces/income";

export default function Home() {

    const [totalIncome, setTotalIncome] = useState<number[]>([0])
    const [loading, setLoading] = useState<boolean>(false)
    const [invested, setInvested] = useState<number>(0)
    const [remaining, setRemaining] = useState<number>(0)
    const [expenses, setExpenses] = useState<number>(0)
    const [haveData, setHaveData] = useState<boolean>(true)
    const userId = auth.currentUser?.uid
    const incomeRef = `users/${userId}`
    

    function handleIncomeChange(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        set(ref(database, `users/${userId}`), {
           income: totalIncome
        })
    }

    function getIncome(e: MouseEvent<HTMLButtonElement>) {
        setLoading(true)
        //get expenses on page load and update as new expense is added
        try {
            setLoading(true)
            get(ref(database, `users/${userId}`)).then((snapshot) => {
                if(snapshot.exists()) {
                    console.log("snapshot", Object.values(snapshot.val()))
                    const responseData: number[] = Object.values<number>(snapshot.val())
                    setTotalIncome(responseData)
                    setLoading(false)
                    setHaveData(true)
                    console.log(responseData)
                } else {
                    setLoading(false)
                    setHaveData(false)
                }
            })
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <div className={styles.home}>    
                <section className={styles.homeLeft}>
                    <section className={styles.introBox}>
                        <h2>Welcome</h2>
                        <p>This is the home page, find a brief overview of your spendings and links to other pages.</p>
                        <button onClick={getIncome}>get</button>
                    </section>
                    <form onSubmit={handleIncomeChange} className={styles.formBox}>
                        <p>First add your total income:</p>
                        <InputTextField 
                                id="email" 
                                label="Earnings" 
                                variant="outlined" 
                                type="text"
                                onChange={(e) => setTotalIncome([parseInt(e.target.value)])} />
                        <button type="submit"><AddIcon fontSize="large"/></button>
                    </form>
                    <Link href="/expenses/expenses" style={{textDecoration: "none"}}>
                        <NavButton title="Add or Check Expenses" />
                    </Link>
                    <Link href="/home" style={{textDecoration: "none"}}>
                        <NavButton title="Crypto Investments" />
                    </Link>
                </section>
                <section className={styles.homeRight}>
                    <section className={styles.userValues}>
                        <div className={styles.gridItem}>
                            <p>Total Income</p>
                            <h2>{totalIncome}$</h2>
                        </div>
                        <div className={styles.gridItem}>
                            <p>Invested</p>
                            <h2>{invested}$</h2>
                        </div>
                        <div className={styles.gridItem}>
                            <p>Expenses</p>
                            <h2>{expenses}$</h2>
                        </div>
                        <div className={styles.gridItem}>
                            <p>Remaining</p>
                            <h2>{remaining}$</h2>
                        </div>
                    </section>
                </section>
            </div>
        </Container>
    )
}