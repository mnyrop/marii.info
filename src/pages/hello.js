import Layout from '../components/Layout'
import Link from "next/link"

const skills = ["Ruby", "Python", "Bash", "JavaScript", "SQL", "Pandas", "Tesseract OCR", "OpenRefine", "D3.js", "LeafletJS", "AWS S3", "AWS EC2", "AWS Lambda", "Docker", "Vagrant", "Certbot", "RSpec", "Selenium", "GitHub Actions", "Lighthouse A11y", "Tailwind", "Bootstrap", "Svelte", "Eleventy", "Jekyll"]


export default function Hello() {
  return (
    <Layout>
      <div className="flex flex-wrap lg:flex-nowrap gap-12">
      <div className="lg:basis-1/2 basis-full">
          <h2 className="border-b-2 border-text">Services</h2>
          <div className="py-4 leading-relaxed tracking-wide lg:text-lg">
            <ul className="list-none">
              <li className="inline"><span className="text-sm opacity-70"> (1)</span> web ui/ui development</li>
              <li className="inline"><span className="text-sm opacity-70"> (2)</span> software architecture and sustainability consulting</li>
              <li className="inline"><span className="text-sm opacity-70"> (3)</span> digital humanties project management</li>
              <li className="inline"><span className="text-sm opacity-70"> (4)</span> legacy application and site migration</li>
              <li className="inline"><span className="text-sm opacity-70"> (5)</span> workshop, sprint, and course facilitation</li>
            </ul>
          </div>
          <h2 className="border-b-2 border-text">Tools / Skills</h2>
          <div className="py-4 leading-relaxed tracking-wide ">
            <ul className="list-none">
              {skills.map((skill, index) => 
                <li key={index} className="inline">
                  {index > 0 && <span> • </span>} <span className="opacity-70">{skill}</span>
                </li> 
              )}
            </ul>
          </div>
        </div>
        <div className="lg:basis-1/2 basis-full">
          <h2 className="border-b-2 border-text">Contact</h2>
          <div className="py-4 leading-relaxed">
            <p>m.s.nyrop [at] gmail [dot] com</p>
            <p>cv on request</p>
            <p className="py-2 text-sm">
              <Link target="_blank" href="https://github.com/mnyrop" className="opacity-70 border-b-2 border-text hover:border-none">github</Link> <span> • </span> 
              <Link target="_blank" href="https://www.linkedin.com/in/m-nyrop/" className="opacity-70 border-b-2 border-text hover:border-none">linkedin</Link> <span> • </span> 
              <Link target="_blank" href="https://code4lib.social/@marii" className="opacity-70 border-b-2 border-text hover:border-none">mastodon</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}