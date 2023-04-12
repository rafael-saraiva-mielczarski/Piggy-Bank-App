import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Switch from '@mui/material/Switch';

const styledSwitcher = {
    div: {
        display: "flex",
        alignItems: "center",
        paddingRight: "30px"
    }
}

export default function ModeSwitcher() {

    return (
        <div style={styledSwitcher.div}>
            <LightModeIcon />
            <Switch color='default'/>
            <DarkModeIcon />
        </div>
    )
}