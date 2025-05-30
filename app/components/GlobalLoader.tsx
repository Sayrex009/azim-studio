// components/GlobalLoader.tsx
'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    // fallback if router.events is undefined (App Router)
    // so usePathname instead
    start(); 
    const timeout = setTimeout(end, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
}
