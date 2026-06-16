import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const getDisplayDate = (elapsed) => {
  if (elapsed < 2400) return 'JAN 01'
  if (elapsed >= 9600) return 'JUL 01'

  const progress = (elapsed - 2400) / (9600 - 2400)
  const totalDays = 181
  const currentDayOffset = Math.floor(progress * totalDays)

  const months = [
    { name: 'JAN', days: 31 },
    { name: 'FEB', days: 28 },
    { name: 'MAR', days: 31 },
    { name: 'APR', days: 30 },
    { name: 'MAY', days: 31 },
    { name: 'JUN', days: 30 },
    { name: 'JUL', days: 31 },
  ]

  let daysLeft = currentDayOffset
  let monthIndex = 0

  while (daysLeft >= months[monthIndex].days && monthIndex < months.length - 1) {
    daysLeft -= months[monthIndex].days
    monthIndex++
  }

  const dayOfMonth = daysLeft + 1
  return `${months[monthIndex].name} ${dayOfMonth.toString().padStart(2, '0')}`
}

const MORPH_PATHS = {
  LeftArmOutside: {
    fat: 'M978,69 s2,60 -55,109 s-294,119 -400,168 s-182.6,164 -226.5,326.5 c-122,452 -96,623 -140,776 c0,0 -65,238 -50,414 c14.5,169.6 51,541 51,541',
    thin: 'M1017,69 s2,110 -55,159 s-294,69 -400,118 s-182.6,164 -226.5,326.5 c-122,452 -96,623 -140,776 c0,0 -65,238 -50,414 c14.5,169.6 41,541 41,541',
  },
  RightArmOutside: {
    fat: 'M1417.3,69 s-2,60 55,109 c57,49 294,119 400,168 c106,49 182.6,164 226.5,326.5 c122,452 96,623 140,776 c0,0 65,238 50,414 c-14.5,169.6 -51,541 -51,541',
    thin: 'M1377.3,69 s-2,110 55,159 c57,49 294,69 400,118 c106,49 182.6,164 226.5,326.5 c122,452 96,623 140,776 c0,0 65,238 50,414 c-14.5,169.6 -41,541 -41,541',
  },
  LeftChest: {
    fat: 'M584.5,711.5 s-73,169 -34,281 s150,115 230,83 c80,-32 117,-63 226,-106',
    thin: 'M483.5,711.5 s4,94 43,206 s67,149.4 153,158 c96.5,9.7 153.4,12.4 265,-15',
  },
  RightChest: {
    fat: 'M1800,711.5 s73,169 34,281 c-39,112 -150,115 -230,83 c-80,-32 -117,-63 -226,-106',
    thin: 'M1901.5,711.5 s-4,94 -43,206 c-39,112 -67,149.4 -153,158 c-96.5,9.7 -153.4,12.4 -265,-15',
  },
  LeftTorso: {
    fat: 'M352.5,2405.5 s12.5,-205.8 56,-399 c50,-222 19.3,-403.8 38,-481 c25,-103 138.5,-468.5 138.5,-468.5 c0,0 -187.2,689.5 -43.9,1346.5',
    thin: 'M352.5,2405.5 s12.5,-205.8 56,-399 c50,-222 -6,-414.9 38,-481 c72,-108 138.5,-468.5 138.5,-468.5 c0,0 229.5,792.5 56.1,1346.5',
  },
  RightTorso: {
    fat: 'M2032,2405.5 s-12.5,-205.8 -56,-399 c-50,-222 -19.3,-403.8 -38,-481 c-25,-103 -138.5,-468.5 -138.5,-468.5 c0,0 187.2,689.5 43.9,1346.5',
    thin: 'M2035.5,2405.5 s-12.5,-205.8 -56,-399 c-50,-222 11.4,-418.8 -38,-481 c-97,-122 -138.5,-468.5 -138.5,-468.5 c0,0 -229.5,792.5 -56.1,1346.5',
  },
}

