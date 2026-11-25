'use client'
import { useEffect, useRef } from 'react'

interface Props {
  children?: React.ReactNode
}

export default function Hero3D({ children }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let animFrameId: number
    let destroyed = false

    async function init() {
      try {
        const THREE = await import('three')

        if (destroyed || !host) return

        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
        if (!gl) return

        const renderer = new THREE.WebGLRenderer({ canvas, context: gl as WebGLRenderingContext, antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        host.appendChild(canvas)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
        camera.position.set(0, 0, 9.5)

        const curve = new THREE.CatmullRomCurve3(
          Array.from({ length: 253 }, (_, k) => {
            const t = k / 252
            const a = 2 * Math.PI * t
            const d = 1 + Math.sin(a) ** 2
            const s = 3.2
            return new THREE.Vector3(s * Math.cos(a) / d, s * 1.15 * Math.sin(a) * Math.cos(a) / d, 0.9 * Math.sin(a))
          }), true
        )
        const group = new THREE.Group()
        scene.add(group)

        const stops = ['#F4140C','#F97316','#F5B70F','#5FC85B','#14B6BF','#229FC3','#6E4CAA','#E650A0','#F4140C'].map(c => new THREE.Color(c))
        const spectrum = (u: number) => {
          const x = ((u % 1) + 1) % 1 * (stops.length - 1)
          const i = Math.floor(x)
          return stops[i].clone().lerp(stops[Math.min(i + 1, stops.length - 1)], x - i)
        }

        const tube = new THREE.TubeGeometry(curve, 600, 0.2, 28, true)
        const cols: number[] = []
        const uv = tube.attributes.uv as THREE.BufferAttribute
        for (let i = 0; i < uv.count; i++) {
          const c = spectrum(uv.getX(i))
          cols.push(c.r, c.g, c.b)
        }
        tube.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3))

        const tubeMat = new THREE.ShaderMaterial({
          vertexColors: true,
          uniforms: { uTime: { value: 0 } },
          vertexShader: `
            varying vec3 vColor; varying vec3 vN; varying vec3 vView; varying vec2 vUv;
            void main(){ vColor = color; vUv = uv;
              vec4 mv = modelViewMatrix * vec4(position,1.0);
              vN = normalize(normalMatrix * normal); vView = normalize(-mv.xyz);
              gl_Position = projectionMatrix * mv; }`,
          fragmentShader: `
            uniform float uTime; varying vec3 vColor; varying vec3 vN; varying vec3 vView; varying vec2 vUv;
            void main(){
              float rim = pow(1.0 - max(dot(vN, vView), 0.0), 2.2);
              float light = 0.55 + 0.45 * max(dot(vN, normalize(vec3(0.3,0.6,0.8))), 0.0);
              float pulse = smoothstep(0.0, 0.02, fract(vUv.x - uTime*0.08)) * (1.0 - smoothstep(0.02, 0.10, fract(vUv.x - uTime*0.08)));
              vec3 c = vColor * light + rim * 0.55 + pulse * 0.6;
              gl_FragColor = vec4(c, 1.0); }`
        })
        group.add(new THREE.Mesh(tube, tubeMat))

        const haloGeo = new THREE.TubeGeometry(curve, 300, 0.55, 12, true)
        const haloMat = new THREE.ShaderMaterial({
          transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
          vertexShader: `varying vec3 vColor; varying vec3 vN; varying vec3 vView; void main(){ vColor=color; vec4 mv=modelViewMatrix*vec4(position,1.0); vN=normalize(normalMatrix*normal); vView=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
          fragmentShader: `varying vec3 vColor; varying vec3 vN; varying vec3 vView; void main(){ float f=pow(max(dot(vN,vView),0.0),3.0); gl_FragColor=vec4(vColor*f*0.35, f*0.35); }`
        })
        const halo = new THREE.Mesh(haloGeo, haloMat)
        const u2 = haloGeo.attributes.uv as THREE.BufferAttribute
        const c2: number[] = []
        for (let i = 0; i < u2.count; i++) { const c = spectrum(u2.getX(i)); c2.push(c.r, c.g, c.b) }
        haloGeo.setAttribute('color', new THREE.Float32BufferAttribute(c2, 3))
        group.add(halo)

        const N = 220
        const pos = new Float32Array(N * 3)
        const pc = new Float32Array(N * 3)
        const seeds = Array.from({ length: N }, () => ({
          t: Math.random(), sp: 0.018 + Math.random() * 0.03,
          r: (Math.random() - 0.5) * 0.7, z: (Math.random() - 0.5) * 0.7
        }))
        const pg = new THREE.BufferGeometry()
        pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
        pg.setAttribute('color', new THREE.BufferAttribute(pc, 3))

        const dot = document.createElement('canvas')
        dot.width = dot.height = 64
        const dc = dot.getContext('2d')!
        const gr = dc.createRadialGradient(32, 32, 0, 32, 32, 32)
        gr.addColorStop(0, 'rgba(255,255,255,1)')
        gr.addColorStop(0.25, 'rgba(255,255,255,.7)')
        gr.addColorStop(1, 'rgba(255,255,255,0)')
        dc.fillStyle = gr; dc.fillRect(0, 0, 64, 64)

        const pts = new THREE.Points(pg, new THREE.PointsMaterial({
          size: 0.16, map: new THREE.CanvasTexture(dot), vertexColors: true,
          transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
        }))
        group.add(pts)
        group.scale.setScalar(0.75)

        const dust = new THREE.BufferGeometry()
        const dp = new Float32Array(500 * 3)
        for (let i = 0; i < 500; i++) {
          dp[i*3] = (Math.random()-0.5)*30; dp[i*3+1] = (Math.random()-0.5)*18; dp[i*3+2] = -6 - Math.random()*10
        }
        dust.setAttribute('position', new THREE.BufferAttribute(dp, 3))
        scene.add(new THREE.Points(dust, new THREE.PointsMaterial({ size: 0.035, color: 0x8A95A3, transparent: true, opacity: 0.55 })))

        let w = 0, h = 0
        function resize() {
          if (!host) return
          w = host.clientWidth; h = host.clientHeight
          renderer.setSize(w, h, false)
          camera.aspect = w / h
          const wide = w / h >= 1.15
          camera.position.z = wide ? 10.5 : 14
          ;(group.userData as Record<string, number>).baseX = 0
          ;(group.userData as Record<string, number>).baseY = 0
          camera.updateProjectionMatrix()
        }
        const ro = new ResizeObserver(resize)
        ro.observe(host)
        resize()

        const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
        const onPointer = (e: PointerEvent) => {
          mouse.tx = e.clientX / window.innerWidth - 0.5
          mouse.ty = e.clientY / window.innerHeight - 0.5
        }
        window.addEventListener('pointermove', onPointer, { passive: true })

        let visible = true
        const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting })
        io.observe(host)

        const tmp = new THREE.Vector3()
        const clock = new THREE.Clock()
        let scrollY = 0
        const onScroll = () => { scrollY = window.scrollY }
        window.addEventListener('scroll', onScroll, { passive: true })

        function frame() {
          if (destroyed) return
          animFrameId = requestAnimationFrame(frame)
          if (!visible || document.hidden) return
          const t = clock.getElapsedTime()
          tubeMat.uniforms.uTime.value = t
          mouse.x += (mouse.tx - mouse.x) * 0.05
          mouse.y += (mouse.ty - mouse.y) * 0.05
          group.rotation.y = Math.sin(t * 0.25) * 0.35 + mouse.x * 0.6
          group.rotation.x = -0.15 + mouse.y * 0.4 + Math.min(scrollY / 900, 0.6)
          group.position.x = (group.userData as Record<string, number>).baseX || 0
          group.position.y = ((group.userData as Record<string, number>).baseY || 0) - scrollY / 450

          for (let i = 0; i < N; i++) {
            const s = seeds[i]
            s.t = (s.t + s.sp * 0.016) % 1
            curve.getPoint(s.t, tmp)
            pos[i*3] = tmp.x + s.r*0.35; pos[i*3+1] = tmp.y + s.r*0.35; pos[i*3+2] = tmp.z + s.z*0.35
            const c = spectrum(s.t).lerp(new THREE.Color(1,1,1), 0.35)
            pc[i*3] = c.r; pc[i*3+1] = c.g; pc[i*3+2] = c.b
          }
          pg.attributes.position.needsUpdate = true
          pg.attributes.color.needsUpdate = true
          renderer.render(scene, camera)
        }
        frame()
        host.classList.add('is-3d')

        return () => {
          destroyed = true
          cancelAnimationFrame(animFrameId)
          ro.disconnect()
          io.disconnect()
          window.removeEventListener('pointermove', onPointer)
          window.removeEventListener('scroll', onScroll)
          renderer.dispose()
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
        }
      } catch {
        // keep SVG fallback
      }
    }

    const cleanup = init()
    return () => {
      destroyed = true
      cleanup.then(fn => fn && fn())
    }
  }, [])

  return (
    <div className="hero-stage" data-hero3d ref={hostRef} aria-hidden="true">
      <div className="hero-fallback">
        {children}
      </div>
    </div>
  )
}
