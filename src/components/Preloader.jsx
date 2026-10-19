import { useEffect, useState } from 'react'

/**
 * Preloader — cinematic black-and-white entry animation.
 * No colors, no AI-generated templates. Pure CSS + SVG drawn from scratch.
 *
 * Stages:
 *  1. Boot terminal screen
 *  2. Logo mark draws itself (square + glyph)
 *  3. Progress bar fills with percentage
 *  4. Scanline "boot" screen reveals the wordmark
 *  5. Fade out and hand off to the app
 */
export default function Preloader({ onFinish }) {
  const [stage, setStage] = useState('boot') // 'boot' | 'logo' | 'progress' | 'reveal' | 'done'
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStage('logo'), 500)

    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 10
      if (p >= 100) {
        p = 100
        clearInterval(iv)
        setTimeout(() => setStage('reveal'), 500)
      }
      setProgress(p)
    }, 50)

    const t2 = setTimeout(() => {
      setStage('done')
      if (onFinish) onFinish()
    }, 2800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearInterval(iv)
    }
  }, [onFinish])

  const isDone = stage === 'done'

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center transition-all duration-1000 ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Scanline overlay for the "boot" feel */}
      <div className="absolute inset-0 scanline bg-[size:100%_4px] pointer-events-none" />

      {/* Stage 1 + 2: boot terminal + progress */}
      <div
        className={`relative w-full max-w-md px-6 z-10 ${
          stage === 'boot' || stage === 'logo' || stage === 'progress'
            ? 'opacity-100'
            : 'opacity-0 transition-opacity duration-500'
        }`}
      >
        <div className="border border-white/20 bg-black p-6 rounded-sm shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border border-white flex items-center justify-center rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 48"
                width="20"
                height="20"
                fill="none"
                stroke="white"
                strokeWidth="3"
              >
                <rect x="2" y="6" width="36" height="36" />
                <g strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13.8 16.7 22 24 13.8 31.3" />
                  <path d="M23 31.3h7.5" />
                </g>
              </svg>
            </div>
            <span className="font-mono text-xs text-white tracking-widest uppercase">
              Open<span className="font-bold">Agents</span>
            </span>
          </div>

          {(stage === 'progress' || stage === 'reveal' || stage === 'logo') && (
            <>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-white rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/60 tracking-widest uppercase mb-2">
                <span>booting sequence</span>
                <span>{progress}%</span>
              </div>
            </>
          )}

          <div className="font-mono text-[11px] text-white/40 tracking-widest uppercase">
            {stage === 'boot'
              ? 'initializing kernel…'
              : stage === 'logo'
                ? 'loading wordmark…'
                : 'launching interface…'}
          </div>
        </div>
      </div>

      {/* Stage 3: full-screen B&W reveal */}
      <div
        className={`fixed inset-0 z-[9998] bg-black flex items-center justify-center transition-all duration-1000 ${
          stage === 'reveal' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-0.5 bg-white blur opacity-20 animate-pulse rounded-sm" />
            <div className="relative w-24 h-24 border border-white flex items-center justify-center rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 48"
                width="40"
                height="40"
                fill="none"
                stroke="white"
                strokeWidth="3"
              >
                <rect x="2" y="6" width="36" height="36" />
                <g strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13.8 16.7 22 24 13.8 31.3" />
                  <path d="M23 31.3h7.5" />
                </g>
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white sm:text-6xl">
            OpenAgents
          </h1>
          <p className="mt-3 text-xs font-mono text-white/50 tracking-[0.3em] uppercase">
            build · deploy · scale ai agent workflows
          </p>
        </div>
      </div>
    </div>
  )
}