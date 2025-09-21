import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface UploadIconProps {
  size?: number;
  color?: string;
}

export function UploadIcon({ size = 20, color = '#52B788' }: UploadIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Upload arrow */}
      <Path
        d="M12 3L12 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 7L12 3L16 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Base line */}
      <Path
        d="M4 21L20 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Document representation */}
      <Path
        d="M6 21L6 9C6 7.89543 6.89543 7 8 7H10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
}
