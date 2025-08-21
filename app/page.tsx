'use client'
import { useState } from 'react';

export default function Page() {
  const [ok] = useState(true);
  return (
    <main className="min-h-screen bg-black text-white p-6">
      Hola desde Vercel ✅
    </main>
  );
}
