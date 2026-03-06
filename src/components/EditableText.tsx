'use client';

import { useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useEditor } from '@/components/EditorWrapper';

// ─── Interface ───────────────────────────────────────────────
export interface EditableTextProps {
  editorKey: string;
  defaultValue: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
}

// Inject keyframes once globally
let keyframesInjected = false;
function injectKeyframes() {
  if (typeof window === 'undefined' || keyframesInjected) return;
  keyframesInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes editablePulse {
      0%,100% { outline-color: rgba(0,11,88,0.3); }
      50%      { outline-color: rgba(0,11,88,0.75); }
    }
  `;
  document.head.appendChild(style);
}

// ─── Composant ───────────────────────────────────────────────
export function EditableText({
  editorKey,
  defaultValue,
  as: Tag = 'span',
  className,
  multiline = false,
}: EditableTextProps) {
  const { editorMode, textOverrides, setTextOverride } = useEditor();
  const ref = useRef<HTMLElement>(null);
  const isFocusedRef = useRef(false);
  const savedValueRef = useRef<string>(defaultValue);

  const currentValue = (textOverrides ?? {})[editorKey] ?? defaultValue;

  // Inject animation CSS once
  useEffect(() => {
    if (editorMode) injectKeyframes();
  }, [editorMode]);

  // Sync DOM : au montage, au passage en mode éditeur, et si valeur change extérieure
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || isFocusedRef.current) return;
    if (el.textContent !== currentValue) el.textContent = currentValue;
  // editorMode déclenche aussi cet effet pour repopuler après switch de mode
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorMode, currentValue]);

  const handleFocus = useCallback(() => {
    isFocusedRef.current = true;
    savedValueRef.current = ref.current?.textContent ?? currentValue;
  }, [currentValue]);

  const handleBlur = useCallback(() => {
    isFocusedRef.current = false;
    const el = ref.current;
    if (!el) return;
    const newValue = (el.textContent ?? '').trim() || savedValueRef.current;
    if (newValue !== savedValueRef.current) {
      setTextOverride(editorKey, newValue);
    }
    el.textContent = newValue;
  }, [editorKey, setTextOverride]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        const el = ref.current;
        if (el) el.textContent = savedValueRef.current;
        isFocusedRef.current = false;
        ref.current?.blur();
      }
      if (!multiline && e.key === 'Enter') {
        e.preventDefault();
        ref.current?.blur();
      }
    },
    [multiline],
  );

  // ── Non-editor mode: plain render ─────────────────────────
  if (!editorMode) {
    return <Tag className={className}>{currentValue}</Tag>;
  }

  // ── Editor mode: contentEditable, content managed via DOM ─
  // No React children → no reconciliation conflict on re-renders.
  return (
    <Tag
      // @ts-expect-error ref typing per tag varies
      ref={ref}
      className={className}
      contentEditable
      suppressContentEditableWarning
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={{
        outline: '2px solid rgba(0,11,88,0.35)',
        outlineOffset: '2px',
        borderRadius: '3px',
        cursor: 'text',
        animation: 'editablePulse 1.8s ease-in-out infinite',
        minWidth: '1ch',
        whiteSpace: multiline ? 'pre-wrap' : undefined,
      }}
    />
  );
}
