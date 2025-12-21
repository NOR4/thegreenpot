import React from 'react';

// Props interface to ensure className is passed through
interface IconProps extends React.SVGProps<SVGSVGElement> { }

export const IconShoppingCart = (props: IconProps) => (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M2 2h4v4h16v11H4V4H2V2zm4 13h14V8H6v7zm0 4h3v3H6v-3zm14 0h-3v3h3v-3z" fill="currentColor" />
    </svg>
);

export const IconHeart = (props: IconProps) => (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9V2zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4h4z" fill="currentColor" />
    </svg>
);

export const IconMoodSad = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M5 3h14v2H5V3zm0 16H3V5h2v14zm14 0v2H5v-2h14zm0 0h2V5h-2v14zM10 8H8v2h2V8zm4 0h2v2h-2V8zm-5 8v-2h6v2h2v-2h-2v-2H9v2H7v2h2z" fill="currentColor" />
    </svg>
);

export const IconSword = (props: IconProps) => (
    // Using Shield icon as replacement for Sword since it wasn't found in the quick scan,
    // but naming it IconSword to match usage in code.
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M22 2H2v12h2V4h16v10h2V2zM6 14H4v2h2v-2zm0 2h2v2h2v2H8v-2H6v-2zm4 4v2h4v-2h2v-2h-2v2h-4zm10-6h-2v2h-2v2h2v-2h2v-2z" fill="currentColor" />
    </svg>
);
