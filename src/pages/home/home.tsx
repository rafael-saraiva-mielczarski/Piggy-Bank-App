import Link from "next/link";
import { Container } from "@mui/material";
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import styles from './home.module.scss';
import EastIcon from '@mui/icons-material/East';
import { FormEvent, useState } from "react";
import NavButton from "@/components/navButton";

const InputTextField = styled(TextField)({
    '& .MuiFormLabel-root': {
        fontFamily: "inherit",
        width: "100px"
    },
    '& .MuiInputBase-input': {
        width: "100px",
    },
    '& label.Mui-focused': {
      color: '#5c003a',
      fontFamily: 'inherit',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#5c003a',   
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5c003a',
      },
      '&:hover fieldset': {
        borderColor: '#5c003a',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#5c003a',
      },
    },
  });

export default function Home() {

    const [totalIncome, setTotalIncome] = useState<number>(0)
    const [invested, setInvested] = useState<number>(0)
    const [remaining, setRemaining] = useState<number>(0)
    const [expenses, setExpenses] = useState<number>(0)

    function handleIncomeChange(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
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
                                type="text"
                                onChange={(e) => setTotalIncome(parseInt(e.target.value))} />
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