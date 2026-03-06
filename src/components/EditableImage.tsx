'use client';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useEditor } from '@/components/EditorWrapper';

// ─── Catalogue images ────────────────────────────────────────
const IMAGE_GALLERY = [
  { category: 'Hero', images: ['/image/selecta/hero/hero-01-collage.jpg','/image/selecta/hero/hero-01.jpg','/image/selecta/hero/hero-02.jpg','/image/selecta/hero/hero-03.jpg','/image/selecta/hero/hero-04.jpg','/image/selecta/hero/hero-05.jpg','/image/selecta/hero/hero-06.png','/image/selecta/hero/hero-07.png'] },
  { category: 'Savoir-faire', images: ['/image/selecta/savoir-faire/sf-packaging.png','/image/selecta/savoir-faire/sf-plv.png','/image/selecta/savoir-faire/sf-print.png','/image/selecta/savoir-faire/sf-studio.jpg'] },
  { category: 'Vitrine', images: ['/image/selecta/vitrine/vitrine-ilv-01.jpg','/image/selecta/vitrine/vitrine-ilv-02.jpg','/image/selecta/vitrine/vitrine-packaging-01.jpg','/image/selecta/vitrine/vitrine-packaging-02.jpg','/image/selecta/vitrine/vitrine-packaging-03.jpg','/image/selecta/vitrine/vitrine-packaging-04.jpg','/image/selecta/vitrine/vitrine-plv-comptoir-01.jpg','/image/selecta/vitrine/vitrine-plv-comptoir-02.jpg','/image/selecta/vitrine/vitrine-plv-comptoir-03.jpg','/image/selecta/vitrine/vitrine-plv-lineaire-01.jpg','/image/selecta/vitrine/vitrine-plv-sol-01.jpg','/image/selecta/vitrine/vitrine-plv-sol-02.jpg'] },
  { category: 'Réalisations', images: ['/image/realisations/realisations-01.webp','/image/realisations/realisations-02.webp','/image/realisations/realisations-03.webp','/image/realisations/realisations-04.webp'] },
  { category: 'Divers', images: ['/image/slider-live-kraft/kraft-gamme-01.jpg','/image/slider-live-kraft/kraft-gamme-02.jpg','/image/slider-live-kraft/kraft-gamme-03.jpg','/image/003ab1236756873.68f226d5e8204.webp','/image/2a5c5c211072581.671be4b87df2e.webp','/image/950e4c236909363.68f623758ca51 copy.webp'] },
  { category: 'Logos', images: ['/image/selecta/logo/logo-A.png','/image/selecta/logo/logo-B.png','/image/selecta/logo/logo-C.png','/image/selecta/logo/logo-X.png','/image/selecta/logo/logo-blanc-transparent.png','/image/selecta/logo/logo-final.png','/image/selecta/logo/logo-navy-transparent.png','/image/selecta/logo/logo-original-transparent.png','/image/selecta/logo/logo-transparent.png','/image/selecta/logo/logo-white-v2.jpg','/image/selecta/logo/logo-white-v3.jpg'] },
];

interface EditableImageProps {
  editorKey: string; src: string; alt: string;
  fill?: boolean; className?: string;
  width?: number; height?: number; priority?: boolean; sizes?: string;
  compact?: boolean; // désactive le panneau de contrôles (pour logo, petites images)
}

