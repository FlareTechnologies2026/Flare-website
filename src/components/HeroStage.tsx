'use client'
import dynamic from 'next/dynamic'
import LoopSvg from './LoopSvg'
import { SYSTEM_STEPS } from '@/lib/content'

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false })

const labels = SYSTEM_STEPS.map(([t]) => t)

export default function HeroStage() {
  return (
    <Hero3D>
      <LoopSvg labels={labels} id="home" />
    </Hero3D>
  )
}
