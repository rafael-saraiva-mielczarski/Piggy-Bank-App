import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const ButtonAdd = styled(Button)<ButtonProps>(() => ({
    color: "white",
    padding: "12px 0",
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "#a4008e",
    borderRadius: "100px",
    fontFamily: 'inherit',
    '&:hover': {
      backgroundColor: "#CA0092",
    },
    '&:active': {
      backgroundColor: '#CA0092',
    },
  }));

export default function AddButton() {

    return (
        <div style={{padding: "0 10px"}}>
            <ButtonAdd type='submit'> <AddIcon fontSize="large"/> </ButtonAdd>
        </div>
    )
}