const STATIC_PATHS = {
  BottomBellyFatOnly: 'M663.9,2155.9 s183.7,184.6 537.6,184.6 s511,-176.8 511,-176.8',
  ThinBellyButtonLeft:
    'M1234,1913.1 c-5.7,17.8 -24.8,27.5 -42.6,21.8 c-17.8,-5.7 -27.5,-24.8 -21.8,-42.6 h0 c5.7,-17.8 24.8,-27.5 42.6,-21.8',
}

const ABS_PATHS = [
  'M1150.9,1312.3 s-209.9,51.9 -307.5,-111.1',
  'M1160.5,1495.5 s-170,42 -249,-90',
  'M1172,1676.8 s-122.3,30.2 -179.1,-64.7',
  'M1252.1,1312.3 s209.9,51.9 307.5,-111.1',
  'M1242.5,1495.5 s170,42 249,-90',
  'M1231,1676.8 s122.3,30.2 179.1,-64.7',
  'M1201.5,888.5 L1201.5,1060.5',
  'M1201.5,1190.5 L1201.5,1362.5',
  'M1201.5,1439.5 L1201.5,1611.5',
]

const morphTiming = {
  duration: 12,
  repeat: Infinity,
  ease: 'easeInOut',
  times: [0, 0.2, 0.8, 0.95, 0.98, 1],
}

const absOpacityTransition = {
  duration: 12,
  repeat: Infinity,
  opacity: {
    ease: 'linear',
    times: [0, 8 / 12, 0.8, 0.95, 0.98, 1],
  },
}

