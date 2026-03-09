import { useState, useRef, useCallback, useEffect } from 'react'

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Poppins:wght@300;400;500&family=Noto+Nastaliq+Urdu&display=swap');

    :root {
      --maroon:       #6A1E2D;
      --maroon-deep:  #3D0D18;
      --maroon-mid:   #8B2535;
      --gold:         #C6A75E;
      --gold-light:   #E8CC8A;
      --gold-dark:    #8A6914;
      --cream:        #F8F3E7;
      --cream-dark:   #EDE4CC;
      --blush:        #E8CFC1;
      --blush-dark:   #D4A899;
      --white:        #FFFFFF;
      --text-dark:    #1A0A0A;
      --font-heading: 'Playfair Display', Georgia, serif;
      --font-body:    'Poppins', sans-serif;
      --font-urdu:    'Noto Nastaliq Urdu', serif;
      --max-w: 480px;
      --shadow-gold: 0 4px 30px rgba(198,167,94,0.3);
      --shadow-deep: 0 20px 60px rgba(61,13,24,0.5);
      --radius: 16px;
      --radius-sm: 8px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    html { font-size: 16px; scroll-behavior: smooth; overflow-x: hidden; }
    body { font-family: var(--font-body); background: var(--maroon-deep); color: var(--cream); overflow-x: hidden; min-height: 100vh; -webkit-font-smoothing: antialiased; }
    #root { width: 100%; min-height: 100vh; max-width: var(--max-w); margin: 0 auto; background: var(--cream); position: relative; box-shadow: 0 0 80px rgba(0,0,0,0.8); overflow: hidden; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--maroon-deep); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }

    /* Gold divider */
    .gold-divider { width: 100%; max-width: 260px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin: 16px auto; position: relative; }
    .gold-divider::before { content: '✦'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--gold); font-size: 0.8rem; background: inherit; padding: 0 8px; }
    .section-label { font-family: var(--font-body); font-size: 0.6rem; letter-spacing: 6px; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
    .urdu { font-family: var(--font-urdu); direction: rtl; line-height: 2; }
    .glass-card { background: rgba(248,243,231,0.12); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(198,167,94,0.3); border-radius: var(--radius); padding: 28px 24px; box-shadow: var(--shadow-gold), inset 0 1px 0 rgba(255,255,255,0.1); }
    .gold-border-box { border: 1px solid rgba(198,167,94,0.4); border-radius: var(--radius-sm); position: relative; }
    .gold-border-box::before, .gold-border-box::after { content: ''; position: absolute; width: 20px; height: 20px; border-color: var(--gold); border-style: solid; }
    .gold-border-box::before { top: -2px; left: -2px; border-width: 2px 0 0 2px; }
    .gold-border-box::after  { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; }
    .particles-wrap { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1; }
    .particle { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: var(--gold-light); opacity: 0; animation: particleFloat linear infinite; }
    #confetti-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; }

    /* Animations */
    @keyframes shimmer { 0% { background-position: -400% 0; } 100% { background-position: 400% 0; } }
    .shimmer-text { background: linear-gradient(90deg, var(--gold-dark) 0%, var(--gold-light) 30%, var(--gold) 50%, var(--gold-light) 70%, var(--gold-dark) 100%); background-size: 400% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s linear infinite; }
    @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px rgba(198,167,94,0.4), 0 0 40px rgba(198,167,94,0.2); } 50% { box-shadow: 0 0 40px rgba(198,167,94,0.8), 0 0 80px rgba(198,167,94,0.4); } }
    .glow-pulse { animation: glowPulse 2.5s ease-in-out infinite; }
    @keyframes waPulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,211,102,0.6); } 70% { transform: scale(1.05); box-shadow: 0 0 0 16px rgba(37,211,102,0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,211,102,0); } }
    .wa-pulse { animation: waPulse 2s ease-out infinite; }
    @keyframes floatUp { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
    @keyframes silhouetteSway { 0%, 100% { transform: translateY(0) rotate(-0.5deg); } 50% { transform: translateY(-6px) rotate(0.5deg); } }
    .silhouette-anim { animation: silhouetteSway 5s ease-in-out infinite; }
    @keyframes pinRipple { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }
    @keyframes fringeSwing { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
    @keyframes chevronBounce { 0%, 100% { transform: rotate(45deg) translateY(0); opacity: 1; } 50% { transform: rotate(45deg) translateY(5px); opacity: 0.4; } }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes particleFloat { 0% { transform: translateY(100%) rotate(0deg); opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.3; } 100% { transform: translateY(-20px) rotate(360deg); opacity: 0; } }
    @keyframes petalFall { 0% { transform: translateY(-20px) rotate(0deg) translateX(0); opacity: 1; } 100% { transform: translateY(100vh) rotate(540deg) translateX(40px); opacity: 0; } }
    .petal { position: fixed; pointer-events: none; z-index: 9998; animation: petalFall linear forwards; }
  `}</style>
)


/* ─────────────────────────────────────────────
   CONFETTI
───────────────────────────────────────────── */
function launchConfetti() {
  const canvas = document.createElement('canvas')
  canvas.id = 'confetti-canvas'
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth; canvas.height = window.innerHeight
  const colors = ['#C6A75E','#E8CC8A','#6A1E2D','#F8F3E7','#E8CFC1','#fff']
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width, y: -20,
    w: 6 + Math.random() * 8, h: 3 + Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 8,
    vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4, opacity: 1,
  }))
  let frame
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.rot += p.rotV
      if (p.y < canvas.height + 20) {
        alive = true
        ctx.save(); ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height)
        ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180)
        ctx.fillStyle = p.color; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h)
        ctx.restore()
      }
    })
    if (alive) frame = requestAnimationFrame(draw)
    else { cancelAnimationFrame(frame); canvas.remove() }
  }
  frame = requestAnimationFrame(draw)
}

/* ─────────────────────────────────────────────
   PETAL SPAWN
───────────────────────────────────────────── */
function spawnPetal() {
  const petal = document.createElement('div')
  petal.className = 'petal'
  const emojis = ['🌸','🌺','🌹','✿','❀','🌼']
  petal.textContent = emojis[Math.floor(Math.random() * emojis.length)]
  petal.style.left = Math.random() * 100 + 'vw'
  petal.style.top = '-2rem'
  petal.style.fontSize = 0.7 + Math.random() * 0.9 + 'rem'
  petal.style.animationDuration = 4 + Math.random() * 5 + 's'
  petal.style.animationDelay = Math.random() * 2 + 's'
  document.body.appendChild(petal)
  petal.addEventListener('animationend', () => petal.remove())
}

/* ─────────────────────────────────────────────
   WHATSAPP BUTTON
───────────────────────────────────────────── */
function WhatsappButton() {
  return (
    <a href="https://wa.me/923225912989" target="_blank" rel="noreferrer"
      className="wa-pulse"
      aria-label="Contact on WhatsApp"
      style={{
        position:'fixed', bottom:28, right:20, zIndex:8000,
        display:'flex', alignItems:'center', gap:8,
        background:'linear-gradient(135deg, #25D366, #128C7E)',
        color:'#fff', textDecoration:'none',
        padding:'12px 18px 12px 12px', borderRadius:50,
        boxShadow:'0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.2)',
        fontFamily:'var(--font-body)', fontSize:'0.62rem',
        letterSpacing:2, textTransform:'uppercase',
        transition:'transform 0.2s ease, box-shadow 0.2s ease',
      }}>
      <svg style={{width:28,height:28,flexShrink:0}} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.651 4.824 1.788 6.846L2 30l7.352-1.768A13.934 13.934 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.555 11.555 0 01-5.892-1.607l-.422-.252-4.363 1.051 1.072-4.25-.276-.437A11.558 11.558 0 014.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.34-8.642c-.347-.174-2.055-1.013-2.374-1.129-.319-.116-.551-.174-.783.174-.232.347-.9 1.129-1.103 1.361-.203.232-.406.261-.753.087-.347-.174-1.464-.54-2.788-1.72-1.03-.918-1.726-2.052-1.928-2.399-.203-.347-.022-.534.152-.707.156-.155.347-.406.521-.609.174-.203.232-.347.347-.579.116-.232.058-.435-.029-.609-.087-.174-.783-1.887-1.073-2.584-.283-.678-.57-.586-.783-.596l-.667-.011c-.232 0-.609.087-.928.435-.319.347-1.218 1.19-1.218 2.902s1.247 3.365 1.42 3.597c.174.232 2.452 3.742 5.942 5.248.831.358 1.479.572 1.984.732.833.265 1.592.228 2.191.138.668-.1 2.055-.84 2.345-1.651.29-.812.29-1.508.203-1.651-.087-.144-.319-.232-.667-.406z" fill="#fff"/>
      </svg>
      <span style={{whiteSpace:'nowrap'}}>WhatsApp Us</span>
    </a>
  )
}

/* ─────────────────────────────────────────────
   CURTAIN ANIMATION
───────────────────────────────────────────── */
function CurtainAnimation({ onOpen, isOpen }) {
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)
  const pinRef     = useRef(null)
  const overlayRef = useRef(null)
  const ctaRef     = useRef(null)

  useEffect(() => {
    if (pinRef.current) {
      pinRef.current.style.transform = 'scale(0)'; pinRef.current.style.opacity = '0'
      pinRef.current.style.transition = 'all 0.8s cubic-bezier(0.175,0.885,0.32,1.275)'
      setTimeout(() => { if (pinRef.current) { pinRef.current.style.transform = 'scale(1)'; pinRef.current.style.opacity = '1' }}, 500)
    }
    if (ctaRef.current) {
      ctaRef.current.style.opacity = '0'; ctaRef.current.style.transform = 'translateY(10px)'
      ctaRef.current.style.transition = 'all 0.6s ease'
      setTimeout(() => { if (ctaRef.current) { ctaRef.current.style.opacity = '1'; ctaRef.current.style.transform = 'translateY(0)' }}, 1200)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const dur = 1.6
    ;[pinRef, ctaRef].forEach(r => { if (r.current) { r.current.style.transition = 'all 0.3s ease'; r.current.style.opacity = '0'; r.current.style.transform = 'scale(0)' }})
    setTimeout(() => {
      if (leftRef.current) {
        leftRef.current.style.transition = `transform ${dur}s cubic-bezier(0.25,0.46,0.45,0.94)`
        leftRef.current.style.transform = 'translateX(-92%) skewY(3deg)'
      }
      if (rightRef.current) {
        rightRef.current.style.transition = `transform ${dur}s cubic-bezier(0.25,0.46,0.45,0.94)`
        rightRef.current.style.transform = 'translateX(92%) skewY(-3deg)'
      }
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'opacity 0.8s ease'
        setTimeout(() => { if (overlayRef.current) overlayRef.current.style.opacity = '0' }, 600)
      }
      setTimeout(() => {
        if (leftRef.current)  { leftRef.current.style.transition  = 'opacity 0.4s'; leftRef.current.style.opacity  = '0' }
        if (rightRef.current) { rightRef.current.style.transition = 'opacity 0.4s'; rightRef.current.style.opacity = '0' }
      }, 1400)
    }, 100)
  }, [isOpen])

  return (
    <div style={{ position:'absolute', inset:0, zIndex:100, pointerEvents: isOpen ? 'none' : 'all' }}>
      {/* Left curtain */}
      <div ref={leftRef} style={{ position:'absolute', top:0, left:0, width:'51%', height:'100%', willChange:'transform', transformOrigin:'left center' }}>
        <svg viewBox="0 0 300 900" preserveAspectRatio="none" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cGL" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#2A0810" /><stop offset="12%"  stopColor="#6A1E2D" />
              <stop offset="25%"  stopColor="#3D0D18" /><stop offset="38%"  stopColor="#8B2535" />
              <stop offset="52%"  stopColor="#5A1520" /><stop offset="65%"  stopColor="#7A1E2D" />
              <stop offset="80%"  stopColor="#4A1018" /><stop offset="100%" stopColor="#2A0810" />
            </linearGradient>
            <linearGradient id="shineGL" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.08)" /><stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
            </linearGradient>
            <linearGradient id="goldTrimL" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#8A6914" /><stop offset="50%"  stopColor="#E8CC8A" /><stop offset="100%" stopColor="#C6A75E" />
            </linearGradient>
          </defs>
          <rect width="300" height="900" fill="url(#cGL)" />
          <rect width="300" height="900" fill="url(#shineGL)" />
          {[0,50,100,150,200,250].map((x,i) => (<rect key={i} x={x} y="0" width={[20,15,18,12,16,14][i]} height="900" fill="rgba(0,0,0,0.2)" rx="8" />))}
          {[30,80,130,180,230].map((x,i) => (<rect key={i} x={x} y="0" width="6" height="900" fill="rgba(255,255,255,0.06)" rx="3" />))}
          <path d="M0,820 Q40,860 80,820 Q120,860 160,820 Q200,860 240,820 Q280,860 300,820 L300,900 L0,900 Z" fill="rgba(198,167,94,0.25)" />
          <rect x="288" y="0" width="12" height="900" fill="url(#goldTrimL)" />
          {[200,400,600].map((y,i) => (<circle key={i} cx="280" cy={y} r="6" fill="rgba(198,167,94,0.5)" />))}
        </svg>
      </div>

      {/* Right curtain */}
      <div ref={rightRef} style={{ position:'absolute', top:0, right:0, width:'51%', height:'100%', willChange:'transform', transformOrigin:'right center' }}>
        <svg viewBox="0 0 300 900" preserveAspectRatio="none" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cGR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#2A0810" /><stop offset="20%"  stopColor="#4A1018" />
              <stop offset="35%"  stopColor="#7A1E2D" /><stop offset="50%"  stopColor="#5A1520" />
              <stop offset="65%"  stopColor="#8B2535" /><stop offset="78%"  stopColor="#3D0D18" />
              <stop offset="90%"  stopColor="#6A1E2D" /><stop offset="100%" stopColor="#2A0810" />
            </linearGradient>
            <linearGradient id="goldTrimR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#C6A75E" /><stop offset="50%"  stopColor="#E8CC8A" /><stop offset="100%" stopColor="#8A6914" />
            </linearGradient>
          </defs>
          <rect width="300" height="900" fill="url(#cGR)" />
          <rect width="300" height="900" fill="url(#shineGL)" />
          {[250,200,150,100,50,0].map((x,i) => (<rect key={i} x={x} y="0" width={[20,15,18,12,16,14][i]} height="900" fill="rgba(0,0,0,0.2)" rx="8" />))}
          {[260,210,160,110,60].map((x,i) => (<rect key={i} x={x} y="0" width="6" height="900" fill="rgba(255,255,255,0.06)" rx="3" />))}
          <path d="M0,820 Q40,860 80,820 Q120,860 160,820 Q200,860 240,820 Q280,860 300,820 L300,900 L0,900 Z" fill="rgba(198,167,94,0.25)" />
          <rect x="0" y="0" width="12" height="900" fill="url(#goldTrimR)" />
          {[200,400,600].map((y,i) => (<circle key={i} cx="20" cy={y} r="6" fill="rgba(198,167,94,0.5)" />))}
        </svg>
      </div>

      {/* Pelmet */}
      <div style={{
        position:'absolute', top:0, left:0, right:0,
        height:'clamp(64px, 13vw, 96px)',
        background:'linear-gradient(180deg, #3D0D18 0%, #6A1E2D 60%, #8B2535 100%)',
        zIndex:150, display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 6px 24px rgba(0,0,0,0.5)', overflow:'visible',
      }}>
        <svg style={{position:'absolute',bottom:-22,left:0,width:'100%',height:24,zIndex:152,pointerEvents:'none'}} viewBox="0 0 480 40" preserveAspectRatio="none">
          <path d="M0,0 Q24,40 48,0 Q72,40 96,0 Q120,40 144,0 Q168,40 192,0 Q216,40 240,0 Q264,40 288,0 Q312,40 336,0 Q360,40 384,0 Q408,40 432,0 Q456,40 480,0 L480,40 L0,40 Z" fill="#8B2535" />
        </svg>
        <div style={{position:'absolute',bottom:-16,left:0,right:0,display:'flex',justifyContent:'space-around',zIndex:155,padding:'0 4px',pointerEvents:'none'}}>
          {Array.from({length:40}).map((_,i) => (
            <div key={i} style={{
              width:2.5, height:`${14+(i%3)*4}px`,
              background:'linear-gradient(180deg, #C6A75E, #E8CC8A, rgba(198,167,94,0))',
              borderRadius:'0 0 2px 2px',
              animation:`fringeSwing 1.6s ease-in-out infinite`,
              animationDelay:`${(i*0.05)%0.8}s`,
            }} />
          ))}
        </div>
        <span className="shimmer-text" style={{fontFamily:'var(--font-heading)',fontSize:'clamp(0.85rem,3.5vw,1.2rem)',letterSpacing:2,position:'relative',zIndex:2,fontStyle:'italic'}}>
          Bint-e-Hawa ♥ Abdullah
        </span>
      </div>

      {/* Dark overlay */}
      <div ref={overlayRef} style={{position:'absolute',inset:0,background:'rgba(20,4,10,0.7)',zIndex:50,pointerEvents:'none'}} />

      {/* Pin button */}
      <div ref={pinRef} style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:200,opacity:0}}>
        <button className="glow-pulse" onClick={onOpen} aria-label="Open invitation"
          style={{
            width:72,height:72,borderRadius:'50%',
            border:'2px solid var(--gold-light)',
            background:'radial-gradient(circle at 35% 35%, #f7e0a1, #C6A75E 50%, #8A6914 100%)',
            cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
            position:'relative',outline:'none',
          }}>
          <span style={{fontSize:'1.6rem',color:'var(--maroon-deep)',position:'relative',zIndex:2,pointerEvents:'none'}}>✦</span>
          <div style={{position:'absolute',inset:-8,borderRadius:'50%',border:'1.5px solid rgba(198,167,94,0.5)',animation:'pinRipple 2s ease-out infinite'}} />
          <div style={{position:'absolute',inset:-16,borderRadius:'50%',border:'1.5px solid rgba(198,167,94,0.25)',animation:'pinRipple 2s ease-out infinite',animationDelay:'0.5s'}} />
        </button>
      </div>

      {/* CTA */}
      <div ref={ctaRef} style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',zIndex:200,display:'flex',flexDirection:'column',alignItems:'center',gap:8,pointerEvents:'none',opacity:0}}>
        <span style={{fontFamily:'var(--font-body)',fontSize:'0.55rem',letterSpacing:5,color:'rgba(248,243,231,0.7)'}}>TAP TO OPEN</span>
        <div style={{width:16,height:16,borderRight:'2px solid rgba(198,167,94,0.7)',borderBottom:'2px solid rgba(198,167,94,0.7)',transform:'rotate(45deg)',animation:'chevronBounce 1.4s ease-in-out infinite'}} />
      </div>

      <style>{`
        @keyframes pinRipple { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }
        @keyframes fringeSwing { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes chevronBounce { 0%, 100% { transform: rotate(45deg) translateY(0); opacity: 1; } 50% { transform: rotate(45deg) translateY(5px); opacity: 0.4; } }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection({ isOpen }) {
  const heroRef     = useRef(null)
  const bismillahRef = useRef(null)
  const namesRef    = useRef(null)
  const subtextRef  = useRef(null)
  const duaRef      = useRef(null)
  const dividerRef  = useRef(null)
  const silRef      = useRef(null)
  const badgeRef    = useRef(null)
  const petalInterval = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const delay = 1400
    const elements = [
      { ref: heroRef,      from: {opacity:0}, to: {opacity:1}, dur: 0.6, d: 0 },
      { ref: bismillahRef, from: {opacity:0,y:24}, to: {opacity:1,y:0}, dur: 0.8, d: 0.2 },
      { ref: dividerRef,   from: {opacity:0}, to: {opacity:1}, dur: 0.6, d: 0.5 },
      { ref: namesRef,     from: {opacity:0,y:30}, to: {opacity:1,y:0}, dur: 1, d: 0.7 },
      { ref: subtextRef,   from: {opacity:0,y:20}, to: {opacity:1,y:0}, dur: 0.7, d: 1 },
      { ref: duaRef,       from: {opacity:0,y:16}, to: {opacity:1,y:0}, dur: 0.7, d: 1.2 },
      { ref: badgeRef,     from: {opacity:0}, to: {opacity:1}, dur: 0.6, d: 1.5 },
      { ref: silRef,       from: {opacity:0,y:30}, to: {opacity:1,y:0}, dur: 1.2, d: 0.3 },
    ]
    elements.forEach(({ ref, from, to, dur, d }) => {
      if (!ref.current) return
      const el = ref.current
      Object.entries(from).forEach(([k,v]) => {
        if (k === 'opacity') el.style.opacity = v
        if (k === 'y') el.style.transform = `translateY(${v}px)`
      })
      el.style.transition = 'none'
      setTimeout(() => {
        el.style.transition = `all ${dur}s ease`
        Object.entries(to).forEach(([k,v]) => {
          if (k === 'opacity') el.style.opacity = v
          if (k === 'y') el.style.transform = `translateY(${v}px)`
        })
      }, delay + d * 1000)
    })

    petalInterval.current = setInterval(spawnPetal, 600)
    setTimeout(() => clearInterval(petalInterval.current), 8000)
    return () => clearInterval(petalInterval.current)
  }, [isOpen])

  return (
    <div ref={heroRef} style={{
      minHeight:'100vh', width:'100%',
      background:'radial-gradient(ellipse at 50% 60%, #4A1020 0%, #2A0810 40%, #1A0408 100%)',
      display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'flex-end', padding:'32px 24px 48px',
      position:'relative', overflow:'hidden',
      opacity: isOpen ? undefined : 0,
    }}>
      <div style={{position:'absolute',top:'30%',left:'50%',transform:'translate(-50%,-50%)',width:280,height:280,borderRadius:'50%',background:'radial-gradient(circle, rgba(198,167,94,0.12) 0%, transparent 70%)',pointerEvents:'none'}} />
      <div className="particles-wrap">
        {Array.from({length:12}).map((_,i) => (
          <div key={i} className="particle" style={{left:`${8+i*7.5}%`,width:`${2+(i%3)}px`,height:`${2+(i%3)}px`,animationDuration:`${6+(i%4)*2}s`,animationDelay:`${(i*0.7)%5}s`}} />
        ))}
      </div>

      {/* Silhouette */}
      <div ref={silRef} style={{position:'absolute',top:'clamp(60px,10vw,100px)',left:'50%',transform:'translateX(-50%)',width:'clamp(180px,55vw,260px)',display:'flex',flexDirection:'column',alignItems:'center',opacity:0}}>
        <svg className="silhouette-anim" viewBox="0 0 260 340" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{width:'100%',filter:'drop-shadow(0 0 20px rgba(198,167,94,0.2))'}}>
          <ellipse cx="80" cy="50" rx="22" ry="26" fill="rgba(61,13,24,0.85)" />
          <rect x="58" y="74" width="44" height="110" rx="8" fill="rgba(61,13,24,0.85)" />
          <rect x="40" y="80" width="20" height="75" rx="6" fill="rgba(61,13,24,0.85)" />
          <rect x="100" y="80" width="20" height="75" rx="6" fill="rgba(61,13,24,0.85)" />
          <rect x="62" y="182" width="18" height="80" rx="5" fill="rgba(61,13,24,0.85)" />
          <rect x="82" y="182" width="18" height="80" rx="5" fill="rgba(61,13,24,0.85)" />
          <line x1="80" y1="74" x2="80" y2="184" stroke="rgba(198,167,94,0.5)" strokeWidth="1.5" />
          <ellipse cx="80" cy="78" rx="6" ry="3" fill="rgba(198,167,94,0.6)" />
          <path d="M60,34 Q80,20 100,34" fill="none" stroke="rgba(198,167,94,0.7)" strokeWidth="2" />
          {[65,72,80,88,95].map((x,i) => (<line key={i} x1={x} y1="34" x2={x+2} y2={44+i*2} stroke="rgba(198,167,94,0.5)" strokeWidth="1" />))}
          <ellipse cx="180" cy="50" rx="20" ry="24" fill="rgba(106,30,45,0.85)" />
          <path d="M155,30 Q180,10 205,30 L210,80 Q180,60 150,80 Z" fill="rgba(198,167,94,0.3)" />
          <rect x="158" y="72" width="44" height="120" rx="10" fill="rgba(139,37,53,0.85)" />
          <path d="M152,192 Q180,240 210,192 L215,340 L145,340 Z" fill="rgba(106,30,45,0.9)" />
          <path d="M152,192 Q180,240 210,192" fill="none" stroke="rgba(198,167,94,0.6)" strokeWidth="2" />
          <rect x="148" y="80" width="16" height="80" rx="5" fill="rgba(106,30,45,0.8)" />
          <rect x="196" y="80" width="16" height="80" rx="5" fill="rgba(106,30,45,0.8)" />
          <ellipse cx="130" cy="170" rx="18" ry="8" fill="rgba(198,167,94,0.35)" />
          <circle cx="130" cy="168" r="4" fill="rgba(198,167,94,0.7)" />
          <text x="117" y="140" fontSize="18" fill="rgba(198,167,94,0.8)">♥</text>
        </svg>
        <div style={{position:'absolute',bottom:-20,width:120,height:30,background:'radial-gradient(ellipse, rgba(198,167,94,0.3), transparent 70%)',filter:'blur(8px)'}} />
      </div>

      {/* Text */}
      <div style={{position:'relative',zIndex:5,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',width:'100%',paddingTop:'clamp(180px,55vw,280px)'}}>
        <p ref={bismillahRef} className="urdu" style={{fontSize:'clamp(1.4rem,6vw,2rem)',color:'var(--gold-light)',lineHeight:1.8,marginBottom:4,filter:'drop-shadow(0 2px 8px rgba(198,167,94,0.4))',opacity:0}}>
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        <div ref={dividerRef} className="gold-divider" style={{transformOrigin:'center',opacity:0}} />

        <div ref={namesRef} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,margin:'4px 0 12px',opacity:0}}>
          <h1 className="shimmer-text" style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2rem,10vw,3rem)',fontStyle:'italic',lineHeight:1.1}}>Bint-e-Hawa</h1>
          <div style={{display:'flex',alignItems:'center',gap:10,margin:'4px 0'}}>
            <span style={{width:50,height:1,background:'linear-gradient(90deg, transparent, var(--gold), transparent)'}} />
            <span style={{color:'var(--gold-light)',fontSize:'1rem',animation:'floatUp 3s ease-in-out infinite'}}>♥</span>
            <span style={{width:50,height:1,background:'linear-gradient(90deg, transparent, var(--gold), transparent)'}} />
          </div>
          <h1 className="shimmer-text" style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2rem,10vw,3rem)',fontStyle:'italic',lineHeight:1.1}}>Abdullah</h1>
        </div>

        <p ref={subtextRef} style={{fontSize:'clamp(0.65rem,2.5vw,0.8rem)',color:'rgba(248,243,231,0.65)',letterSpacing:3,textTransform:'uppercase',marginBottom:10,opacity:0}}>
          With the blessings of Allah Almighty
        </p>

        <p ref={duaRef} className="urdu" style={{fontSize:'clamp(0.95rem,4vw,1.15rem)',color:'var(--blush)',lineHeight:2.2,marginBottom:20,opacity:0}}>
          اللہ تعالیٰ اس جوڑے کو<br />خوشی اور برکتوں سے نوازے
        </p>

        <div ref={badgeRef} className="gold-border-box" style={{background:'rgba(198,167,94,0.08)',padding:'16px 24px',display:'flex',flexDirection:'column',alignItems:'center',gap:4,opacity:0,backdropFilter:'blur(10px)'}}>
          <span style={{fontSize:'0.55rem',letterSpacing:5,color:'var(--gold)',textTransform:'uppercase',marginBottom:4}}>BARAAT CEREMONY</span>
          <span style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.2rem,5vw,1.6rem)',color:'var(--cream)',fontStyle:'italic'}}>8 April 2026</span>
          <span style={{fontSize:'0.7rem',color:'var(--gold-light)',letterSpacing:2}}>6:45 PM — 9:45 PM</span>
          <span style={{fontSize:'0.65rem',color:'rgba(248,243,231,0.6)',letterSpacing:2,marginTop:4}}>Ajwa Palace, Okara</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SCRATCH DATE REVEAL
