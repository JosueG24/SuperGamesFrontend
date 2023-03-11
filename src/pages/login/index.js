import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Login() {
  return(
    <Layout>
      <section className="w-screen h-screen flexAllCenter txtMd">
        <div className="w-2/3 h-5/6 flexAllCenter flex-col">
          <div className="w-full h-1/7 flexAllCenter">
            <h1 className="txtXl2 txtSecondary">Bienvenido a super Kimis</h1>
          </div>
          <div className="bg-c_GrayBlue w-5/6 h-5/7 rounded-md">

          </div>
          <div className="w-full h-2/7 flexAllCenter flex-col justify-around">
            <button className="bg-c_LightGrayBlue w-1/6 h-1/3">Invitado</button>
            <div className="flexAllCenter flex-col">
              <p className="">No tienes una cuenta?</p>
              <p className="text-c_Pink">Sing Up</p>
            </div>
          </div>
        </div>
        <button className="bg-c_GrayBlue fixed rounded-full w-10 h-10 bottom-5 left-5"><Link href={"/support"}>?</Link></button>
      </section>
    </Layout>
  )
  return (
    <Layout>
      <secction>
          <div>this is login</div>
          <div>
            <Link href={"/"}>go to Home</Link>
            <Link href={"/support"}>go to ?</Link>
          </div>
      </secction>
    </Layout>
  )
}
