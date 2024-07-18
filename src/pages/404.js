import Layout from '../components/Layout'
import Link from "next/link"

export default function FourOhFour() {
  return (
    <Layout>
      <div className="text-2xl lg:text-3xl">404: Oops! Page not found!</div>
      <div className="py-4"><Link className="border-b-2 bordr-text hover:border-none" href="/">Want to return home?</Link></div>
    </Layout>
  );
}