import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface LeaderboardIconProps {
  size?: number;
  color?: string;
}

export function LeaderboardIcon({ size = 20, color = '#52B788' }: LeaderboardIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Podium base */}
      <Path
        d="M3 20L21 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Third place (left) */}
      <Rect
        x="2"
        y="14"
        width="4"
        height="6"
        fill={color}
        opacity={0.3}
        rx="1"
      />
      
      {/* First place (center) */}
      <Rect
        x="10"
        y="8"
        width="4"
        height="12"
        fill={color}
        opacity={0.8}
        rx="1"
      />
      
      {/* Second place (right) */}
      <Rect
        x="18"
        y="11"
        width="4"
        height="9"
        fill={color}
        opacity={0.5}
        rx="1"
      />
      
      {/* Trophy on first place */}
      <Circle
        cx="12"
        cy="6"
        r="1.5"
        fill={color}
      />
    </Svg>
  );
}
