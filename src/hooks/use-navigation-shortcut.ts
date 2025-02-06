import { useEffect } from 'react'
import { useNavigationStore } from '@/store/use-navigation-store'

export const useNavigationShortcut = () => {
  const toggleNavigationMode = useNavigationStore((state) => state.toggleNavigationMode)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + S pour "Switch Navigation"
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'N') {
        event.preventDefault()
        toggleNavigationMode()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleNavigationMode])
}
