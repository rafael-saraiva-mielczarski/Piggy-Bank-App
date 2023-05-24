import { Container } from "@mui/material"
import styles from './crypto.module.scss'

type Coin = {
    coinsData: any
}

export async function getStaticProps() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1&sparkline=false&locale=en")

    const coinsData = await response.json()
    return {
        props: { coinsData }
    }
}


export default function Crypto( {coinsData}: Coin ) {

    return(
        <Container>Crypto
            <div className={styles.coinsList}>
                {coinsData.map((coin: any, index: number) => 
                <div key={index} className={styles.coin}>
                    <img src={coin.image} alt="coin logo" />
                    <div>
                        <h1>{coin.name}</h1>
                        <p>{coin.symbol.toUpperCase()}</p>
                        <p>{coin.current_price} USD</p>
                        <p style={{color: coin.price_change_24h < 0 ? 'red':'green'}}>
                            {coin.price_change_24h.toString().length < 9 ? coin.price_change_24h : coin.price_change_24h.toFixed(8)}
                        </p>
                    </div>
                </div>
                )}
            </div>
        </Container>
    )
}
