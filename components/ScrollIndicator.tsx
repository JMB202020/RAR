'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function ScrollIndicator() {
  return (
    <div className="flex justify-center pb-12">
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} className="text-brand-tertiary" />
      </motion.div>
    </div>
  )
}
