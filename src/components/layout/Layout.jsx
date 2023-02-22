import Head from "next/head"
import Footer from "./Footer"

export default function Layout({children, title = "no-hay-titulo"}) {
  return (
    <div>
        <Head>
            <title>Super Games</title>
            <meta charSet='utf-8'/>
            <meta name="description" content="Super Juegos Buenisimos"/>
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Averia+Libre:ital,wght@1,300&family=Bungee+Spice&display=swap" rel="stylesheet"/>
        </Head>

        <div>{children}</div>
        <Footer title={title}/>

    </div>
  )
}
