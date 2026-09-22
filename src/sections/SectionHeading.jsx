import React from 'react'

const SectionHeading = ({ children }) => (
  <h1 className="text-4xl lg:text-6xl font-bold uppercase tracking-[0.2em] mb-8">
    <span className="text-[color:var(--accent)]">/</span> {children}
  </h1>
)

export default SectionHeading
