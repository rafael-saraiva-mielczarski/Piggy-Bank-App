import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { CSSProperties } from 'react';

const SignButton = styled(Button)<ButtonProps>(() => ({
    color: "white",
    padding: "10px 20px",
    border: "2px solid #5c003a",
    borderRadius: "10px",
    fontFamily: 'inherit',
    '&:hover': {
      backgroundColor: "#CA0092",
    },
    '&:active': {
      backgroundColor: '#CA0092',
    },
  }));

export default function SignMethodsButton(props:{onClick:()=>void, style: CSSProperties, title: string}) {

    return (
        <div style={{padding: "0 10px"}}>
            <SignButton onClick={props.onClick} style={props.style}>{props.title}</SignButton>
        </div>
    )
}