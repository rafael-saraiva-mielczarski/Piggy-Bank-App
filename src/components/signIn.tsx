import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Button, { ButtonProps } from '@mui/material/Button';

const InputTextField = styled(TextField)({
    '& .MuiFormLabel-root': {
        fontFamily: "inherit",
        width: "100px",
    },
    '& .MuiInputBase-input': {
        width: "300px",
    },
    '& label.Mui-focused': {
      color: 'black',
      fontFamily: 'inherit',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',   
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  });

  const RegisterButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "white",
    padding: "10px 20px",
    backgroundColor: "#1DD100",
    border: "2px solid black",
    borderRadius: "10px",
    fontFamily: 'inherit',
    '&:hover': {
      backgroundColor: "green",
    },
    '&:active': {
      backgroundColor: '#0F6A00',
    },
  }));

  const styledForms = {
    div: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    h2: {
        paddingBottom: "20px"
    },
    span: {
        padding: "10px 0"
    }
  }

export default function SignIn() {

    const handleSignIn = () => {

    }

    return (
        <div style={styledForms.div}>
            <h2 style={styledForms.h2}>Register for free!</h2>
                <span style={styledForms.span}>
                    <InputTextField id="email" label="Email" variant="outlined" type="email"/>
                </span>
                <span style={styledForms.span}>
                    <InputTextField id="password" label="Password" variant="outlined" type="password"/>
                </span>
                <span style={{paddingTop:"10px", margin: 0}}>
                    <RegisterButton>Register</RegisterButton>
                </span>
        </div>
    )
}