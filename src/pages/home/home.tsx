import Link from "next/link";
import { Container } from "@mui/material";
import styles from './home.module.scss';
import { InputTextField } from "@/components/signMethods/signIn";
import { FormEvent, use, useEffect, useState } from "react";
import { database, auth } from '../../libs/firebase.js'
import NavButton from "@/components/navButton";
import { ref, set, onValue, get } from 'firebase/database'
import { ExpenseData } from "@/interfaces/expenseData";
import AddButton from "@/components/addButton";
import DoughnoutChart from "@/components/doughnoutChart";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Image from "next/image";
import pig from '../../assets/pig.png'

export default function Home() {

    const [totalIncome, setTotalIncome] = useState<number>(0)
    const [invested, setInvested] = useState<number>(0)
    const [expenses, setExpenses] = useState<number>(0)
    const [hide, setHide] = useState<boolean>(true)
    const [expenseData, setExpenseData] = useState<ExpenseData[] | []>([])
    const userId = auth.currentUser?.uid
    const expensesRef = ref(database, `users/${userId}/expenses`)
    

    function getInvestedValue() {
        
        const investmentsData = expenseData.filter(expense => {
            return expense.category === "investments"
        })

        const investedValue = investmentsData.reduce((a, value) => a = a + value.price, 0)
        setInvested(investedValue)
        return investedValue
    }

    function getExpensesValue() {
        const expensesPrices = expenseData.filter(expense => {
            return expense.price
        })
        const expensesValue = expensesPrices.reduce((a, value) => a = a + value.price, 0)
        const expenseFinal = expensesValue - getInvestedValue()
        setExpenses(expenseFinal)
        return expensesValue
    }

    function handleIncomeChange(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        set(ref(database, `users/${userId}`), {
           income: totalIncome
        })

        setTotalIncome(0)
    }

    function getIncome() {
        //get expenses on page load and update as new expense is added
        try {
            get(ref(database, `users/${userId}`)).then((snapshot) => {
                if(snapshot.exists()) {
                    console.log("snapshot", Object.values(snapshot.val()))
                    snapshot.forEach(function (childSnapshot) {
                        const value = childSnapshot.val();
                        const responseData = value
                        setTotalIncome(responseData)
                        console.log("response" ,responseData)
                    })
                } else {
                }
            })
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getIncome()
        getExpensesValue()
        getInvestedValue()
    }, [expenseData]) 

    useEffect(() => {
        //get expenses
        try {
            onValue(expensesRef, (snapshot) => {
                if(snapshot.exists()) {
                    const responseData = Object.entries<ExpenseData>(snapshot.val() ?? []).map(([key, value]) => {
                        return {
                            id: key,
                            userId: value.userId,
                            title: value.title,
                            price: value.price,
                            category: value.category
                        }
                    })
                    setExpenseData(responseData)
                } else {
                }
            })
        } catch(err) {
            console.log(err);
        }
    }, [])

    const [incomeData, setIncomeData] = useState({
        labels: [
            "Total Income", "Expenses", "Invested"
        ],
        datasets: [{
            label: "Value",
            data: [0, 0, 0],
            backgroundColor: [
              'rgb(255, 208, 245)',
              'rgb(236, 50, 184)',
              'rgb(150, 0, 117)'
            ]
        }]
    })

    function setChart() {
        setIncomeData({
            labels: [
                "Total Income", "Expenses", "Invested"
            ],
            datasets: [{
                label: "Value",
                data: [totalIncome, expenses, invested],
                backgroundColor: [
                'rgb(255, 208, 245)',
                'rgb(236, 50, 184)',
                'rgb(150, 0, 117)'
                ]
            }]
        })
    }

    return (
        <Container>
            <div className={styles.home}>    
                <section className={styles.homeLeft}>
                    <section className={styles.introBox}>
                        <h2>Welcome</h2>
                        <p>This is the home page, find a brief overview of your spendings and links to other pages.</p>
                    </section>
                    <form onSubmit={handleIncomeChange} className={styles.formBox}>
                        <p>First add your total income:</p>
                        <InputTextField 
                                id="email" 
                                label="Earnings" 
                                variant="outlined" 
                                type="number"
                                placeholder="0"
                                value={totalIncome}
                                style={{width: "100px"}}
                                onChange={(e) => setTotalIncome(parseInt(e.target.value))} />
                        <AddButton />
                    </form>
                    <Link href="/expenses/expenses" style={{textDecoration: "none"}}>
                        <NavButton title="Add or Check Expenses" />
                    </Link>
                    <Link href="/crypto/crypto" style={{textDecoration: "none"}}>
                        <NavButton title="Crypto Investments" />
                    </Link>
                </section>
                <section className={styles.homeRight}>
                    {hide === true ? 
                    <div>
                        <section className={styles.showData}>
                            <p>Show your income</p>
                            <VisibilityIcon onClick={() => (setHide(!hide), setChart())} />
                        </section>
                        <section className={styles.userValues}>
                            <div className={styles.gridItem}>
                                <p>Total Income</p>
                                <VisibilityOffIcon style={{marginTop: "6px"}}/>
                            </div>
                            <div className={styles.gridItem}>
                                <p>Invested</p>
                                <VisibilityOffIcon style={{marginTop: "6px"}}/>
                            </div>
                            <div className={styles.gridItem}>
                                <p>Expenses</p>
                                <VisibilityOffIcon style={{marginTop: "6px"}}/>
                            </div>
                            <div className={styles.gridItem}>
                                <p>Remaining</p>
                                <VisibilityOffIcon style={{marginTop: "6px"}}/>
                            </div>
                        </section>
                        <div className={styles.chart}>
                            <Image src={pig} alt="pig" priority className={styles.pigImg} />
                        </div>
                    </div>
                    : 
                    <div>
                        <section className={styles.showData}>
                            <p>Hide your income</p>
                            <VisibilityOffIcon onClick={() => (setHide(!hide), setChart() )} />
                        </section>
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
                                <h2  style={{color: totalIncome - expenses < 0 ? 'red':'green'}}>{totalIncome - expenses}$</h2>
                            </div>
                        </section>
                        <div className={styles.chart}>
                            <DoughnoutChart chartData={incomeData} />
                        </div>
                    </div>
                    }
                </section>
            </div>
        </Container>
    )
}