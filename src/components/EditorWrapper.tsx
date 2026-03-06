'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';

// ─── Types ───────────────────────────────────────────────────
export interface ImageTransform { scale: number; x: number; y: number }

interface EditorContextType {
  editorMode: boolean;
  imageOverrides: Record<string, string>;
  textOverrides: Record<string, string>;
  imageTransforms: Record<string, ImageTransform>;
  heroLayouts: Record<string, number>; // cardWidth per slide key
  toggleEditor: () => void;
  setImageOverride: (key: string, dataURL: string) => void;
  setTextOverride: (key: string, value: string) => void;
  setImageTransform: (key: string, t: ImageTransform) => void;
  setHeroLayout: (key: string, cardWidth: number) => void;
  resetOverrides: () => void;
  resetTextOverrides: () => void;
  resetImageTransforms: () => void;
  resetHeroLayouts: () => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

const IMAGE_STORAGE_KEY     = 'mp-editor-overrides';
const TEXT_STORAGE_KEY      = 'mp-editor-text-overrides';
const TRANSFORM_STORAGE_KEY = 'mp-editor-transforms';
const LAYOUT_STORAGE_KEY    = 'mp-editor-layouts';

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useEditor must be used within EditorWrapper');
  return ctx;
}

// ─── Toggle Button ──────────────────────────────────────────
function EditorToggle() {
  const {
    editorMode, toggleEditor,
    resetOverrides, resetTextOverrides, resetImageTransforms, resetHeroLayouts,
    imageOverrides, textOverrides, imageTransforms, heroLayouts,
  } = useEditor();

  const importRef = useRef<HTMLInputElement>(null);

  const imgCount        = Object.keys(imageOverrides).length;
  const txtCount        = Object.keys(textOverrides).length;
  const transformCount  = Object.keys(imageTransforms).filter(k => {
    const t = imageTransforms[k];
    return t.scale !== 1 || t.x !== 0 || t.y !== 0;
  }).length;
  const layoutCount     = Object.keys(heroLayouts).length;

  // ── Export JSON ────────────────────────────────────────────
  const handleExport = useCallback(() => {
    const payload = {
      exportedAt: new Date().toISOString(),
      imageOverrides,
      textOverrides,
      imageTransforms,
      heroLayouts,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `mp-editor-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [imageOverrides, textOverrides, imageTransforms, heroLayouts]);

  // ── Import JSON ────────────────────────────────────────────
  const handleImportFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string);
          if (parsed.imageOverrides && typeof parsed.imageOverrides === 'object') {
            try { localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(parsed.imageOverrides)); } catch { /* ignore */ }
            window.location.reload();
          }
          if (parsed.textOverrides && typeof parsed.textOverrides === 'object') {
            try { localStorage.setItem(TEXT_STORAGE_KEY, JSON.stringify(parsed.textOverrides)); } catch { /* ignore */ }
          }
          if (parsed.imageTransforms && typeof parsed.imageTransforms === 'object') {
            try { localStorage.setItem(TRANSFORM_STORAGE_KEY, JSON.stringify(parsed.imageTransforms)); } catch { /* ignore */ }
          }
          if (parsed.heroLayouts && typeof parsed.heroLayouts === 'object') {
            try { localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(parsed.heroLayouts)); } catch { /* ignore */ }
          }
        } catch {
          alert('Fichier JSON invalide.');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [],
  );

  const btnBase: React.CSSProperties = {
    padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
    border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', transition: 'opacity 0.15s',
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999, display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: '8px' }}>

      {/* Reset layout */}
      {editorMode && layoutCount > 0 && (
        <button onClick={resetHeroLayouts} style={{ ...btnBase, backgroundColor: '#0891b2', color: '#fff' }}>
          Reset layout ({layoutCount})
        </button>
      )}

      {/* Reset zoom */}
      {editorMode && transformCount > 0 && (
        <button onClick={resetImageTransforms} style={{ ...btnBase, backgroundColor: '#d97706', color: '#fff' }}>
          Reset zoom ({transformCount})
        </button>
      )}

      {/* Reset textes */}
      {editorMode && txtCount > 0 && (
        <button onClick={resetTextOverrides} style={{ ...btnBase, backgroundColor: '#2563eb', color: '#fff' }}>
          Reset textes ({txtCount})
        </button>
      )}

      {/* Reset images */}
      {editorMode && imgCount > 0 && (
        <button onClick={resetOverrides} style={{ ...btnBase, backgroundColor: '#dc2626', color: '#fff' }}>
          Reset images ({imgCount})
        </button>
      )}

      {/* Export / Import */}
      {editorMode && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleExport} style={{ ...btnBase, backgroundColor: '#16a34a', color: '#fff' }}>Exporter</button>
          <button onClick={() => importRef.current?.click()} style={{ ...btnBase, backgroundColor: '#7c3aed', color: '#fff' }}>Importer</button>
          <input ref={importRef} type="file" accept="application/json" style={{ display: 'none' }} onChange={handleImportFile} />
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={toggleEditor}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: editorMode ? '#16a34a' : '#000B58',
          color: '#fff', padding: '12px 20px', borderRadius: '9999px',
          fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)', transition: 'all 0.2s ease',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        {editorMode ? 'MODE ÉDITEUR' : 'Éditeur'}
        {imgCount > 0 && (
          <span style={{ backgroundColor: '#dc2626', color: '#fff', borderRadius: '9999px', padding: '1px 7px', fontSize: '11px', fontWeight: 700, lineHeight: '18px', marginLeft: '2px' }}>
            {imgCount} img
          </span>
        )}
        {txtCount > 0 && (
          <span style={{ backgroundColor: '#2563eb', color: '#fff', borderRadius: '9999px', padding: '1px 7px', fontSize: '11px', fontWeight: 700, lineHeight: '18px', marginLeft: '2px' }}>
            {txtCount} txt
          </span>
        )}
        {transformCount > 0 && (
          <span style={{ backgroundColor: '#d97706', color: '#fff', borderRadius: '9999px', padding: '1px 7px', fontSize: '11px', fontWeight: 700, lineHeight: '18px', marginLeft: '2px' }}>
            {transformCount} zoom
          </span>
        )}
      </button>
    </div>
  );
}

// ─── Wrapper (provider + toggle) ────────────────────────────
export function EditorWrapper({ children }: { children: ReactNode }) {
  const [editorMode, setEditorMode]             = useState(false);
  const [imageOverrides, setImageOverrides]     = useState<Record<string, string>>({});
  const [textOverrides, setTextOverrides]       = useState<Record<string, string>>({});
  const [imageTransforms, setImageTransformsState] = useState<Record<string, ImageTransform>>({});
  const [heroLayouts, setHeroLayoutsState]      = useState<Record<string, number>>({});

  // ── Load from localStorage on mount ───────────────────────
  useEffect(() => {
    try { const s = localStorage.getItem(IMAGE_STORAGE_KEY);     if (s) setImageOverrides(JSON.parse(s));     } catch { /* ignore */ }
    try { const s = localStorage.getItem(TEXT_STORAGE_KEY);      if (s) setTextOverrides(JSON.parse(s));      } catch { /* ignore */ }
    try { const s = localStorage.getItem(TRANSFORM_STORAGE_KEY); if (s) setImageTransformsState(JSON.parse(s)); } catch { /* ignore */ }
    try { const s = localStorage.getItem(LAYOUT_STORAGE_KEY);    if (s) setHeroLayoutsState(JSON.parse(s));    } catch { /* ignore */ }
  }, []);

  // ── Persist imageOverrides ─────────────────────────────────
  useEffect(() => {
    try {
      if (Object.keys(imageOverrides).length > 0) localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(imageOverrides));
      else localStorage.removeItem(IMAGE_STORAGE_KEY);
    } catch { /* ignore */ }
  }, [imageOverrides]);

  // ── Persist textOverrides ──────────────────────────────────
  useEffect(() => {
    try {
      if (Object.keys(textOverrides).length > 0) localStorage.setItem(TEXT_STORAGE_KEY, JSON.stringify(textOverrides));
      else localStorage.removeItem(TEXT_STORAGE_KEY);
    } catch { /* ignore */ }
  }, [textOverrides]);

  // ── Persist imageTransforms ────────────────────────────────
  useEffect(() => {
    try {
      if (Object.keys(imageTransforms).length > 0) localStorage.setItem(TRANSFORM_STORAGE_KEY, JSON.stringify(imageTransforms));
      else localStorage.removeItem(TRANSFORM_STORAGE_KEY);
    } catch { /* ignore */ }
  }, [imageTransforms]);

  // ── Persist heroLayouts ────────────────────────────────────
  useEffect(() => {
    try {
      if (Object.keys(heroLayouts).length > 0) localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(heroLayouts));
      else localStorage.removeItem(LAYOUT_STORAGE_KEY);
    } catch { /* ignore */ }
  }, [heroLayouts]);

  const toggleEditor       = useCallback(() => setEditorMode((p) => !p), []);
  const setImageOverride   = useCallback((key: string, dataURL: string) => setImageOverrides((p) => ({ ...p, [key]: dataURL })), []);
  const setTextOverride    = useCallback((key: string, value: string) => setTextOverrides((p) => ({ ...p, [key]: value })), []);
  const setImageTransform  = useCallback((key: string, t: ImageTransform) => setImageTransformsState((p) => ({ ...p, [key]: t })), []);
  const setHeroLayout      = useCallback((key: string, cardWidth: number) => setHeroLayoutsState((p) => ({ ...p, [key]: cardWidth })), []);
  const resetOverrides     = useCallback(() => setImageOverrides({}), []);
  const resetTextOverrides = useCallback(() => setTextOverrides({}), []);
  const resetImageTransforms = useCallback(() => setImageTransformsState({}), []);
  const resetHeroLayouts   = useCallback(() => setHeroLayoutsState({}), []);

  return (
    <EditorContext.Provider value={{
      editorMode, imageOverrides, textOverrides, imageTransforms, heroLayouts,
      toggleEditor, setImageOverride, setTextOverride, setImageTransform, setHeroLayout,
      resetOverrides, resetTextOverrides, resetImageTransforms, resetHeroLayouts,
    }}>
      {children}
      <EditorToggle />
    </EditorContext.Provider>
  );
}
