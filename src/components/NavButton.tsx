type ButtonProps = {
    title: string
}

export default function NavButton({title}:ButtonProps) {
    
    return (
        <div>
            <button>{title}</button>
        </div>
    )
}