───────────────────────────────────────────── */
function drawFloralOverlay(ctx, w, h) {
  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, '#8A6914'); grad.addColorStop(0.3, '#C6A75E')
  grad.addColorStop(0.6, '#E8CC8A'); grad.addColorStop(1, '#8A6914')
  ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h)
  const drawFlower = (x, y, r, petals = 6) => {
    for (let i = 0; i < petals; i++) {
      const angle = (i / petals) * Math.PI * 2
      ctx.beginPath()
      ctx.ellipse(x+Math.cos(angle)*r*0.6, y+Math.sin(angle)*r*0.6, r*0.5, r*0.25, angle, 0, Math.PI*2)
      ctx.fillStyle = `rgba(106,30,45,${0.3+Math.random()*0.3})`; ctx.fill()
    }
    ctx.beginPath(); ctx.arc(x, y, r*0.3, 0, Math.PI*2)
    ctx.fillStyle = 'rgba(248,243,231,0.6)'; ctx.fill()
  }
  [[w*.15,h*.15,22],[w*.75,h*.12,18],[w*.5,h*.25,20],[w*.2,h*.5,16],[w*.8,h*.45,20],[w*.45,h*.7,18],[w*.1,h*.8,14],[w*.85,h*.78,16],[w*.55,h*.88,22],[w*.3,h*.35,12],[w*.65,h*.6,14]]
    .forEach(([x,y,r]) => drawFlower(x,y,r))
  ctx.strokeStyle = 'rgba(106,30,45,0.25)'; ctx.lineWidth = 1.5
  for (let i = 0; i < 5; i++) {
    ctx.beginPath(); ctx.moveTo(Math.random()*w, 0)
    ctx.bezierCurveTo(Math.random()*w, h*0.3, Math.random()*w, h*0.6, Math.random()*w, h); ctx.stroke()
  }
  ctx.fillStyle = 'rgba(61,13,24,0.75)'; ctx.font = 'bold 13px Poppins, sans-serif'
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('✦  Scratch to Reveal  ✦', w/2, h/2)
}

