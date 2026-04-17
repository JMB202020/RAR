'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, X } from 'lucide-react'
import FadeUp from './FadeUp'
import { VIDEO_THUMBNAIL, IMAGE_FILTER } from '@/lib/images'

export default function VideoPlaceholder() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
          <FadeUp>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="group relative w-full overflow-hidden rounded-[12px] bg-brand-bg-dark"
              aria-label="Play video: How we build a gym campaign"
            >
              <div className="relative flex aspect-video items-center justify-center">
                <Image
                  src={VIDEO_THUMBNAIL.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 1120px, 100vw"
                  className="object-cover"
                  style={{ filter: IMAGE_FILTER }}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent transition-transform duration-200 group-hover:scale-110">
                    <Play size={28} className="ml-1 text-brand-accent-text" />
                  </div>
                  <p className="text-[15px] font-medium text-brand-inverse">
                    How we build a gym campaign (90 seconds)
                  </p>
                </div>
              </div>
            </button>
          </FadeUp>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="relative w-full max-w-[640px] rounded-[12px] bg-white p-8 text-center">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 text-brand-tertiary hover:text-brand-primary"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <p className="mt-4 text-[20px] font-semibold text-brand-primary">
              Video coming soon
            </p>
            <p className="mt-3 text-[15px] text-brand-secondary">
              We&apos;re producing a 90-second walkthrough of how we build a
              campaign from scratch. Check back soon.
            </p>
            {/* TODO: Replace with actual campaign build walkthrough video when produced. */}
          </div>
        </div>
      )}
    </>
  )
}
