import Image from 'next/image'
import { Inter } from '@next/font/google'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from "@/components/Skills"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-scroll z-0'>
      <Header/>
      <section id="hero" className='snap-start'>
        <Hero/>
      </section>


      <section id="about" className='snap-center'>
        <About/>
      </section>
      {/* Experience */}


      {/* Skills */}
      <section id="skills" className='snap-start'>
        <Skills/>

      </section>
      {/* Projects */}
      {/*Contact Me */}



    </div>
    
  )
}
