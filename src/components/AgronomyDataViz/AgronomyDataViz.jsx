import { useEffect } from 'react'
import { registerAgronomyDataViz } from './registerAgronomyDataViz'

/**
 * Agronomy data-flow visualization (Web Component).
 * Not wired into the main landing page yet — import where you want it, e.g.:
 *   import { AgronomyDataViz } from './components/AgronomyDataViz'
 */
export function AgronomyDataViz() {
  useEffect(() => {
    registerAgronomyDataViz()
  }, [])

  return <agronomy-data-viz />
}
