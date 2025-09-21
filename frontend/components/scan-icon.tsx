import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface ScanIconProps {
  size?: number;
  color?: string;
}

export function ScanIcon({ size = 16, color = '#52B788' }: ScanIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Modern scanning icon - simplified design */}
      <Circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity={0.8}
      />
      
      {/* Scanning lines */}
      <Path
        d="M4 12L8 12"
        stroke={color}
        strokeWidth="2"
        opacity={0.6}
        strokeLinecap="round"
      />
      <Path
        d="M16 12L20 12"
        stroke={color}
        strokeWidth="2"
        opacity={0.6}
        strokeLinecap="round"
      />
      <Path
        d="M12 4L12 8"
        stroke={color}
        strokeWidth="2"
        opacity={0.6}
        strokeLinecap="round"
      />
      <Path
        d="M12 16L12 20"
        stroke={color}
        strokeWidth="2"
        opacity={0.6}
        strokeLinecap="round"
      />
      
      {/* Center dot */}
      <Circle
        cx="12"
        cy="12"
        r="2"
        fill={color}
        opacity={0.7}
      />
    </Svg>
  );
}
