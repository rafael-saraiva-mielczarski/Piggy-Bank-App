import { Container } from "@mui/system"
import Image from "next/image"
import pig from "../../assets/pig.png"
import styles from "./header.module.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import ModeSwitcher from "../modeSwitcher";

export default function Header () {
    
    return (
        <div style={{background: "#FFD0F5"}}>
        <Container>
            <div className={styles.header}>
                <nav className={styles.nav}>
                    <Image src={pig} alt={""} className={styles.pig}/>
                    <p>Home</p>
                    <p>Expenses</p>
                    <p>Crypto</p>
                    <p>Charts</p>
                </nav>
                <div className={styles.utils}>
                    <ModeSwitcher />
                    <LogoutIcon />
                </div>
            </div>
        </Container>
        </div>
    )
}