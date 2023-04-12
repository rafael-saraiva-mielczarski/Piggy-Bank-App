import Header from '@/components/header/header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Arvo } from 'next/font/google'
import { useRouter } from 'next/router'

const arvo = Arvo({
    weight: '400',
    subsets: ['latin']}
    )

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const showHeader = router.pathname === "/tryNow" ? false : true;

    return (
        <main className={arvo.className} >
            {showHeader && <Header />}
            <Component {...pageProps} />
        </main>
    )
}
