import Header from '@/components/header/header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Arvo } from 'next/font/google'

const arvo = Arvo({
    weight: '400',
    subsets: ['latin']}
    )

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={arvo.className} >
        <Header />
        <Component {...pageProps} />
    </main>
    )
}