export function DbrHeroAnimation() {
  const [textIndex, setTextIndex] = useState(0)
  const [displayDate, setDisplayDate] = useState('JAN 01')

  useEffect(() => {
    const loopDuration = 12000
    const startTime = Date.now()

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % loopDuration

      setDisplayDate(getDisplayDate(elapsed))

      if (elapsed < 2400) {
        setTextIndex(0)
      } else if (elapsed < 9600) {
        setTextIndex(1)
      } else {
        setTextIndex(2)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const hudMessages = [
    '[ SCANNING THREAT: VISCERAL FAT ]',
    '[ LOGGING DATA: OXIDATION ACTIVE ]',
    '[ SYSTEM OPTIMAL: 75KG SECURED ]',
  ]

  const nodes = [
    { x: 10, y: 20, weight: '150KG', times: [0, 0.05, 0.95, 1] },
    { x: 30, y: 35, weight: '130KG', times: [0, 0.2, 0.25, 0.95, 1] },
    { x: 50, y: 50, weight: '110KG', times: [0, 0.4, 0.45, 0.95, 1] },
    { x: 70, y: 65, weight: '90KG', times: [0, 0.6, 0.65, 0.95, 1] },
    { x: 90, y: 80, weight: '75KG', times: [0, 0.8, 0.85, 0.95, 1] },
  ]

  return (
    <div className="relative mx-auto flex h-[520px] w-full max-w-sm flex-col items-center justify-center overflow-hidden border border-gray-800 bg-[#0a0a0a] font-mono shadow-2xl">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="absolute top-6 z-20 flex w-full justify-center">
        <div
          className={`flex items-center space-x-2 border border-gray-800 bg-[#111] px-4 py-1.5 transition-shadow duration-300 ${displayDate === 'JUL 01' ? 'shadow-[0_0_10px_rgba(234,179,8,0.2)]' : 'shadow-[0_0_10px_rgba(74,222,128,0.1)]'}`}
        >
          <div
            className={`h-2 w-2 animate-pulse transition-colors duration-300 ${displayDate === 'JUL 01' ? 'bg-yellow-500' : 'bg-green-500'}`}
          />
          <span
            className={`text-sm font-bold tracking-widest transition-colors duration-300 ${displayDate === 'JUL 01' ? 'text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'text-green-400'}`}
          >
            {displayDate}
          </span>
        </div>
      </div>

      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 10,20 C 20,20 20,35 30,35 C 40,35 40,50 50,50 C 60,50 60,65 70,65 C 80,65 80,80 90,80"
          fill="transparent"
          stroke="#4ade80"
          strokeWidth="0.5"
          strokeDasharray="1 1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear', times: [0, 0.8, 0.95, 1] }}
        />
        {nodes.map((node, i) => (
          <motion.g
            key={i}
            animate={{ opacity: node.times.length === 4 ? [0, 1, 1, 0] : [0, 0, 1, 1, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeOut', times: node.times }}
          >
            <circle cx={node.x} cy={node.y} r="1.5" fill="#0a0a0a" stroke="#4ade80" strokeWidth="0.5" />
            <circle cx={node.x} cy={node.y} r="0.5" fill="#4ade80" />
            <text
              x={node.x}
              y={node.y - 3}
              fill="#4ade80"
              fontSize="3"
              textAnchor="middle"
              className="font-bold tracking-widest"
            >
              {node.weight}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="relative mt-4 h-[300px] w-[280px]">
        <motion.svg
          className="absolute inset-0 h-full w-full drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          viewBox="0 0 2400 2500"
          animate={{ opacity: [1, 1, 1, 1, 0, 1] }}
          transition={morphTiming}
        >
          <g fill="none" stroke="#e5e5e5" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round">
            {Object.keys(MORPH_PATHS).map((key) => (
              <motion.path
                key={key}
                d={MORPH_PATHS[key].fat}
                initial={{ d: MORPH_PATHS[key].fat }}
                animate={{
                  d: [
                    MORPH_PATHS[key].fat,
                    MORPH_PATHS[key].fat,
                    MORPH_PATHS[key].thin,
                    MORPH_PATHS[key].thin,
                    MORPH_PATHS[key].thin,
                    MORPH_PATHS[key].fat,
                  ],
                }}
                transition={morphTiming}
              />
            ))}

            <motion.path
              d={STATIC_PATHS.BottomBellyFatOnly}
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 1, 0, 0, 0, 1] }}
              transition={morphTiming}
            />

            <path d={STATIC_PATHS.ThinBellyButtonLeft} />

            <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0.7, 0.7, 0, 0] }} transition={absOpacityTransition}>
              {ABS_PATHS.map((path, index) => (
                <path key={`ab-${index}`} d={path} stroke="#e5e5e5" strokeWidth="13" fill="none" />
              ))}
            </motion.g>
          </g>
        </motion.svg>

        <motion.svg className="absolute inset-0 h-full w-full" viewBox="0 0 2400 2500">
          <motion.g
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: [0.8, 0.8, 0, 0, 0, 0.8], scale: [1, 1, 0, 0, 0, 0.8] }}
            transition={morphTiming}
            style={{ transformOrigin: '1200px 1870px' }}
          >
            <ellipse
              cx="1200"
              cy="1870"
              rx="350"
              ry="250"
              fill="#ea580c"
              opacity="0.8"
              className="drop-shadow-[0_0_25px_rgba(234,88,12,0.8)]"
            />
            <ellipse cx="1200" cy="1870" rx="200" ry="150" fill="#ff7a29" />
          </motion.g>
        </motion.svg>

        <motion.div
          className="absolute left-0 z-10 h-[2px] w-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]"
          initial={{ top: '0%', opacity: 0 }}
          animate={{ top: ['0%', '100%', '100%', '0%'], opacity: [0, 1, 0, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear', times: [0, 0.8, 0.95, 1] }}
        />
      </div>

      <div className="absolute bottom-6 w-full px-6">
        <div className="relative flex h-16 flex-col items-center justify-center overflow-hidden border border-gray-800 bg-[#111] p-3">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-[#222] to-transparent opacity-50" />
          <motion.p
            key={textIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`z-10 text-center text-xs font-bold tracking-wide ${
              textIndex === 0 ? 'text-orange-500' : textIndex === 1 ? 'text-gray-300' : 'text-green-400'
            }`}
          >
            {hudMessages[textIndex]}
          </motion.p>
        </div>
      </div>
    </div>
  )
}
