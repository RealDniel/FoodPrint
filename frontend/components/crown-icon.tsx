import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CrownIconProps {
  size?: number;
  color?: string;
}

export function CrownIcon({ size = 24, color = '#FFD700' }: CrownIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Crown base */}
      <Path
        d="M5 16L3 8L7 10L12 6L17 10L21 8L19 16H5Z"
        fill={color}
        stroke="#B8860B"
        strokeWidth="1"
      />
      
      {/* Crown jewels */}
      <Path
        d="M7 10L12 6L17 10"
        fill="none"
        stroke="#FF6B6B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Crown points */}
      <Path
        d="M5 16L7 10L3 8"
        fill="none"
        stroke="#B8860B"
        strokeWidth="1"
      />
      <Path
        d="M19 16L17 10L21 8"
        fill="none"
        stroke="#B8860B"
        strokeWidth="1"
      />
    </Svg>
  );
}
