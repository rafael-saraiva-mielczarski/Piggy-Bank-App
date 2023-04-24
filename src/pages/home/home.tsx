import NavButton from "@/components/navButton";
import Link from "next/link";
import { Container } from "@mui/material";
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import styles from './home.module.scss';
import EastIcon from '@mui/icons-material/East';

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

    return (
        <div className={styles.home}>
            <Container>
                <section className={styles.homeLeft}>
                    <section className={styles.introBox}>
                        <h2>Welcome</h2>
                        <p>This is the home page, find a brief overview of your spendings and links to other pages.</p>
                    </section>
                    <form action="" className={styles.formBox}>
                        <p>First add your total income:</p>
                        <InputTextField 
                                id="email" 
                                label="Earnings" 
                                variant="outlined" 
                                type="text" />
                        <span id="submit"><AddIcon fontSize="large"/></span>
                    </form>
                    <Link href="/">
                        <button className={styles.navBtn}>Add or Check Expenses <EastIcon fontSize="large"/></button>
                    </Link>
                    <Link href="/">
                        <button className={styles.navBtn}>Crypto Investments<EastIcon fontSize="large"/> </button>
                    </Link>
                </section>
            </Container>
        </div>
    )
}