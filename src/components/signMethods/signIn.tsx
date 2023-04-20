import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Button, { ButtonProps } from '@mui/material/Button';
import styles from './signMethodsButton/signMethods.module.scss';
import { FormEvent, useState } from 'react';
import { auth } from '../../libs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

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

export default function SignIn() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => console.log(userCredential))
        .catch((err) => console.log(err))
    }

    return (
        <div >
            <h2 className={styles.title}>Welcome Back</h2>
                <form className={styles.forms} onSubmit={handleSignIn}>
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
                    <span style={{padding: 0}}>
                        <RegisterButton type="submit">Enter</RegisterButton>
                    </span>
                </form>
        </div>
    )
}