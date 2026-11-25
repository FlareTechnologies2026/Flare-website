'use client'
import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const body = document.body
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    body.classList.add('js')

    const bar = document.querySelector<HTMLElement>('.scroll-progress')

    // ---- scrollytelling ----
    // Re-query every scroll tick so it works after hydration
    function scrolly() {
      const steps = Array.from(document.querySelectorAll<HTMLElement>('.scrolly-step'))
      if (!steps.length) return

      const loopWrap = document.querySelector<HTMLElement>('.scrolly-loop')
      const numEl = document.querySelector<HTMLElement>('[data-scrolly-num]')
      const nodes = loopWrap ? Array.from(loopWrap.querySelectorAll<HTMLElement>('.loop-node')) : []

      const mid = window.innerHeight * 0.55
      let active = 0
      steps.forEach((s, i) => {
        const r = s.getBoundingClientRect()
        if (r.top < mid) active = i + 1
      })
      active = Math.max(active, 1)

      steps.forEach((s, i) => s.classList.toggle('on', i < active))
      nodes.forEach((n, i) => {
        n.classList.toggle('on', i < active)
        n.classList.toggle('current', i === active - 1)
      })

      if (loopWrap) {
        const cur = nodes[active - 1]
        const f = active >= steps.length
          ? 1
          : (cur ? +(cur.getAttribute('data-frac') ?? 0) : 0) + 0.004
        loopWrap.style.setProperty('--sp', f.toFixed(4))
      }
      if (numEl) numEl.textContent = String(active)
    }

    // ---- reveal + count-up ----
    function countUp(el: HTMLElement) {
      if (reduce) return
      const end = +(el.getAttribute('data-count') ?? 0)
      const suf = el.getAttribute('data-suffix') ?? ''
      let t0: number | null = null
      const step = (t: number) => {
        if (!t0) t0 = t
        const k = Math.min((t - t0) / 1400, 1)
        const v = Math.round(end * (1 - Math.pow(1 - k, 3)))
        el.textContent = v + suf
        if (k < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (!e.isIntersecting) return
            e.target.classList.add('in')
            ;(io as IntersectionObserver).unobserve(e.target)
            if ((e.target as HTMLElement).hasAttribute('data-count')) {
              countUp(e.target as HTMLElement)
            }
          })
        }, { rootMargin: '0px 0px -10% 0px' })
      : null

    function observeReveal() {
      document.querySelectorAll<HTMLElement>('.reveal,[data-count]').forEach(el => {
        if (el.classList.contains('in')) return
        if (io) io.observe(el)
        else el.classList.add('in')
      })
    }
    observeReveal()

    // ---- scroll handler ----
    let ticking = false
    function onScroll() {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (bar) bar.style.setProperty('--p', h > 0 ? (y / h).toFixed(4) : '0')
      body.classList.toggle('scrolled', y > 40)
      scrolly()
      ticking = false
    }

    const scrollHandler = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll) }
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })
    window.addEventListener('resize', onScroll)

    // ---- mobile menu body class ----
    const toggle = document.querySelector<HTMLElement>('.menu-toggle')
    const menuHandler = () => {
      body.classList.toggle('menu-open', toggle?.getAttribute('aria-expanded') === 'true')
    }
    toggle?.addEventListener('click', menuHandler)

    // ---- spotlight ----
    function attachSpotlight() {
      document.querySelectorAll<HTMLElement>('.spot').forEach(el => {
        // avoid double-attaching
        if (el.dataset.spotAttached) return
        el.dataset.spotAttached = '1'
        el.addEventListener('pointermove', (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          el.style.setProperty('--mx', (e.clientX - r.left) + 'px')
          el.style.setProperty('--my', (e.clientY - r.top) + 'px')
        })
      })
    }
    attachSpotlight()

    // ---- magnetic button ----
    function attachMagnetic() {
      if (reduce || !hoverable) return
      document.querySelectorAll<HTMLElement>('.magnetic').forEach(b => {
        if (b.dataset.magAttached) return
        b.dataset.magAttached = '1'
        b.addEventListener('pointermove', (e: PointerEvent) => {
          const r = b.getBoundingClientRect()
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.15}px,${(e.clientY - r.top - r.height / 2) * 0.25}px)`
        })
        b.addEventListener('pointerleave', () => { b.style.transform = '' })
      })
    }
    attachMagnetic()

    // Run once on mount to set initial state
    onScroll()

    // This component lives in the layout and mounts once, so client-side navigation
    // renders new .reveal / .spot / .magnetic elements it never saw. Pick them up.
    let rescan = 0
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(rescan)
      rescan = requestAnimationFrame(() => {
        observeReveal()
        attachSpotlight()
        attachMagnetic()
        onScroll()
      })
    })
    mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true })

    // Re-observe reveals after a short delay (catches elements rendered after hydration)
    const t = setTimeout(() => {
      observeReveal()
      attachSpotlight()
      scrolly()
    }, 300)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('resize', onScroll)
      toggle?.removeEventListener('click', menuHandler)
      clearTimeout(t)
      cancelAnimationFrame(rescan)
      mo.disconnect()
      io?.disconnect()
    }
  }, [])

  return <div className="scroll-progress" aria-hidden="true" />
}
