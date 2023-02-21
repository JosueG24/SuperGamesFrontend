import Link from "next/link"

export default function Login() {
  return (
    <secction>
        <div>this is login</div>
        <div>
          <Link href={"/"}>go to Home</Link>
          <Link href={"/support"}>go to ?</Link>
        </div>
    </secction>
  )
}
