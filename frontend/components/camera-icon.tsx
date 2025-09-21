import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface CameraIconProps {
  size?: number;
  color?: string;
}

export function CameraIcon({ size = 20, color = '#52B788' }: CameraIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Camera body */}
      <Path
        d="M2 8C2 6.89543 2.89543 6 4 6H6.5L8 4H16L17.5 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Lens */}
      <Circle
        cx="12"
        cy="13"
        r="3"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
      
      {/* Center dot */}
      <Circle
        cx="12"
        cy="13"
        r="1"
        fill={color}
      />
      
      {/* Flash */}
      <Path
        d="M6 2L6 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
