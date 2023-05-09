type ButtonProps = {
    title: string
}

const styledButton = {
    button: {
        color: "#6c0145",
        background: "#FFD0F5",
        padding: "20px",
        border: "4px solid #FF9AD1",
        borderRadius: "10px",
        fontFamily: "inherit",
        fontSize: "19px",
        marginBottom: "20px",
        cursor: "pointer"
      }
}

export default function NavButton({title}:ButtonProps) {
    
    return (
        <div>
            <button style={styledButton.button}>{title}</button>
        </div>
    )
}