function ScratchDateReveal() {
  const wrapRef    = useRef(null)
  const canvasRef  = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [pct, setPct] = useState(0)
  const isDrawing  = useRef(false)

  useEffect(() => {
    const wrap = wrapRef.current; const canvas = canvasRef.current
    if (!canvas || !wrap) return
    const W = wrap.offsetWidth || 320; const H = wrap.offsetHeight || 200
    canvas.width = W; canvas.height = H
    drawFloralOverlay(canvas.getContext('2d'), W, H)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (wrapRef.current) { wrapRef.current.style.transition = 'all 0.9s ease'; wrapRef.current.style.opacity = '1'; wrapRef.current.style.transform = 'translateY(0)' }
        obs.disconnect()
      }
    }, { threshold: 0.2 })
    if (wrapRef.current) obs.observe(wrapRef.current)
    return () => obs.disconnect()
  }, [])

  const scratch = useCallback((x, y) => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI*2); ctx.fill()
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let cleared = 0
    for (let i = 3; i < data.length; i += 4) if (data[i] < 128) cleared++
    const p = Math.round((cleared / (canvas.width * canvas.height)) * 100)
    setPct(p)
    if (p >= 70) {
      setRevealed(true)
      canvas.style.transition = 'opacity 0.8s ease'; canvas.style.opacity = '0'
      launchConfetti()
      const inner = document.querySelector('.date-reveal-inner')
      if (inner) { setTimeout(() => { inner.style.transition = 'all 0.7s cubic-bezier(0.175,0.885,0.32,1.275)'; inner.style.opacity = '1'; inner.style.transform = 'scale(1)' }, 300) }
    }
  }, [revealed])

  const getPos = (e, canvas) => {
    const r = canvas.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return { x: src.clientX - r.left, y: src.clientY - r.top }
  }

  const onStart = useCallback((e) => { e.preventDefault(); isDrawing.current = true; const pos = getPos(e, canvasRef.current); scratch(pos.x, pos.y) }, [scratch])
  const onMove  = useCallback((e) => { e.preventDefault(); if (!isDrawing.current) return; const pos = getPos(e, canvasRef.current); scratch(pos.x, pos.y) }, [scratch])
  const onEnd   = useCallback(() => { isDrawing.current = false }, [])

  return (
    <section style={{padding:'60px 24px 48px',background:'var(--cream)',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:4,background:'linear-gradient(90deg, transparent, var(--gold), transparent)'}} />
      <p className="section-label">Date Reveal</p>
      <h2 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.4rem,6vw,1.9rem)',color:'var(--maroon)',fontStyle:'italic',marginBottom:4}}>When is the Big Day?</h2>
      <div className="gold-divider" />

      <div ref={wrapRef} className="gold-border-box"
        style={{position:'relative',width:'100%',maxWidth:360,height:240,marginTop:24,borderRadius:'var(--radius)',overflow:'hidden',cursor:'crosshair',userSelect:'none',touchAction:'none',background:'linear-gradient(135deg, #fff 0%, var(--cream) 100%)',boxShadow:'0 8px 40px rgba(106,30,45,0.15)',opacity:0,transform:'translateY(50px)'}}>
        <div className="date-reveal-inner" style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,padding:20,opacity:0,transform:'scale(0.85)'}}>
          <p style={{fontSize:'0.6rem',letterSpacing:5,textTransform:'uppercase',color:'var(--gold-dark)',marginBottom:4}}>Baraat Ceremony</p>
          <p style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.6rem,7vw,2.2rem)',color:'var(--maroon)',fontStyle:'italic',lineHeight:1}}>8 April 2026</p>
          <p style={{fontSize:'0.75rem',color:'var(--maroon-mid)',letterSpacing:2}}>6:45 PM – 9:45 PM</p>
          <div style={{width:80,height:1,background:'linear-gradient(90deg, transparent, var(--gold), transparent)',margin:'8px auto'}} />
          <p className="urdu" style={{fontSize:'clamp(1rem,4.5vw,1.3rem)',color:'var(--maroon)'}}>تقریبِ بارات</p>
          <p className="urdu" style={{fontSize:'clamp(0.9rem,4vw,1.1rem)',color:'var(--maroon-mid)'}}>8 اپریل 2026</p>
          <p className="urdu" style={{fontSize:'clamp(0.8rem,3.5vw,1rem)',color:'var(--gold-dark)'}}>شام 6:45 سے 9:45 بجے تک</p>
        </div>
        <canvas ref={canvasRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',borderRadius:'var(--radius)',touchAction:'none'}}
          onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
          onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd} />
        {!revealed && (
          <div style={{position:'absolute',bottom:8,left:16,right:16,height:3,background:'rgba(106,30,45,0.1)',borderRadius:2,overflow:'hidden',zIndex:10}}>
            <div style={{height:'100%',background:'linear-gradient(90deg, var(--gold-dark), var(--gold-light))',borderRadius:2,transition:'width 0.15s ease',width:`${pct}%`}} />
          </div>
        )}
      </div>
      {revealed && <p style={{marginTop:16,fontSize:'0.8rem',color:'var(--maroon)',letterSpacing:2,animation:'fadeInUp 0.6s ease forwards'}}>🎊 Revealed! See you there!</p>}
    </section>
  )
}

