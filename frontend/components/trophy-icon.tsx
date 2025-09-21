import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface TrophyIconProps {
  size?: number;
  color?: string;
}

export function TrophyIcon({ size = 24, color = '#CD7F32' }: TrophyIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Trophy base */}
      <Path
        d="M6 20H18V22H6V20Z"
        fill="#8B4513"
      />
      
      {/* Trophy body */}
      <Path
        d="M8 4H16V18H8V4Z"
        fill={color}
        stroke="#8B4513"
        strokeWidth="1"
      />
      
      {/* Trophy handles */}
      <Path
        d="M8 6C6 6 4 8 4 10V12C4 14 6 16 8 16"
        fill="none"
        stroke="#8B4513"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M16 6C18 6 20 8 20 10V12C20 14 18 16 16 16"
        fill="none"
        stroke="#8B4513"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Trophy top */}
      <Path
        d="M6 2H18V4H6V2Z"
        fill="#8B4513"
      />
      
      {/* Trophy center decoration */}
      <Circle
        cx="12"
        cy="10"
        r="2"
        fill="#FFD700"
      />
    </Svg>
  );
}
