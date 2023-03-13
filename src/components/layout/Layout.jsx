import Head from "next/head"
import PrivateRoute from "./PrivateRoutes"

export default function Layout({children, route = "public"}) {
  return (
    <PrivateRoute route={route}>
    <div>
        <Head>
            <title>Super Games</title>
            <meta charSet='utf-8'/>
            <meta name="description" content="Super Juegos Buenisimos"/>
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Averia+Libre:ital,wght@1,300&family=Bungee&display=swap" rel="stylesheet"/>
        </Head>

        <div className="bg-c_DarckBlue text-white txtPrincipal">{children}</div>

    </div>
    </PrivateRoute>
  )
}
