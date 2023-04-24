import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Button, { ButtonProps } from '@mui/material/Button';
import styles from './signMethodsButton/signMethods.module.scss';
import { auth } from '../../libs/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Alert, Fade } from '@mui/material';

const InputTextField = styled(TextField)({
    '& .MuiFormLabel-root': {
        fontFamily: "inherit",
        width: "100px",
    },
    '& .MuiInputBase-input': {
        width: "300px",
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

  const RegisterButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "white",
    padding: "10px 20px",
    backgroundColor: "#c90096",
    border: "2px solid #5c003a",
    borderRadius: "10px",
    fontFamily: 'inherit',
    '&:hover': {
      backgroundColor: "#aa007f",
    },
    '&:active': {
      backgroundColor: '#aa007f',
    },
  }));


export default function SignUp() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    
    const router = useRouter()

    const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            router.push('/')
        })
        .catch((error) => {
            console.log(error)
            switch(error.code) {
                case 'auth/email-already-in-use':
                    setError(true)
                    setErrorMessage("Email already in use!")
                    break;
                case  'auth/invalid-email':
                    setError(true)
                    setErrorMessage("Invalid email type!")
                    break;
            }
        })
    }

    return (
        <div>
            <h2 className={styles.title}>Register for free!</h2>
                <form className={styles.forms} onSubmit={handleSignUp}>
                    <span>
                        <InputTextField 
                        id="email" 
                        label="Email" 
                        variant="outlined" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </span>
                    <span>
                        <InputTextField 
                        id="password" 
                        label="Password" 
                        variant="outlined" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </span>
                    {error && <Fade in={error}><Alert severity='error' variant="filled" className={styles.alert}>{errorMessage}</Alert></Fade>}
                    <span style={{padding: 0}}>
                        <RegisterButton type="submit">Register</RegisterButton>
                    </span>
                </form>
        </div>
    )
}