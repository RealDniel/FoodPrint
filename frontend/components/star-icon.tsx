import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface StarIconProps {
  size?: number;
  color?: string;
}

export function StarIcon({ size = 24, color = '#FFD700' }: StarIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Star shape */}
      <Path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={color}
        stroke="#FFA500"
        strokeWidth="1"
      />
      
      {/* Star shine effect */}
      <Path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="none"
        stroke="#FFD700"
        strokeWidth="0.5"
        opacity="0.8"
      />
    </Svg>
  );
}