/* ─────────────────────────────────────────────
   VENUE SECTION
───────────────────────────────────────────── */
function VenueSection() {
  const sectionRef = useRef(null)
  const cardRef    = useRef(null)
  const mapRef     = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (cardRef.current) { cardRef.current.style.transition = 'all 0.9s ease'; cardRef.current.style.opacity = '1'; cardRef.current.style.transform = 'scale(1) translateY(0)' }
        setTimeout(() => { if (mapRef.current) { mapRef.current.style.transition = 'all 0.7s ease'; mapRef.current.style.opacity = '1'; mapRef.current.style.transform = 'translateY(0)' }}, 300)
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{padding:'60px 24px 64px',position:'relative',overflow:'hidden',background:'linear-gradient(180deg, #3D0D18 0%, #1A0408 100%)'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 20% 30%, rgba(198,167,94,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(198,167,94,0.06) 0%, transparent 50%)',pointerEvents:'none'}} />
      <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}>
        <p className="section-label">Venue</p>
        <h2 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.4rem,6vw,1.9rem)',color:'var(--gold-light)',fontStyle:'italic',marginBottom:4}}>Where We Celebrate</h2>
        <div className="gold-divider" />

        <div ref={cardRef} className="glass-card" style={{width:'100%',maxWidth:400,marginTop:24,position:'relative',textAlign:'center',opacity:0,transform:'scale(0.88) translateY(40px)'}}>
          {[['tl','top:-2px;left:-2px;border-width:2px 0 0 2px'],['tr','top:-2px;right:-2px;border-width:2px 2px 0 0'],['bl','bottom:-2px;left:-2px;border-width:0 0 2px 2px'],['br','bottom:-2px;right:-2px;border-width:0 2px 2px 0']].map(([k,s]) => (
            <span key={k} style={{position:'absolute',width:18,height:18,borderColor:'var(--gold)',borderStyle:'solid',opacity:0.6,...Object.fromEntries(s.split(';').map(p => { const [kk,...vv]=p.split(':'); return [kk.trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase()), vv.join(':')] }))}} />
          ))}
          <div style={{fontSize:'2.4rem',marginBottom:8,filter:'drop-shadow(0 2px 8px rgba(198,167,94,0.4))'}}>🏛️</div>
          <h3 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.4rem,6vw,1.8rem)',color:'var(--gold-light)',fontStyle:'italic',marginBottom:4}}>Ajwa Palace</h3>
          <p style={{fontSize:'0.7rem',color:'rgba(248,243,231,0.6)',letterSpacing:2}}>Okara, Punjab, Pakistan</p>
          <div style={{width:'100%',height:1,background:'linear-gradient(90deg, transparent, rgba(198,167,94,0.3), transparent)',margin:'16px 0'}} />
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[['Event','Baraat Ceremony'],['Date','8 April 2026'],['Time','6:45 PM – 9:45 PM']].map(([label,value]) => (
              <div key={label} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:'0.6rem',letterSpacing:3,textTransform:'uppercase',color:'rgba(198,167,94,0.6)'}}>{label}</span>
                <span style={{fontFamily:'var(--font-heading)',fontSize:'0.95rem',color:'var(--cream)',fontStyle:'italic'}}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{width:'100%',height:1,background:'linear-gradient(90deg, transparent, rgba(198,167,94,0.3), transparent)',margin:'16px 0'}} />

          <div ref={mapRef} style={{width:'100%',borderRadius:'var(--radius-sm)',overflow:'hidden',border:'1px solid rgba(198,167,94,0.2)',marginBottom:16,opacity:0,transform:'translateY(24px)'}}>
            <iframe title="Ajwa Palace Okara" src="https://maps.google.com/maps?q=Ajwa+Palace+Okara&output=embed" style={{width:'100%',height:180,border:'none',display:'block',filter:'sepia(0.2) contrast(1.05)'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>

          <a href="https://maps.google.com?q=Ajwa+Palace+Okara" target="_blank" rel="noreferrer"
            style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 28px',border:'1px solid var(--gold)',borderRadius:50,color:'var(--gold-light)',textDecoration:'none',fontSize:'0.7rem',letterSpacing:3,textTransform:'uppercase',background:'rgba(198,167,94,0.08)',transition:'all 0.3s'}}>
            <span>📍</span><span>Get Directions</span>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   INVITATION NOTE
───────────────────────────────────────────── */
function InvitationNote() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const children = Array.from(ref.current?.children || [])
        children.forEach((el, i) => {
          el.style.opacity = '0'; el.style.transform = 'translateY(30px)'
          setTimeout(() => { el.style.transition = 'all 0.7s ease'; el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, i * 150)
        })
        obs.disconnect()
      }
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{padding:'60px 24px',background:'var(--cream)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',fontSize:'20rem',color:'rgba(106,30,45,0.03)',top:'50%',left:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',fontFamily:'var(--font-heading)'}}>♥</div>
      <div ref={ref} style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:12,position:'relative',zIndex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:12,width:'100%',maxWidth:280}}>
          <span style={{flex:1,height:1,background:'linear-gradient(90deg, transparent, rgba(198,167,94,0.5))'}} />
          <span style={{color:'var(--gold)',fontSize:'0.9rem'}}>✦</span>
          <span style={{flex:1,height:1,background:'linear-gradient(90deg, rgba(198,167,94,0.5), transparent)'}} />
        </div>
        <p className="section-label">Invitation</p>
        <h2 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.5rem,6.5vw,2rem)',color:'var(--maroon)',fontStyle:'italic',lineHeight:1.3}}>You Are Cordially Invited</h2>
        <div className="gold-divider" />
        <p style={{fontSize:'clamp(0.85rem,3.5vw,1rem)',color:'#3D1018',lineHeight:1.9,fontWeight:300}}>
          With great joy and gratitude,<br />we request the honor of your presence<br />at the <em style={{fontStyle:'italic',color:'var(--maroon)',fontWeight:500}}>Baraat ceremony</em> of our beloved daughter.
        </p>
        <div style={{border:'1px solid rgba(198,167,94,0.2)',borderRadius:'var(--radius-sm)',padding:'16px 20px',background:'rgba(198,167,94,0.04)',width:'100%'}}>
          <p className="urdu" style={{fontSize:'clamp(1.1rem,5vw,1.35rem)',color:'var(--maroon)',lineHeight:2.2}}>
            ہم آپ کو اپنی پیاری بیٹی کی<br />تقریبِ بارات میں شرکت کی دعوت دیتے ہیں۔
          </p>
        </div>
        <div style={{margin:'8px 0'}}>
          <div style={{width:64,height:64,borderRadius:'50%',border:'2px solid var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',background:'radial-gradient(circle at 40% 40%, rgba(248,243,231,0.9), rgba(232,207,193,0.6))',boxShadow:'0 0 20px rgba(198,167,94,0.2), inset 0 0 10px rgba(198,167,94,0.1)'}}>
            <span className="shimmer-text" style={{fontFamily:'var(--font-heading)',fontSize:'0.85rem',fontStyle:'italic'}}>S ♥ A</span>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12,width:'100%',maxWidth:280}}>
          <span style={{flex:1,height:1,background:'linear-gradient(90deg, transparent, rgba(198,167,94,0.5))'}} />
          <span style={{color:'var(--gold)',fontSize:'0.9rem'}}>❧</span>
          <span style={{flex:1,height:1,background:'linear-gradient(90deg, rgba(198,167,94,0.5), transparent)'}} />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PARENTS MESSAGE
