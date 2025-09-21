import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface MedalIconProps {
  size?: number;
  color?: string;
}

export function MedalIcon({ size = 24, color = '#C0C0C0' }: MedalIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Medal ribbon */}
      <Path
        d="M12 2L10 6L8 2L12 2Z"
        fill="#8B4513"
      />
      
      {/* Medal body */}
      <Circle
        cx="12"
        cy="12"
        r="8"
        fill={color}
        stroke="#8B4513"
        strokeWidth="2"
      />
      
      {/* Medal inner circle */}
      <Circle
        cx="12"
        cy="12"
        r="5"
        fill="none"
        stroke="#8B4513"
        strokeWidth="1.5"
      />
      
      {/* Medal center design */}
      <Path
        d="M12 8L14 12L12 16L10 12L12 8Z"
        fill="#8B4513"
      />
    </Svg>
  );
}
