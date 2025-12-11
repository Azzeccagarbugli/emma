'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <main className="min-h-screen min-h-dvh flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-bumble/20 rounded-full blur-xl" />
        <div className="absolute top-40 right-8 w-32 h-32 bg-coral/15 rounded-full blur-2xl" />
        <div className="absolute bottom-40 left-16 w-24 h-24 bg-teal/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-bumble/30 rounded-full blur-lg" />
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center text-center z-10 max-w-sm">
        <div className="mb-8">
          <div className="w-24 h-24 bg-bumble rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse-glow mx-auto">
            <span className="text-4xl">🦄</span>
          </div>
        </div>

        <h1 className="text-5xl font-black text-text-dark mb-4 tracking-tight">
          Ciao Emma!
        </h1>

        <p className="text-xl text-text-muted font-semibold mb-2">
          I made something for you...
        </p>

        <p className="text-text-muted/80 text-base leading-relaxed mb-12">
          Since you told me that I wasn't able to build websites, I wanted to prove you wrong, and here it is, let's see if you can play!
          <span className="inline-block ml-1">😎</span>
        </p>

        <Link
          href="/play"
          className="group w-full bg-bumble hover:bg-bumble-dark text-text-dark font-bold text-xl py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 touch-target transition-all duration-200"
        >
          <span>Let&apos;s Play</span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </main>
  );
}
