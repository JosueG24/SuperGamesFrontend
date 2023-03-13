import Layout from '@/components/layout/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout route='private'>
      <section className='flex justify-center items-center h-screen flex-col'>  
        <div className='bg-yellow-300 p-10 rounded-3xl'>
          <h1 className="text-3xl font-bold underline">Home</h1>
        </div>
        <div className=' m-5 bg-blue-600 p-2 rounded-lg text-white'>
          <Link href={"/login"}>go to login</Link>
        </div>

        <div className=' m-5 bg-blue-400 p-2 rounded-lg text-white'>
          <Link href={"/games/memory"}>go to memory</Link>
        </div>
        <div className=' m-5 bg-blue-400 p-2 rounded-lg text-white'>
          <Link href={"/games/snake"}>go to snake</Link>
        </div>
        <div className=' m-5 bg-blue-400 p-2 rounded-lg text-white'>
          <Link href={"/games/mines"}>go to mines</Link>
        </div>
      </section>
    </Layout>
  )
}
