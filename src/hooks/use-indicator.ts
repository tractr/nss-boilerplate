'use client';

import { useTranslations } from 'next-intl';
// Inspired by react-hot-toast library
import * as React from 'react';

export type IndicatorLevel = 0 | 1 | 2 | 3 | 4 | 5;
export type IndicatorValue = number;

export interface IndicatorProperties {
  title: string;
  label: string;
  color: string;
  imageUrl: string;
  bgImageLeftUrl: string;
  bgImageRightUrl: string;
  bgImagePatternUrl: string;
}

export const indicatorColorClasses = {
  noData: 'bg-indicator-noData',
  bad: 'bg-indicator-bad',
  poor: 'bg-indicator-poor',
  average: 'bg-indicator-average',
  good: 'bg-indicator-good',
  excellent: 'bg-indicator-excellent',
  unknown: 'bg-indicator-unknown',
} as const;

export const INDICATOR_COLORS: Record<IndicatorLevel, string> = {
  0: 'noData',
  1: 'bad',
  2: 'poor',
  3: 'average',
  4: 'good',
  5: 'excellent',
} as const;

export function getIndicatorState(level: IndicatorLevel, value?: IndicatorValue): string {
  if (level === 1 && value === 1) return 'noData';
  if (level === 1) return 'bad';
  if (level === 2) return 'poor';
  if (level === 3) return 'average';
  if (level === 4) return 'good';
  if (level === 5) return 'excellent';
  return 'unknown';
}

export function getIndicatorProperties(level: number, value?: number): IndicatorProperties {
  // S'assurer que le niveau est entre 1 et 5
  const normalizedLevel = Math.max(1, Math.min(5, Math.round(level))) as IndicatorLevel;
  const state = getIndicatorState(normalizedLevel, value);

  return {
    title: `indicators.${state}.title`,
    label: `indicators.${state}.label`,
    //color: state === 'noData' ? `${INDICATOR_COLORS[0]}` : `${INDICATOR_COLORS[normalizedLevel]}`,
    color: state,
    imageUrl: `/images/${state}.png`,
    bgImageLeftUrl: `/images/bg-mer-${state}-left.svg`,
    bgImageRightUrl: `/images/bg-mer-${state}-right.svg`,
    bgImagePatternUrl: `/images/bg-mer-${state}-pattern.svg`,
  };
}

export function useIndicator(
  level: number,
  value?: number
): IndicatorProperties & {
  translatedTitle: string;
  translatedLabel: string;
} {
  const t = useTranslations();
  const properties = React.useMemo(() => getIndicatorProperties(level, value), [level, value]);

  return {
    ...properties,
    translatedTitle: t(properties.title),
    translatedLabel: t(properties.label),
  };
}
