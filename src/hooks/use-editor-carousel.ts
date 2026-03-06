'use client';

import { useState, useEffect, useCallback } from 'react';
import { useEditor } from '@/components/EditorWrapper';

interface UseEditorCarouselOptions {
  totalSlides: number;
  intervalMs?: number;
}

export function useEditorCarousel({ totalSlides, intervalMs = 5000 }: UseEditorCarouselOptions) {
  const { editorMode } = useEditor();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (editorMode || totalSlides === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [editorMode, totalSlides, intervalMs]);

  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    isAutoAdvancing: !editorMode,
    editorMode,
  };
}