function resizeImage(file: File, maxWidth: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width; let h = img.height;
        if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('no ctx'));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ImgThumb({ src, label, onClick }: { src: string; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ border: '2px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', background: '#f9fafb', padding: 0, transition: 'border-color 0.15s, transform 0.15s' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#000B58'; e.currentTarget.style.transform = 'scale(1.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'scale(1)'; }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} loading="lazy" />
      </div>
      <div style={{ padding: '4px 6px', fontSize: '10px', color: '#666', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</div>
    </button>
  );
}

function MediaTab({ onSelect }: { onSelect: (url: string) => void }) {
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [dirs, setDirs] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const currentPath = breadcrumb.join('/');
  useEffect(() => {
    setLoading(true);
    fetch(`/api/media?dir=${encodeURIComponent(currentPath)}`).then(r => r.json()).then(d => { setDirs(d.dirs ?? []); setFiles(d.files ?? []); }).catch(() => { setDirs([]); setFiles([]); }).finally(() => setLoading(false));
  }, [currentPath]);
  const enter = (n: string) => setBreadcrumb(p => [...p, n]);
  const goTo  = (i: number) => setBreadcrumb(p => p.slice(0, i));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => goTo(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000B58', fontWeight: 600, padding: '2px 4px' }}>Media</button>
        {breadcrumb.map((s, i) => <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: '#aaa' }}>/</span><button onClick={() => goTo(i+1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: i === breadcrumb.length-1 ? '#374151' : '#000B58', fontWeight: 600, padding: '2px 4px' }}>{s}</button></span>)}
      </div>
      {loading && <div style={{ color: '#888', fontSize: '13px' }}>Chargement…</div>}
      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
          {dirs.map(d => <button key={d} onClick={() => enter(d)} style={{ border: '2px solid #e5e7eb', borderRadius: '10px', padding: '12px 8px', cursor: 'pointer', background: '#f0f4ff', fontWeight: 600, fontSize: '12px', color: '#000B58', textAlign: 'center', transition: 'border-color 0.15s' }} onMouseEnter={e => (e.currentTarget.style.borderColor = '#000B58')} onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}>📁 {d}</button>)}
          {files.map(f => { const p = currentPath ? `${currentPath}/${f}` : f; const url = `/api/media/serve?path=${encodeURIComponent(p)}`; return <ImgThumb key={f} src={url} label={f} onClick={() => onSelect(url)} />; })}
          {dirs.length === 0 && files.length === 0 && <div style={{ color: '#888', fontSize: '13px', gridColumn: '1/-1' }}>Dossier vide</div>}
        </div>
      )}
    </div>
  );
}

const MEDIA_TAB_IDX = IMAGE_GALLERY.length;

