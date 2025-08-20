'use client'
import { useState } from 'react';

const INTRO_VIDEO = '/videos/Netflix_Intro.mp4'; // ya existe en tu repo

export default function Page() {
  const [stage, setStage] = useState<'intro' | 'profiles'>('intro');

  if (stage === 'intro') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <video
          src={INTRO_VIDEO}
          autoPlay
          muted
          playsInline
          controls
          onEnded={() => setStage('profiles')}
          className="h-full w-full max-h-[85vh] max-w-[95vw] object-contain"
        />
        <button
          onClick={() => setStage('profiles')}
          className="absolute bottom-6 right-6 rounded bg-white/20 px-4 py-2 text-white hover:bg-white/40"
        >
          Saltar intro
        </button>
      </div>
    );
  }

  // placeholder hasta el siguiente paso
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold">Selector de perfiles (próximo paso)</h1>
      <p className="mt-2 text-white/80">
        Si ves esto, la intro ha terminado correctamente ✅
      </p>
    </main>
  );
}
