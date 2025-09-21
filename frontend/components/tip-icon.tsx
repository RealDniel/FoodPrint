import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TipIconProps {
  size?: number;
  color?: string;
}

export function TipIcon({ size = 20, color = '#52B788' }: TipIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Lightbulb body */}
      <Path
        d="M9 21C9 22.1046 9.89543 23 11 23H13C14.1046 23 15 22.1046 15 21V20H9V21Z"
        fill={color}
        opacity={0.3}
      />
      
      {/* Lightbulb main body */}
      <Path
        d="M12 2C8.68629 2 6 4.68629 6 8C6 10.5 7.5 12.5 9 13.5V16H15V13.5C16.5 12.5 18 10.5 18 8C18 4.68629 15.3137 2 12 2Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Light rays */}
      <Path
        d="M8 8L6 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
      <Path
        d="M16 8L18 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
      <Path
        d="M8 12L6 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
      <Path
        d="M16 12L18 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
}
