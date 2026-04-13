'use client'

import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <div className="flex justify-center pb-16">
      <div className="flex flex-col items-center gap-3">
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-brand-tertiary">
          Scroll
        </span>
        <motion.div
          className="h-10 w-px origin-top bg-brand-accent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.4, 0.6, 1],
          }}
        />
      </div>
    </div>
  )
}
