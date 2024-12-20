import { HeroHighlightDemo } from '@/components/HeroHighlightDemo'
import { FloatingNavDemo } from '@/components/Navbar'
import { FloatingNav } from '@/components/ui/floating-navbar'

const LandingPage = () => {
  return (
    <div className='h-screen w-screen '>
            <FloatingNavDemo/>
            <HeroHighlightDemo/>
    </div>
  )
}

export default LandingPage
