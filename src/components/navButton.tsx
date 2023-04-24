import EastIcon from '@mui/icons-material/East';

type ButtonProps = {
    title: string
}

const styledButton = {
    button: {
        color: "black",
        background: "#FFD0F5",
        padding: "10px",
        border: "4px solid #FF9AD1",
        borderRadius: "10px",
        fontFamily: "inherit",
        fontSize: "19px"
      }
}

export default function NavButton({title}:ButtonProps) {
    
    return (
        <div>
            <button style={styledButton.button}>{title}</button>
        </div>
    )
}
