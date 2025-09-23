'use client';
import { ButtonHTMLAttributes } from 'react';
import { useBackGuard } from '@/app/_providers/BackGuardProvider';

export function BackButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { goBack } = useBackGuard();
  return (
    <button type="button" onClick={goBack} {...props}>
      ← 뒤로가기
    </button>
  );
}
