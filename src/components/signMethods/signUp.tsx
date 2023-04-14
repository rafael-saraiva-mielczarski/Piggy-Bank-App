import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Button, { ButtonProps } from '@mui/material/Button';
import styles from './signMethods.module.scss';

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

    const handleSignUp = () => {

    }

    return (
        <div className={styles.forms}>
            <h2>Welcome back!</h2>
                <span>
                    <InputTextField id="email" label="Email" variant="outlined" type="email"/>
                </span>
                <span>
                    <InputTextField id="password" label="Password" variant="outlined" type="password"/>
                </span>
                <span style={{padding: 0}}>
                    <RegisterButton>Enter</RegisterButton>
                </span>
        </div>
    )
}