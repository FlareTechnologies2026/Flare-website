'use client'
import { useEffect } from 'react'

export default function HomeClient() {
  useEffect(() => {
    document.body.classList.add('page-home')
    return () => document.body.classList.remove('page-home')
  }, [])

  return null
}
