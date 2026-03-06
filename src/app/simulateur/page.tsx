'use client';

export default function SimulateurPage() {
  return (
    <div className="fixed left-0 right-0 bottom-0 top-[5.5rem] md:top-[6rem]" style={{ zIndex: 1 }}>
      <iframe
        src="/studio-3d.html"
        className="w-full h-full border-0"
        title="Devis 3D Studio"
        allow="fullscreen"
      />
    </div>
  );
}
