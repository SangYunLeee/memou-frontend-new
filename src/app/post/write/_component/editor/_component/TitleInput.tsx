'use client'

import { forwardRef } from 'react';

const TitleInput = forwardRef<HTMLInputElement, { className?: string, initialValue?: string }>(
  ({ className, initialValue }, ref) => {
    return (
      <input
        ref={ref}
        className={`${className}`}
        type="text"
        name="title"
        placeholder="제목을 입력하세요"
        onFocus={(event) => {
          event.target.placeholder = '';
        }}
        onBlur={(event) => {
          event.target.placeholder = '제목을 입력하세요';
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
        defaultValue={initialValue}
      />
    );
  }
);

TitleInput.displayName = 'TitleInput';

export default TitleInput;