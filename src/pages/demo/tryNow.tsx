import { Container } from "@mui/system";
import styles from "./tryNow.module.scss";
import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import NavButton from "@/components/navButton";
import Link from "next/link";

export default function tryNow(){

    const CssTextField = styled(TextField)({
        '& .MuiInputBase-input': {
            color: '#640250',
            borderRight: '3px solid #640250',

        }, 
        fontFamily: ['Arvo'].join(','),
        '& label.Mui-focused': {
          color: '#640250',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#640250',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#640250',
          },
          '&:hover fieldset': {
            borderColor: '#640250',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#640250',
          },
        },
      });

    const navTitle = "Try Demo"
  
  return (
    <div className={styles.newsletter}>
        <Container>
            <section className={styles.disclaimer}>
                <h2>Hey, we are glad you want to try out our product!</h2>
                <p>Unfortunately the Piggy Bank App has not been released to the public yet.</p>
                <p>Our whole team is working as hard as they can to deliver the best experience you can have!</p>
            </section>
            <section className={styles.newsletterBox}>
                <div className={styles.newsletterText}>
                    <h2>Want to know all the news about the Piggy Bank App?</h2>
                    <p>Become a member and subscribe for our newsletter program!</p>
                </div>
                <div className={styles.newsletterInputs}>
                    <form>
                    <CssTextField label="Email" id="email" name="email" />
                    <input type="submit" value="Subscribe" className={styles.subscribe}/>
                    </form>
                    <p>We care about your data in our <a href="privacy">privacy policy</a></p>
                </div>
            </section>
            <section className={styles.freeTrial}>
                <p>If you want to try our early acess demo you can click the button bellow!</p>
                <Link href="/"><NavButton title={navTitle} /></Link>
            </section>
        </Container>
    </div>
  );
};