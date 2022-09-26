import React from 'react';

export function StreamIcon() {
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 16 16'
      version='1.1'
      xmlSpace='preserve'
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinejoin: 'round',
        strokeMiterlimit: 2
      }}
    >
      <rect
        id='svgGrid'
        x='0'
        y='0'
        width='16'
        height='16'
        style={{ fill: 'none' }}
      />
      <g id='stream-icon'>
        <circle id='stream-icon-center' cx='8' cy='8' r='2' />
        <path
          id='stream-icon-outer'
          d='M13.656,2.344C15.104,3.792 16,5.792 16,8C16,10.208 15.104,12.208 13.656,13.656L12.242,12.242C13.328,11.156 14,9.656 14,8C14,6.344 13.328,4.844 12.242,3.758L13.656,2.344ZM2.344,2.344L3.758,3.758C2.672,4.844 2,6.344 2,8C2,9.656 2.672,11.156 3.758,12.242L2.344,13.656C0.896,12.208 0,10.208 0,8C0,5.792 0.896,3.792 2.344,2.344Z'
        />
        <path
          id='stream-icon-inner'
          d='M11.535,4.465C12.44,5.37 13,6.62 13,8C13,9.38 12.44,10.63 11.535,11.535L10.121,10.121C10.664,9.578 11,8.828 11,8C11,7.172 10.664,6.422 10.121,5.879L11.535,4.465ZM4.465,4.465L5.879,5.879C5.336,6.422 5,7.172 5,8C5,8.828 5.336,9.578 5.879,10.121L4.465,11.535C3.56,10.63 3,9.38 3,8C3,6.62 3.56,5.37 4.465,4.465Z'
        />
      </g>
    </svg>
  );
}
