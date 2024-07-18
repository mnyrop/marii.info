import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

/* Menu Component here */
function Header() {
  const { route } = useRouter()
  
  return(
    <header>
      <nav className="w-full flex justify-between">
        {/* <h1>Marii Nyrop</h1> */}
        <h1><Link href="/" className="link border-b-2 border-text hover:border-0">Marii Nyrop</Link></h1>
        <div>
          {/* {route == '/hello' && <Link href="/" className="link border-b-2 border-text hover:border-0">Home</Link>} */}
          <Link href="/hello" className="ml-6 border-b-2 border-text hover:border-0">Services & Contact</Link>
        </div>
      </nav>
      <div className="w-full">
        <div className="flex justify-between flex-wrap">
          <div className="py-8 leading-relaxed max-w-96 md:text-lg">
            I build maintainable systems & write teachable software for cultural heritage research
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Layout({ children }) {
  return (
    <div className="w-screen">
      <div className="md:p-12 p-4">
        <Header/>
        { children }
      </div>
    </div>
  )
}