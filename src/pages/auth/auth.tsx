import ModeSwitcher from "@/components/modeSwitcher";
import { Container } from "@mui/system";
import Image from "next/image";
import styles from "./auth.module.scss"
import pig from "@/assets/pig.png"
import SignMethodsButton from "@/components/signMethods/signMethodsButton/signMethodsButton";
import { useState } from "react";
import SignIn from "@/components/signMethods/signIn";
import SignUp from "@/components/signMethods/signUp";

export default function Auth() {
    
    const signIn:string = "Sign In";
    const signUp:string = "Sign Up";

    const [signMethod, setSignMethod] = useState(1)
    const [active, setActive] = useState(1)

    return (
        <div className={styles.auth}>
            <Container >
                <section className={styles.header}>
                    <section className={styles.intro}>
                        <h1>Welcome to your Piggy Bank App!</h1>
                        <p>An online app where you can keep account of your money, expenses and take a look at the crypto and stock market.</p>
                    </section>
                    <span className={styles.switch}><ModeSwitcher /></span>
                </section>
                <section className={styles.body}>
                    <div className={styles.signInBox}>
                        <div className={styles.signBtns}>
                            <SignMethodsButton title={signIn} style={active === 1 ? {background: "#EC32B8"} : {background: "gray", border: "2px solid #666666"}} onClick={() => {(setSignMethod(1)); (setActive(1))}}/>
                            <SignMethodsButton title={signUp} style={active === 2 ? {background: "#EC32B8"} : {background: "gray", border: "2px solid #666666"}} onClick={() => {(setSignMethod(2)); setActive((2))}}/>
                        </div>
                        <div className={styles.signForms}>
                        {signMethod === 1 ? <SignIn /> : <SignUp />}
                        </div>
                    </div>
                    <Image src={pig} alt="pig logo" className={styles.pigImg}/>
                </section>
            </Container>
        </div>
    )
}