───────────────────────────────────────────── */
function ParentsMessage() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const els = ref.current?.querySelectorAll('.pm-animate') || []
        Array.from(els).forEach((el, i) => {
          el.style.opacity = '0'; el.style.transform = 'translateY(28px)'
          setTimeout(() => { el.style.transition = 'all 0.8s ease'; el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, i * 180)
        })
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{padding:'60px 24px 64px',background:'linear-gradient(180deg, #1A0408 0%, #2A0810 50%, #3D0D18 100%)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 10% 50%, rgba(198,167,94,0.07) 0%, transparent 55%), radial-gradient(circle at 90% 20%, rgba(198,167,94,0.05) 0%, transparent 50%)',pointerEvents:'none'}} />
      <div ref={ref} style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:16}}>
        <p className="section-label pm-animate">A Message from the Parents</p>
        <h2 className="pm-animate" style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.4rem,6vw,1.9rem)',color:'var(--gold-light)',fontStyle:'italic'}}>With Love &amp; Prayers</h2>
        <div className="gold-divider pm-animate" />
        <div className="pm-animate" style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap',justifyContent:'center'}}>
          {[['Mr.','M. Rafiq'],['Mrs.','Mussarat Rafiq']].map(([title,name], i) => (
            <React.Fragment key={name}>
              {i===1 && <span style={{fontFamily:'var(--font-heading)',fontSize:'1.6rem',color:'var(--gold)',fontStyle:'italic'}}>&amp;</span>}
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                <span style={{fontSize:'0.6rem',letterSpacing:3,color:'var(--gold)',textTransform:'uppercase'}}>{title}</span>
                <span style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.05rem,4.5vw,1.3rem)',color:'var(--cream)',fontStyle:'italic'}}>{name}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="pm-animate glass-card" style={{width:'100%',maxWidth:380,textAlign:'center'}}>
          <p style={{fontSize:'clamp(0.85rem,3.5vw,0.95rem)',color:'rgba(248,243,231,0.8)',lineHeight:1.9,fontWeight:300}}>
            May Allah grant this couple a life full of happiness, understanding and endless blessings.
          </p>
          <div style={{width:80,height:1,background:'linear-gradient(90deg, transparent, rgba(198,167,94,0.4), transparent)',margin:'14px auto'}} />
          <p className="urdu" style={{fontSize:'clamp(1rem,4.5vw,1.2rem)',color:'var(--blush)',lineHeight:2.2}}>
            اللہ تعالیٰ اس جوڑے کو<br />محبت، خوشی اور برکتوں سے بھرپور زندگی عطا فرمائے۔
          </p>
        </div>
        <div className="pm-animate" style={{marginTop:8}}>
          <span className="shimmer-text" style={{fontFamily:'var(--font-urdu)',fontSize:'clamp(1.6rem,7vw,2.2rem)'}}>آمین</span>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{padding:'48px 24px 60px',background:'#0A0204',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:8}}>
      <div style={{width:'100%',height:1,background:'linear-gradient(90deg, transparent, var(--gold), transparent)',marginBottom:16}} />
      <p className="shimmer-text" style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.4rem,10vw,3.2rem)',fontStyle:'italic',lineHeight:1,marginBottom:4}}>B ♥ A</p>
      <p style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1rem,4vw,1.3rem)',color:'var(--cream)',fontStyle:'italic'}}>Bint-e-Hawa &amp; Abdullah</p>
      <p style={{fontSize:'0.62rem',letterSpacing:3,color:'rgba(198,167,94,0.5)',textTransform:'uppercase'}}>8 April 2026 · Ajwa Palace, Okara</p>
      <div style={{margin:'12px 0 4px'}}>
        <p className="urdu" style={{fontSize:'clamp(1.1rem,5vw,1.4rem)',color:'var(--gold-light)'}}>جزاک اللہ خیرًا</p>
      </div>
      <p style={{fontSize:'0.58rem',letterSpacing:2,color:'rgba(255,255,255,0.2)',textTransform:'uppercase',marginTop:12}}>Made with ♥ for a special day</p>
    </footer>
  )
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
import React from 'react'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [muted,  setMuted]  = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true; audio.volume = 0.35
    audio.addEventListener('error', () => {})
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    const audio = audioRef.current
    if (audio) audio.play().catch(() => {})
  }, [])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (muted) { audio.volume = 0.35; audio.play().catch(() => {}) }
    else { audio.volume = 0 }
    setMuted(m => !m)
  }, [muted])

  return (
    <>
      <GlobalStyles />
      <div style={{width:'100%',minHeight:'100vh',position:'relative'}}>
        {isOpen && (
          <button onClick={toggleMute} aria-label={muted ? 'Unmute music' : 'Mute music'}
            style={{position:'fixed',top:16,right:16,zIndex:9000,width:40,height:40,borderRadius:'50%',border:'1px solid rgba(198,167,94,0.4)',background:'rgba(61,13,24,0.8)',backdropFilter:'blur(8px)',color:'var(--gold-light)',fontSize:'1.1rem',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'background 0.2s, transform 0.2s',outline:'none'}}>
            {muted ? '🔇' : '🎵'}
          </button>
        )}

        <div style={{position:'relative',width:'100%',height:'100vh',overflow:'hidden'}}>
          <HeroSection isOpen={isOpen} />
          <CurtainAnimation onOpen={handleOpen} isOpen={isOpen} />
        </div>

        <div style={{display: isOpen ? 'block' : 'none', animation: isOpen ? 'fadeInUp 0.5s ease forwards' : 'none'}}>
          <ScratchDateReveal />
          <VenueSection />
          <InvitationNote />
          <ParentsMessage />
          <Footer />
        </div>

        <WhatsappButton />
      </div>
    </>
  )
}