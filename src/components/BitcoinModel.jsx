import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const MODEL_UID = 'a06d9dcc2b5341d9aa41c97cb5fb53bb'
const SPIN_SPEED = 0.2 // radians per second
const ZOOM = 0.22 // <1 = camera moves closer to the model = coin looks bigger.
                   // Lower this further (e.g. 0.15) for an even bigger coin.

export default function BitcoinModel() {
  const iframeRef = useRef(null)
  const apiRef = useRef(null)
  const tweenRef = useRef(null)
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
        ui_hint: 0, // suppresses Sketchfab's "click & drag to rotate" hint icon
        scrollwheel: 0,
        success: (api) => {
          if (cancelled) return
          apiRef.current = api
          api.start()
          api.addEventListener('viewerready', () => {
            if (cancelled) return
            console.info('[BitcoinModel] Ready — spinning continuously.')
            setStatus('ready')
            startSpin(api)
          })
        },
        error: () => {
          console.warn('[BitcoinModel] Sketchfab init failed.')
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
        script.onerror = () => setStatus('error')
        document.body.appendChild(script)
      }
      script.addEventListener('load', boot)
    }

    function startSpin(api) {
      api.getCameraLookAt((err, camera) => {
        if (err || !camera || cancelled) return
        const { position, target } = camera

        // Move the camera closer to the model (zoom in) before spinning.
        const zx = target[0] + (position[0] - target[0]) * ZOOM
        const zy = target[1] + (position[1] - target[1]) * ZOOM
        const zz = target[2] + (position[2] - target[2]) * ZOOM
        api.setCameraLookAt([zx, zy, zz], target, 0)

        const dx = zx - target[0]
        const dz = zz - target[2]

        tweenRef.current = gsap.to(
          { angle: 0 },
          {
            angle: Math.PI * 2,
            duration: (Math.PI * 2) / SPIN_SPEED,
            repeat: -1,
            ease: 'none',
            onUpdate: function () {
              const angle = this.targets()[0].angle
              const cos = Math.cos(angle)
              const sin = Math.sin(angle)
              const newX = dx * cos - dz * sin
              const newZ = dx * sin + dz * cos
              api.setCameraLookAt(
                [target[0] + newX, zy, target[2] + newZ],
                target,
                0
              )
            },
          }
        )
      })
    }

    return () => {
      cancelled = true
      tweenRef.current?.kill()
    }
  }, [])

  return (
    <div className="bitcoin-model-wrap" aria-hidden="true">
      <iframe
        ref={iframeRef}
        title="Bitcoin 3D model"
        className="bitcoin-model-iframe"
        allow="autoplay; fullscreen; xr-spatial-tracking"
      />
      {/*  */}
      <div className="bitcoin-model-hint-mask" />
      {status === 'error' && <div className="bitcoin-model-fallback" />}
    </div>
  )
}
