import React from 'react';
import { BlockButton } from './components';

interface HeadingButtonProps {
  level: 1 | 2 | 3 | 4;
  className?: string;
}

const mapLevelToIcon = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
};

const HeadingButton: React.FC<HeadingButtonProps> = ({ level, className }) => {
  return (
    <BlockButton
      format={`heading-${mapLevelToIcon[level]}`}
      icon={`looks_${mapLevelToIcon[level]}`}
      className={className}
    >
        <span
          style={{
            fontFamily: "serif",
            fontWeight: "bold",
            fontSize: "1.3rem",
          }}>
            H
        </span>
        <span style={{ fontFamily: "serif", fontSize: "0.9rem" }}>{level}</span>
    </BlockButton>
  );
};

export default HeadingButton;