function ImageGalleryModal({ onSelect, onClose, onUpload }: { onSelect: (p: string) => void; onClose: () => void; onUpload: () => void }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100000, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '80px 24px 40px', overflowY: 'auto' }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#fff', borderRadius: '16px', width: '100%', maxWidth: '960px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#000B58' }}>Galerie d&apos;images</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666', lineHeight: 1 }}>&times;</button>
        </div>
        <div style={{ display: 'flex', gap: '4px', padding: '8px 20px', borderBottom: '1px solid #e5e7eb', overflowX: 'auto', flexShrink: 0 }}>
          {IMAGE_GALLERY.map((cat, idx) => <button key={cat.category} onClick={() => setActiveTab(idx)} style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', backgroundColor: activeTab === idx ? '#000B58' : '#f3f4f6', color: activeTab === idx ? '#fff' : '#374151', transition: 'all 0.15s' }}>{cat.category} ({cat.images.length})</button>)}
          <button onClick={() => setActiveTab(MEDIA_TAB_IDX)} style={{ padding: '6px 14px', borderRadius: '8px', border: activeTab === MEDIA_TAB_IDX ? 'none' : '1px dashed #000B58', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', backgroundColor: activeTab === MEDIA_TAB_IDX ? '#000B58' : 'transparent', color: activeTab === MEDIA_TAB_IDX ? '#fff' : '#000B58', transition: 'all 0.15s' }}>📂 Media Dropbox</button>
        </div>
        <div style={{ overflow: 'auto', padding: '16px 20px', maxHeight: '60vh' }}>
          {activeTab === MEDIA_TAB_IDX ? <MediaTab onSelect={url => { onSelect(url); }} /> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
              {IMAGE_GALLERY[activeTab].images.map(imgPath => <ImgThumb key={imgPath} src={imgPath} label={imgPath.split('/').pop() || imgPath} onClick={() => onSelect(imgPath)} />)}
            </div>
          )}
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onUpload} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #000B58', backgroundColor: 'transparent', color: '#000B58', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Importer un fichier…</button>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#f3f4f6', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────
export function EditableImage({ editorKey, src, alt, fill, className, width, height, priority, sizes, compact }: EditableImageProps) {
  const { editorMode, imageOverrides, setImageOverride, imageTransforms, setImageTransform } = useEditor();
  const inputRef     = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showGallery, setShowGallery] = useState(false);

  // Transform state
  const transform    = (imageTransforms ?? {})[editorKey] ?? { scale: 1, x: 0, y: 0 };
  const hasTransform = transform.scale !== 1 || transform.x !== 0 || transform.y !== 0;

  // Keep a ref to current transform (avoids stale closures in event listeners)
  const transformRef = useRef(transform);
  useLayoutEffect(() => { transformRef.current = transform; }, [transform]);

  // Drag tracking
  const dragRef = useRef<{ startX: number; startY: number; startTx: number; startTy: number; moved: boolean } | null>(null);

  // ── Non-passive wheel listener (zoom) ──────────────────────
  useEffect(() => {
    if (!editorMode || !fill) return;
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const t = transformRef.current;
      // Normalise selon deltaMode : 0=pixel, 1=line(×30), 2=page(×300)
      const raw = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaMode === 2 ? e.deltaY * 300 : e.deltaY;
      const delta = -raw * 0.002;
      const newScale = Math.max(1, Math.min(4, t.scale + delta));
      const next = { scale: newScale, x: newScale <= 1 ? 0 : t.x, y: newScale <= 1 ? 0 : t.y };
      transformRef.current = next;
      setImageTransform(editorKey, next);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [editorMode, fill, editorKey, setImageTransform]);

  // ── Pointer events (pan + click detection) ────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!editorMode) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, startTx: transform.x, startTy: transform.y, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || !fill) return;
    const hasMoved = Math.abs(e.clientX - d.startX) > 4 || Math.abs(e.clientY - d.startY) > 4;
    if (!hasMoved) return;
    d.moved = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const t = transformRef.current;
    const nx = d.startTx - (e.clientX - d.startX) / rect.width  * 100 / Math.max(1, t.scale);
    const ny = d.startTy - (e.clientY - d.startY) / rect.height * 100 / Math.max(1, t.scale);
    setImageTransform(editorKey, { ...t, x: Math.max(-50, Math.min(50, nx)), y: Math.max(-50, Math.min(50, ny)) });
  };
  const onPointerUp = () => {
    const d = dragRef.current;
    dragRef.current = null;
    if (d && !d.moved && editorMode) setShowGallery(true);  // click = gallery
  };

  // ── File upload ───────────────────────────────────────────
  const handleGallerySelect = (path: string) => { setImageOverride(editorKey, path); setShowGallery(false); };
  const handleFileUpload    = () => { setShowGallery(false); inputRef.current?.click(); };
  const handleFileChange    = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { setImageOverride(editorKey, await resizeImage(file, 1920, 0.85)); } catch (err) { console.error(err); }
    e.target.value = '';
  };

  // ── Object-fit override ───────────────────────────────────
  const fitKey = `${editorKey}__fit`;
  const fitOverride = ((imageTransforms ?? {})[fitKey] as any)?.fit as 'cover' | 'contain' | undefined;
  const objectFit = fitOverride ?? 'cover';
  const toggleFit = () => {
    const next = objectFit === 'cover' ? 'contain' : 'cover';
    setImageTransform(fitKey, { scale: 1, x: 0, y: 0, fit: next } as any);
  };

  // ── Image style (zoom + pan) ──────────────────────────────
  const imgStyle: React.CSSProperties = (editorMode || hasTransform) ? {
    objectFit: objectFit,
    objectPosition: `${50 + transform.x}% ${50 + transform.y}%`,
    transform: transform.scale !== 1 ? `scale(${transform.scale})` : undefined,
    transformOrigin: 'center',
    transition: dragRef.current ? 'none' : 'transform 0.1s ease, object-position 0.1s ease',
  } : {};

  const override   = imageOverrides[editorKey];
  const displaySrc = override || src;
  const isDataUrl  = override?.startsWith('data:');

  const wrapperStyle: React.CSSProperties = {
    ...(fill ? { position: 'relative', width: '100%', height: '100%', overflow: 'hidden' } : { display: 'inline-block', overflow: 'hidden' }),
    ...(editorMode && fill ? { cursor: hasTransform ? 'move' : 'crosshair' } : {}),
  };

  // ── Zoom badge (visible seulement si transform actif) ─────
  const zoomBadge = editorMode && fill && hasTransform ? (
    <div style={{ position: 'absolute', bottom: '8px', right: '8px', zIndex: 50, display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: '6px', padding: '2px 8px', pointerEvents: 'none' }}>
      <span style={{ color: '#ffd580', fontSize: '10px', fontWeight: 700 }}>{Math.round(transform.scale * 100)}%</span>
    </div>
  ) : null;

  // ── Reset button (double-clic sur le badge) → reset ───────
  // Exposé via un bouton séparé en haut à droite
  const resetBtn = editorMode && fill && hasTransform ? (
    <button
      style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 51, backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '6px', color: '#ffd580', fontSize: '11px', fontWeight: 700, cursor: 'pointer', padding: '2px 7px', backdropFilter: 'blur(4px)' }}
      onPointerDown={e => { e.stopPropagation(); }}
      onClick={e => { e.stopPropagation(); setImageTransform(editorKey, { scale: 1, x: 0, y: 0 }); }}
      title="Réinitialiser zoom/recadrage"
    >↺</button>
  ) : null;

  // ── Panneau options éditeur ───────────────────────────────
  const POSITIONS = [
    { label: '↖', x: -50, y: -50 }, { label: '↑', x: 0, y: -50 }, { label: '↗', x: 50, y: -50 },
    { label: '←', x: -50, y:   0 }, { label: '·', x: 0, y:   0 }, { label: '→', x: 50, y:   0 },
    { label: '↙', x: -50, y:  50 }, { label: '↓', x: 0, y:  50 }, { label: '↘', x: 50, y:  50 },
  ];
  const hint = editorMode && fill && !compact ? (
    <div
      onPointerDown={e => e.stopPropagation()}
      style={{ position: 'absolute', bottom: '8px', left: '8px', zIndex: 52, display: 'flex', flexDirection: 'column', gap: '4px' }}
    >
      {/* Grille position 3×3 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 20px)', gap: '2px', backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: '7px', padding: '5px', backdropFilter: 'blur(4px)' }}>
        {POSITIONS.map(pos => {
          const active = Math.round(transform.x) === pos.x && Math.round(transform.y) === pos.y;
          return (
            <button
              key={pos.label}
              title={`Positionner : ${pos.label}`}
              onClick={e => { e.stopPropagation(); setImageTransform(editorKey, { ...transform, x: pos.x, y: pos.y }); }}
              style={{ width: '20px', height: '20px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: active ? '#ffd580' : 'rgba(255,255,255,0.15)', color: active ? '#000B58' : '#fff', transition: 'all 0.1s' }}
            >{pos.label}</button>
          );
        })}
      </div>
      {/* Cover / Contain toggle */}
      <button
        onClick={e => { e.stopPropagation(); toggleFit(); }}
        title="Basculer Cover / Contain"
        style={{ backgroundColor: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '6px', padding: '3px 7px', cursor: 'pointer', backdropFilter: 'blur(4px)', color: objectFit === 'cover' ? '#ffd580' : '#aef', fontSize: '10px', fontWeight: 700, textAlign: 'center' }}
      >
        {objectFit === 'cover' ? '⬛ Cover' : '⬜ Contain'}
      </button>
      {/* Hint zoom */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: '6px', padding: '2px 6px', pointerEvents: 'none' }}>
        <span style={{ color: '#fff', fontSize: '9px', fontWeight: 600 }}>molette=zoom · glisser=recadrer · clic=changer</span>
      </div>
    </div>
  ) : null;

  const commonChildren = (
    <>
      {editorMode && <EditorOverlay />}
      {zoomBadge}
      {resetBtn}
      {hint}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
    </>
  );

  if (isDataUrl) {
    return (
      <>
        <div ref={containerRef} style={wrapperStyle} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={() => { dragRef.current = null; }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={override} alt={alt} className={className}
            style={{ ...(fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : { width, height }), ...imgStyle }}
            width={!fill ? width : undefined} height={!fill ? height : undefined}
          />
          {commonChildren}
        </div>
        {showGallery && typeof document !== 'undefined' && createPortal(<ImageGalleryModal onSelect={handleGallerySelect} onClose={() => setShowGallery(false)} onUpload={handleFileUpload} />, document.body)}
      </>
    );
  }

  return (
    <>
      <div ref={containerRef} style={wrapperStyle} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={() => { dragRef.current = null; }}>
        <Image src={displaySrc} alt={alt} fill={fill} className={className}
          width={!fill ? width : undefined} height={!fill ? height : undefined}
          priority={priority} sizes={sizes} style={imgStyle}
        />
        {commonChildren}
      </div>
      {showGallery && typeof document !== 'undefined' && createPortal(<ImageGalleryModal onSelect={handleGallerySelect} onClose={() => setShowGallery(false)} onUpload={handleFileUpload} />, document.body)}
    </>
  );
}

// ─── Overlay crayon (hover) ──────────────────────────────────
function EditorOverlay() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ position: 'absolute', inset: 0, zIndex: 43, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: hovered ? 'rgba(0,11,88,0.2)' : 'transparent', transition: 'background-color 0.2s', pointerEvents: 'none' }}
    >
      <div style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.2s', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '9999px', padding: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#000B58" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </div>
    </div>
  );
}
