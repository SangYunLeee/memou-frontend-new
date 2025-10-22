'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { env } from '@/lib/env';

/**
 * Web Vitals 성능 측정 컴포넌트
 *
 * 측정 지표:
 * - LCP (Largest Contentful Paint): 가장 큰 콘텐츠가 화면에 렌더링되는 시간
 * - FID (First Input Delay): 사용자가 처음 상호작용할 때 반응 시간
 * - CLS (Cumulative Layout Shift): 레이아웃 이동 정도
 * - FCP (First Contentful Paint): 첫 콘텐츠가 화면에 표시되는 시간
 * - TTFB (Time to First Byte): 서버로부터 첫 바이트를 받는 시간
 *
 * 성능 기준:
 * - LCP: < 2.5초 (좋음), 2.5~4초 (개선 필요), > 4초 (나쁨)
 * - FID: < 100ms (좋음), 100~300ms (개선 필요), > 300ms (나쁨)
 * - CLS: < 0.1 (좋음), 0.1~0.25 (개선 필요), > 0.25 (나쁨)
 * - FCP: < 1.8초 (좋음), 1.8~3초 (개선 필요), > 3초 (나쁨)
 * - TTFB: < 800ms (좋음), 800~1800ms (개선 필요), > 1800ms (나쁨)
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // 개발 환경에서만 콘솔에 출력
    if (env.NODE_ENV === 'development') {
      const { name, value, rating } = metric;

      // 성능 등급에 따라 색상 변경
      const colors = {
        good: '🟢',
        'needs-improvement': '🟡',
        poor: '🔴',
      };

      const icon = colors[rating as keyof typeof colors] || '⚪';

      // 값 포맷팅 (밀리초 또는 점수)
      const formattedValue = name === 'CLS'
        ? value.toFixed(3)  // CLS는 소수점
        : `${Math.round(value)}ms`; // 나머지는 밀리초

      console.log(
        `${icon} [Web Vitals] ${name}:`,
        formattedValue,
        `(${rating})`
      );

      // 성능이 나쁜 경우 경고
      if (rating === 'poor') {
        console.warn(
          `⚠️ ${name} 성능이 좋지 않습니다. 개선이 필요합니다.`,
          metric
        );
      }
    }

    // 프로덕션에서는 분석 서비스로 전송 가능
    // 예: Google Analytics, Vercel Analytics 등
    // if (env.NODE_ENV === 'production') {
    //   // analytics.send(metric);
    // }
  });

  return null;
}
