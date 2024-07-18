import Image from "next/image"
import Link from "next/link"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import Layout from '../components/Layout'
import projects from "./api/projects"

const defaultProjectSlug      = 'wax'
let hoverProjectSlug          = ''


function fetchProject(param) {
  if  (param == 'random'){
    let keys  = Object.keys(projects)
    let idx   = Math.floor(Math.random() * keys.length)
    let key   = keys[idx]
    return projects[key]
  }
  else {
    return Object.keys(projects).includes(param) ? projects[param] : projects[defaultProjectSlug]
  }
}

function fetchProjectImage(project){
  if (project == null) {
    return(<div className="w-full h-60 md:h-80 bg-gradient-to-r from-accent to-[#BF9D5F]"></div>)
  }
  else {
    let imgUrl = project.img || 'https://marii.info/images/smoke_and_mirrors.gif'
    return(<Link href={project.url} target="_blank"><img className="object-cover object-center w-full h-40 md:h-60 lg:h-80" src={imgUrl}/></Link>)
  }
}

export default function Home() {
  const param = useSearchParams().get('project')
  const activeProject = fetchProject(param)

  const projectTextLinks = Object.entries(projects).map(([key, project], idx) => {
    if (key == activeProject.slug) {
      return(<li className="inline" key={idx}><span className="text-sm opacity-70">({idx+1})</span> {project.article } <Link href={`/?project=${key}`} active="true" className="link  text-[#BF9D5F] border-[#BF9D5F]">{project.text}</Link></li>)
    }
    else {
      return(<li className="inline" key={idx}><span className="text-sm opacity-70">({idx+1})</span> {project.article} <Link href={`/?project=${key}`} active="false" className="link border-b-2 hover:text-accent hover:border-accent transition delay-100 duration-150 ease-in-out">{project.text}</Link></li>)
    }
  })

  return (
    <Layout>
      <div id="portfolio" className="flex flex-wrap-reverse lg:flex-nowrap gap-12">
        <div className="lg:basis-1/2 basis-full">
          <div className="leading-relaxed max-w-96">
            e.g., <Link href={`/?project=random`}><div title="random project" className="inline-block pl-1" id="spinarooni">🎲</div></Link>
          </div>
          <div className="py-4 leading-relaxed tracking-wide lg:text-lg">
            <ul id="projTextList" className="list-none">
              {projectTextLinks}
            </ul>
          </div>
        </div>
        <div className="lg:basis-1/2 basis-full text-sm lg:text-sm">
          <div>
            {fetchProjectImage(activeProject)}
            
            {activeProject != null &&
              <div className="py-6 md:pt-6">
                <h2 className="lg:text-lg leading-snug pb-2"><Link href={activeProject.url} className="text-[#BF9D5F] border-[#BF9D5F] border-b-2 hover:border-none" target="_blank">{activeProject.slug}</Link>: <span className="opacity-90">{activeProject.article} {activeProject.text}</span></h2>
                <div className="opacity-70">
                  {activeProject.role && <p className="py-1">Role: {activeProject.role}</p>}
                  {activeProject.keywords && <p className="py-1">Keywords: {activeProject.keywords.join(', ')}</p>}
                  {activeProject.links && <p className="py-1">Additional Links: </p>}
                  {/* {activeProject.summary && <p className="py-2">{activeProject.summary}</p>} */}
                  {activeProject.imageSource && <p className="py-1 text-xs opacity-70">Image Source: {activeProject.imageSource}</p>}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}
