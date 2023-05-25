import { Container, Pagination } from "@mui/material"
import styles from './crypto.module.scss'
import { useState } from "react";
import usePagination from '../../hooks/usePagination'
import { pink } from '@mui/material/colors'

type Coin = {
    coinsData: any
}

export async function getStaticProps() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=108&page=1&sparkline=false&locale=en")

    const coinsData = await response.json()
    return {
        props: { coinsData }
    }
}


export default function Crypto( {coinsData}: Coin ) {

    const color = pink[200]

    let [page, setPage] = useState(1);
    const PER_PAGE = 12;

    const count = Math.ceil(coinsData.length / PER_PAGE);
    const _DATA = usePagination(coinsData, PER_PAGE);

    const handleChange = (e: any, p: any) => {
        setPage(p);
        _DATA.jump(p);
    };

    return(
        <Container>
            <h1 className={styles.title}>Crypto Investments</h1>
            <div className={styles.coinsList}>
                {_DATA.currentData().map((coin: any, index: number) => 
                <div key={index} className={styles.coin}>
                    <img src={coin.image} alt="coin logo" />
                    <div>
                        <h2>{coin.name}</h2>
                        <p>Symbol: {coin.symbol.toUpperCase()}</p>
                        <p>Price: {coin.current_price} USD</p>
                        <p style={{color: coin.price_change_24h < 0 ? 'red':'green'}}>
                            <span style={{color: "black"}}>24h:</span> 
                            {coin.price_change_24h.toString().length < 9 ? coin.price_change_24h : coin.price_change_24h.toFixed(8)}
                        </p>
                    </div>
                </div>
                )}
            </div>
            <Pagination 
                count={count} 
                color="secondary" 
                size="large" 
                page={page} 
                onChange={handleChange}
                className={styles.pagination}
                />
        </Container>
    )
}


// import React, { useState } from "react";
// import { Box, List, Tag, ListItem, Divider } from "@chakra-ui/core";
// import { Pagination } from "@material-ui/lab";
// import usePagination from "./Pagination";
// import { default as data } from "./MOCK_DATA.json";

// export default function App() {
//   let [page, setPage] = useState(1);
//   const PER_PAGE = 24;

//   const count = Math.ceil(data.length / PER_PAGE);
//   const _DATA = usePagination(data, PER_PAGE);

//   const handleChange = (e, p) => {
//     setPage(p);
//     _DATA.jump(p);
//   };

//   return (
//     <Box p="5">
//       <Pagination
//         count={count}
//         size="large"
//         page={page}
//         variant="outlined"
//         shape="rounded"
//         onChange={handleChange}
//       />

//       <List p="10" pt="3" spacing={2}>
//         {_DATA.currentData().map(v => {
//           return (
//             <ListItem key={v.id} listStyleType="disc">
//               <span>{v.sku}</span>{" "}
//               <Divider display="inline" orientation="vertical" />
//               <span> {v.category_type}</span>{" "}
//               <Divider display="inline" orientation="vertical" />
//               <span>
//                 <Tag color="#0f4211">${v.msrp}</Tag>
//               </span>
//             </ListItem>
//           );
//         })}
//       </List>

//       <Pagination
//         count={count}
//         size="large"
//         page={page}
//         variant="outlined"
//         shape="rounded"
//         onChange={handleChange}
//       />
//     </Box>
//   );
// }
