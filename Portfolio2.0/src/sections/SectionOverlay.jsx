import React from 'react'
import './SectionOverlay.css'
import { SECTION_COMPONENTS } from './registry'

const PHASE_CLASS = {
  leaving: 'is-entering',
  section: 'is-visible',
  returning: 'is-exiting',
}

const SectionOverlay = ({ phase, sectionId }) => {
  const Section = SECTION_COMPONENTS[sectionId]
  if (!Section) return null

  return (
    <div className={`section-overlay ${PHASE_CLASS[phase] ?? ''}`}>
      <div className="section-overlay__backdrop" />
      <div className="section-overlay__gate">
        {/* La key remonta el contenido al cambiar de seccion y dispara su animacion. */}
        <div
          key={sectionId}
          className="section-overlay__content text-[color:var(--text)] px-8 pt-24 pb-16 lg:pl-40 lg:pr-16 max-w-5xl"
        >
          <Section />
        </div>
      </div>
    </div>
  )
}

export default SectionOverlay
