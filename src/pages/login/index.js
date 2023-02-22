import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Login() {
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
