/**
 * Decorative globe with an aircraft flying its orbit, sitting in the hero's
 * right column. Pure SVG plus CSS — no JavaScript, so the hero stays a Server
 * Component.
 *
 * The box is a fixed 520×520 on purpose: the flight path is declared in
 * `globals.css` as an `offset-path` in these exact coordinates, so the plane and
 * the dashed route ellipse below trace the same curve. Resize with `scale`,
 * never by changing this box, or the two will come apart.
 */
export default function HeroGlobe() {
  return (
    <div
      className="pointer-events-none relative w-[520px] h-[520px] scale-105 xl:scale-125"
      aria-hidden="true"
    >
      {/* The entrance animates `transform`, so it needs its own element — sharing
          one with the responsive `scale` above would knock that out while it runs.
          Being positioned, this is also the containing block the plane's
          offset-path coordinates resolve against, and it is exactly the 520 box. */}
      <div className="hero-globe-in absolute inset-0">

        {/* Pool of shade so the white linework reads against a busy photograph */}
        <div className="absolute inset-[-12%] bg-[radial-gradient(circle,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.25)_45%,transparent_72%)]" />

        <svg viewBox="0 0 520 520" className="absolute inset-0 w-full h-full" fill="none">
          <g stroke="white" strokeWidth="1.15">
            {/* Sphere edge */}
            <circle cx="260" cy="260" r="150" strokeOpacity="0.8" strokeWidth="1.5" />

            {/* Latitudes — flatter towards the poles, as they read on a sphere */}
            <ellipse cx="260" cy="260" rx="150" ry="44" strokeOpacity="0.45" />
            <ellipse cx="260" cy="185" rx="130" ry="38" strokeOpacity="0.36" />
            <ellipse cx="260" cy="335" rx="130" ry="38" strokeOpacity="0.36" />
            <ellipse cx="260" cy="130" rx="75"  ry="22" strokeOpacity="0.26" />
            <ellipse cx="260" cy="390" rx="75"  ry="22" strokeOpacity="0.26" />

            {/* Meridians — narrowing towards the centre line */}
            <ellipse cx="260" cy="260" rx="112" ry="150" strokeOpacity="0.36" />
            <ellipse cx="260" cy="260" rx="58"  ry="150" strokeOpacity="0.26" />
            <line x1="260" y1="110" x2="260" y2="410" strokeOpacity="0.26" />
          </g>

          {/* The flight path. Same ellipse the plane's offset-path traces. */}
          <ellipse
            className="hero-route"
            cx="260"
            cy="260"
            rx="235"
            ry="110"
            transform="rotate(-20 260 260)"
            stroke="white"
            strokeOpacity="0.75"
            strokeWidth="1.25"
            strokeDasharray="5 7"
          />

          {/* Two waypoints on the sphere, breathing gently out of phase */}
          <g fill="white">
            <circle className="hero-ping" cx="203" cy="216" r="13" fillOpacity="0.3" />
            <circle cx="203" cy="216" r="3.5" />
            <circle className="hero-ping hero-ping-late" cx="324" cy="292" r="13" fillOpacity="0.3" />
            <circle cx="324" cy="292" r="3.5" />
          </g>
        </svg>

        {/* The aircraft. CSS drives it around the orbit and turns it into the
            direction of travel; the tapered stroke behind it reads as a contrail. */}
        <div className="hero-plane absolute left-0 top-0 w-[58px] h-[32px]">
          <svg viewBox="-14 0 38 24" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="hero-contrail" x1="0" x2="1">
                <stop offset="0" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path d="M-13 12 H2" stroke="url(#hero-contrail)" strokeWidth="1.75" strokeLinecap="round" />
            <path d="M22 12 L2 4 L9 12 L2 20 Z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  )
}
