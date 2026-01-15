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

export const IconExternalLink = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M19 3h-8v2h8v8h2V3h-2zM3 3h2v2H3V3zm2 2h2v2H5V5zm2 2h2v2H7V7zm2 2h2v2H9V9zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2zM3 21h14v-2H3v2zm0-2v-2h2v2H3zm2-2v-2h2v2H5z" fill="currentColor" />
    </svg>
);

export const IconCheck = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M20 6h-2v2h-2v2h-2v2h-2v2H8v-2H6v-2H4v-2H2v6h2v-2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2V6h-2z" fill="currentColor" />
    </svg>
);

export const IconClock = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M2 11h20v2H2v-2zm18-7h2v5h-2V4zm-4-2h2v2h-2V2zM8 2h2v2H8V2zM4 4h2v5H4V4zm9 5h2v6h-2V9zm-4 4h2v2H9v-2z" fill="currentColor" />
        {/* Simple pixel clock hand representation */}
    </svg>
);

export const IconBag = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M8 2h8v4h-2V4h-4v2H8V2zM4 6h16v14H4V6zm2 2v10h12V8H6z" fill="currentColor" />
    </svg>
);

export const IconStar = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path fill="currentColor" fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
);

export const IconChevronDown = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M4 8h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8H4z" fill="currentColor" />
    </svg>
);

export const IconChevronUp = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M4 16h2v-2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v2H4z" fill="currentColor" />
    </svg>
);

export const IconUser = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" fill="currentColor" />
    </svg>
);

export const IconX = (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
    </svg>
);
