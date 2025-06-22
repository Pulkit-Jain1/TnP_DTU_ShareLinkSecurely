import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>TnP DTU</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/dtu-logo.png' />
                <meta
                    name='description'
                    content='TnP DTU'
                />
            </Head>
            <ToastContainer
            theme="dark"
            toastClassName="border border-white-800"
            />
            <Component {...pageProps} />
        </>
    );
}