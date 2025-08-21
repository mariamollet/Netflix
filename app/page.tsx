'use client'
import { useEffect, useMemo, useRef, useState } from 'react';

/* ===================== CONFIGURA AQUÍ ===================== */
const INTRO_VIDEO = '/videos/Netflix_Intro.mp4'; // tu intro local

// Perfiles: usa tus fotos si quieres (codifica espacios como %20)
const PROFILES = [
  { id: 'baby',  name: 'Baby Pablo',  img: '/profiles/Pablobaby.jpg', allowed: false },
  { id: 'teen',  name: 'Teen Pablo',  img: '/profiles/Pabloteen.jpg', allowed: false },
  { id: 'adult', name: 'Adult Pablo', img: '/profiles/Pablonow.jpg',                                           allowed: true  },
  { id: 'old',   name: 'Old Pablo',   img: '/profiles/Pabloold.jpg',   allowed: false },
];

// Catálogo: usa tus vídeos locales .mov que ya subiste
const MOVIES = [
  {
    id: 'm1',
    title: 'Piscina',
    year: 2025,
    rating: 'TP',
    duration: '0:20',
    poster:   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    backdrop: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600',
    videoUrl: '/videos/IMG_0772.mov',
    description: 'Un chapuzón épico en verano.',
    tags: ['Verano', 'Familia']
  },
  {
    id: 'm2',
    title: 'Clip misterioso',
    year: 2025,
    rating: '12+',
    duration: '0:15',
    poster:   'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
    backdrop: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600',
    videoUrl: '/videos/4c4c30cb-cd2d-4280-901e-cca377b7ec8d.mov',
    description: 'Luces y sombras en la ciudad.',
    tags: ['Acción', 'Ciudad']
  },
];
/* ========================================================== */

function ProfileCard({ p, onSelect }: any) {
  return (
    <button onClick={() => onSelect(p)} className="text-center">
      <img src={p.img} alt={p.name} className="mb-2 h-32 w-32 rounded object-cover" />
      <div className="text-white/90">{p.name}</div>
    </button>
  );
}

function ProfilesScreen({ onChoose }: any) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="mb-10 text-3xl font-bold">¿Quién eres? Elige tu perfil</h1>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {PROFILES.map((p) => <ProfileCard key={p.id} p={p} onSelect={onChoose} />)}
      </div>
      <button className="mt-8 rounded border border-white/30 px-4 py-2 text-sm text-white/70">
        Administrar perfiles
      </button>
    </div>
  );
}

function Intro({ onEnd }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <video
        src={INTRO_VIDEO}
        autoPlay
        muted
        playsInline
        controls
        onEnded={onEnd}
        className="h-full w-full max-h-[85vh] max-w-[95vw] object-contain"
      />
      <button
        onClick={onEnd}
        className="absolute bottom-6 right-6 rounded bg-white/20 px-4 py-2 text-white hover:bg-white/40"
      >
        Saltar intro
      </button>
    </div>
  );
}

function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-black/70 to-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="h-6 w-28 rounded bg-white/90 text-center text-sm font-black tracking-widest text-black">STREAM</div>
        <input placeholder="Buscar" className="rounded bg-white/10 px-3 py-1 text-sm text-white placeholder-white/60 outline-none" />
      </div>
    </div>
  );
}

function Hero({ item, onPlay }: any) {
  return (
    <section className="relative h-[70vh]">
      <img src={item.backdrop} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-10">
        <h1 className="mb-3 text-4xl font-black text-white md:text-6xl">{item.title}</h1>
        <p className="mb-6 max-w-xl text-white/90">{item.description}</p>
        <button onClick={onPlay} className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90">▶ Play</button>
      </div>
    </section>
  );
}

function Row({ title, items, onOpen }: any) {
  return (
    <section className="px-6 py-6">
      <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">{title}</h2>
      <div className="flex gap-3 overflow-x-auto">
        {items.map((it: any) => (
          <div key={it.id} className="w-40 shrink-0 cursor-pointer" onClick={() => onOpen(it)}>
            <img src={it.poster} alt={it.title} className="rounded" />
            <div className="mt-1 truncate text-sm text-white/90">{it.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoModal({ item, onClose }: any) {
  if (!item) return null;
  const isMov = item.videoUrl?.toLowerCase().endsWith('.mov');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
      <div className="relative w-full max-w-3xl rounded bg-neutral-900 p-4">
        <video controls autoPlay playsInline className="w-full">
          <source src={item.videoUrl} type={isMov ? 'video/quicktime' : 'video/mp4'} />
        </video>
        <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
        <p className="text-sm text-white/80">{item.description}</p>
        <button onClick={onClose} className="absolute right-3 top-3 rounded bg-white/20 px-2 py-1 text-white">✕</button>
      </div>
    </div>
  );
}

export default function Page() {
  const [stage, setStage] = useState<'intro' | 'profiles' | 'home'>('intro');
  const [current, setCurrent] = useState<any>(null);

  const hero = MOVIES[0];

  if (stage === 'intro') return <Intro onEnd={() => setStage('profiles')} />;

  if (stage === 'profiles')
    return (
      <ProfilesScreen
        onChoose={(p: any) => (p.allowed ? setStage('home') : alert("Ese perfil no tiene contenido. Entra con 'Adult Pablo'"))}
      />
    );

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main className="pt-16">
        <Hero item={hero} onPlay={() => setCurrent(hero)} />
        <Row title="Mi lista" items={MOVIES} onOpen={(it: any) => setCurrent(it)} />
      </main>
      <VideoModal item={current} onClose={() => setCurrent(null)} />
    </div>
  );
}
