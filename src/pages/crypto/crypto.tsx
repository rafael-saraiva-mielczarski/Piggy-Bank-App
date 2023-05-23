import Image from "next/image"

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
        <div>Crypto
            {coinsData.map((coin: any, index: number) => 
            <div key={index}>
                <h1>{coin.symbol}</h1>
                <img src={coin.image} alt="coin logo" />
            </div>
            )}
        </div>
    )
}
