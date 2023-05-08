import { Container } from "@mui/system"
import Image from "next/image"
import pig from "../../assets/pig.png"
import styles from "./header.module.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import ModeSwitcher from "../modeSwitcher";
import { signOut } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header () {
    
    const router = useRouter()

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("logout successful")
            console.log(auth)
            router.push("/")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div style={{background: "#FFD0F5"}}>
        <Container>
            <div className={styles.header}>
                <nav className={styles.nav}>
                    <Image src={pig} alt={""} className={styles.pig}/>
                    <Link 
                    href="/home/home" 
                    style={{textDecoration:"none", color: "black"}}>
                        <p>Home</p>
                    </Link>
                    <Link 
                    href="/expenses/expenses" 
                    style={{textDecoration:"none", color: "black"}}>
                        <p>Expenses</p>
                    </Link>
                    <p>Crypto</p>
                    <p>Charts</p>
                </nav>
                <div className={styles.utils}>
                    <ModeSwitcher />
                    <span onClick={handleSignOut} style={{cursor: "pointer"}}><LogoutIcon/></span>
                </div>
            </div>
        </Container>
        </div>
    )
}