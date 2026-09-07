import { useEffect, useRef, useState } from 'react'

// UID taken from the sketchfab.com/3d-models/bitcoin-<uid> 
const MODEL_UID = 'a06d9dcc2b5341d9aa41c97cb5fb53bb'
const SPIN_SPEED = 0.2 // radians per second — slow, deliberate spin

export default function BitcoinModel() {
  const iframeRef = useRef(null)
  const apiRef = useRef(null)
  const activeRef = useRef(false) 
  const rafRef = useRef(null)
  const [status, setStatus] = useState('loading') 

  useEffect(() => {
    let cancelled = false

    function boot() {
      const iframe = iframeRef.current
      if (!iframe || !window.Sketchfab || cancelled) return

      const client = new window.Sketchfab(iframe)
      client.init(MODEL_UID, {
        autostart: 1,
        preload: 1,
        transparent: 1,
        ui_theme: 'dark',
        ui_controls: 0,
        ui_infos: 0,
        ui_watermark: 0,
        ui_stop: 0,
        ui_inspector: 0,
        ui_settings: 0,
        ui_vr: 0,
        ui_fullscreen: 0,
        ui_annotations: 0,
        ui_help: 0,
        ui_hint: 0,
        scrollwheel: 0,
        success: (api) => {
          if (cancelled) return
          apiRef.current = api
          api.start()
          api.addEventListener('viewerready', () => {
            if (cancelled) return
            console.info('[BitcoinModel] Sketchfab viewer ready — hover to spin.')
            setStatus('ready')
            startLoop()
          })
        },
        error: () => {
          console.warn(
            '[BitcoinModel] Sketchfab failed to init this model. Common causes: the ' +
              'model UID is wrong, or the owner has disabled embedding for this model.'
          )
          setStatus('error')
        },
      })
    }

    if (window.Sketchfab) {
      boot()
    } else {
      let script = document.getElementById('sketchfab-viewer-api')
      if (!script) {
        script = document.createElement('script')
        script.id = 'sketchfab-viewer-api'
        script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'
        script.onerror = () => {
          console.warn('[BitcoinModel] Could not load the Sketchfab viewer script.')
          setStatus('error')
        }
        document.body.appendChild(script)
      }
      script.addEventListener('load', boot)
    }

    let last = performance.now()
    function startLoop() {
      const tick = (now) => {
        const dt = (now - last) / 1000
        last = now
        const api = apiRef.current
        if (api && activeRef.current) {
          api.getCameraLookAt((err, camera) => {
            if (err || !camera) return
            const { position, target } = camera
            const dx = position[0] - target[0]
            const dz = position[2] - target[2]
            const angle = SPIN_SPEED * dt
            const cos = Math.cos(angle)
            const sin = Math.sin(angle)
            const newX = dx * cos - dz * sin
            const newZ = dx * sin + dz * cos
            api.setCameraLookAt(
              [target[0] + newX, position[1], target[2] + newZ],
              target,
              0
            )
          })
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const activate = () => {
    activeRef.current = true
  }
  const deactivate = () => {
    activeRef.current = false
  }

  return (
    <div
      className="bitcoin-model-wrap"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      aria-hidden="true"
    >
      <iframe
        ref={iframeRef}
        title="Bitcoin 3D model"
        className="bitcoin-model-iframe"
        allow="autoplay; fullscreen; xr-spatial-tracking"
      />
      {status === 'error' && <div className="bitcoin-model-fallback" />}
    </div>
  )
}
