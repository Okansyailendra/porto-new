interface TechIconProps {
  id: string
  className?: string
}

export function TechIcon({ id, className = 'w-6 h-6' }: TechIconProps) {
  switch (id) {
    case 'js':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M3 3h18v18H3V3zm13.7 14.5c1.4 0 2.3-.7 2.3-2.1v-.1c0-1.3-.8-1.9-2.1-2.4l-.7-.3c-.8-.3-1.2-.6-1.2-1.1v-.1c0-.5.4-.9 1.1-.9.7 0 1.2.3 1.6.8l1.4-1c-.7-.9-1.6-1.4-3-1.4-1.5 0-2.5.8-2.5 2.1v.1c0 1.2.7 1.8 2 2.3l.7.3c.9.3 1.3.7 1.3 1.2v.1c0 .6-.5 1-1.3 1-.9 0-1.5-.4-2-1.1l-1.4 1c.8 1.1 1.9 1.6 3.3 1.6zm-6.2 0c1.2 0 2.1-.6 2.5-1.5l-1.4-.8c-.3.5-.6.7-1.1.7-.6 0-1.1-.4-1.1-1.3V9.1H7.8v5.5c0 1.8 1.1 2.9 2.7 2.9z" />
        </svg>
      )
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M3 3h18v18H3V3zm7.8 7.3H6.5v1.6h1.7v5.6h1.8v-5.6h1.8v-1.6zm5.8 4.7c.9 0 1.5-.4 2-1l-1.3-1c-.3.4-.6.6-1 .6-.4 0-.8-.2-.8-.6v-.1c0-.4.3-.6.9-.8l.7-.2c1.2-.4 1.7-.9 1.7-1.9v-.1c0-1.2-.9-2-2.3-2-1.2 0-2 .5-2.6 1.3l1.3 1c.3-.4.6-.7 1.1-.7.4 0 .7.2.7.5v.1c0 .4-.3.6-.9.8l-.7.2c-1.2.4-1.7.9-1.7 1.9v.1c0 1.3 1 2 2.6 2z" />
        </svg>
      )
    case 'html':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M4.2 2.5h15.6l-1.4 16-6.4 1.8-6.4-1.8L4.2 2.5zm13.1 4.5H6.7l.3 3.4h9.8l-.4 4.5-4.4 1.2-4.4-1.2-.2-2.3H5.8l.4 4.1 5.8 1.6 5.8-1.6.9-9.7z" />
        </svg>
      )
    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      )
    case 'node':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2.2l8.5 4.9v9.8L12 21.8 3.5 16.9V7.1L12 2.2zm0 2.3L5.5 8.2v7.6L12 19.5l6.5-3.7V8.2L12 4.5zm-2.4 4.2h1.8v5.2c0 .9.5 1.4 1.4 1.4.9 0 1.4-.5 1.4-1.4V8.7h1.8v5.2c0 2-1.2 3-3.2 3s-3.2-1-3.2-3V8.7z" />
        </svg>
      )
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.6 1.8C15 11.8 16.7 13.5 20.4 13.5c3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.6-1.8C17.4 7.7 15.7 6 12 6zM3.6 12C.6 12-1.2 13.5-1.8 16.5c1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.6 1.8C6.6 17.8 8.3 19.5 12 19.5c3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.6-1.8C9 13.7 7.3 12 3.6 12z" transform="scale(0.8) translate(3, 1)" />
        </svg>
      )
    case 'php':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 3C6.5 3 2 7 2 12s4.5 9 10 9 10-4 10-9-4.5-9-10-9zm-4.7 12.3H5.9l1.4-6.6h2.2c1.2 0 2 .6 1.7 1.8-.3 1.2-1.3 1.8-2.3 1.8h-1l-.6 3zm6.2 0h-1.4l.6-2.8h1.8c1.3 0 2.1-.6 2.3-1.8.3-1.2-.4-2-1.7-2h-2.3l-1.4 6.6zm5.8 0h-1.4l1.4-6.6h2.2c1.2 0 2 .6 1.7 1.8-.3 1.2-1.3 1.8-2.3 1.8h-1l-.6 3z" transform="scale(0.8) translate(3, 2)" />
        </svg>
      )
    case 'laravel':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M8.2 3.6l7.6 4.4v8.8L8.2 21.2l-7.6-4.4V8L8.2 3.6zm0 2.3L2.6 9.3v5.4l5.6 3.2 5.6-3.2V9.3L8.2 5.9zm7.6 2.3l5.6 3.2v5.4l-5.6 3.2V8.2z" />
        </svg>
      )
    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 3c-4.4 0-8 1.8-8 4v10c0 2.2 3.6 4 8 4s8-1.8 8-4V7c0-2.2-3.6-4-8-4zm0 2c3.7 0 6.2 1.3 6.4 2.1-.5.7-2.7 1.9-6.4 1.9s-5.9-1.2-6.4-1.9C5.8 6.3 8.3 5 12 5zm6.5 12c0 .8-2.7 2-6.5 2s-6.5-1.2-6.5-2V9.2c1.7 1.1 4.1 1.8 6.5 1.8s4.8-.7 6.5-1.8V17z" />
        </svg>
      )
    case 'python':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M11.9 2c-3.1 0-5 1.2-5 3.3v1.8h5.3v.8H4.6C2.5 7.9 1 9.7 1 12.3c0 2.5 1.5 4.3 3.6 4.3h1.8v-2.3c0-2.2 1.9-4.1 4.1-4.1h5.3V8.4c0-3.3-3.9-6.4-3.9-6.4zm-1.8 2.3a.9.9 0 110 1.8.9.9 0 010-1.8zm2 17.7c3.1 0 5-1.2 5-3.3v-1.8H11.8v-.8h7.6c2.1 0 3.6-1.8 3.6-4.4 0-2.5-1.5-4.3-3.6-4.3h-1.8v2.3c0 2.2-1.9 4.1-4.1 4.1H8.2v1.8c0 3.3 3.9 6.4 3.9 6.4zm1.8-2.3a.9.9 0 110-1.8.9.9 0 010 1.8z" />
        </svg>
      )
    case 'figma':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M8 2a4 4 0 00-4 4 4 4 0 004 4h4V2H8zm8 0h-4v8h4a4 4 0 004-4 4 4 0 00-4-4zM8 10a4 4 0 00-4 4 4 4 0 004 4h4v-8H8zm8 0a4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4zM8 18a4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4v-4H8z" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2A10 10 0 002 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 015.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.5A10 10 0 0012 2z" />
        </svg>
      )
    default:
      return null
  }
}
