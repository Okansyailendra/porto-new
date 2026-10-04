import { useEffect } from 'react'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
]

export function useKonamiCode(onSuccess: () => void) {
  useEffect(() => {
    let index = 0

    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger if user is typing in form/input
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return
      }

      const expectedKey = KONAMI_CODE[index]
      if (e.key.toLowerCase() === expectedKey.toLowerCase()) {
        index++
        if (index === KONAMI_CODE.length) {
          onSuccess()
          index = 0
        }
      } else {
        // Reset if key doesn't match
        index = e.key.toLowerCase() === KONAMI_CODE[0].toLowerCase() ? 1 : 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSuccess])
}
