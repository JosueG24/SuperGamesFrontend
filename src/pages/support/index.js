import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function support() {
  return (
    <Layout route="public">
      <section>
        support
        <Link href={"/"}>return</Link>
      </section>
    </Layout>
  )
}
