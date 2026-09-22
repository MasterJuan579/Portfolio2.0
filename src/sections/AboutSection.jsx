import React from 'react'
import SectionHeading from './SectionHeading'

// TODO: reemplazar los textos de abajo con tu contenido real.
const AboutSection = () => (
  <section>
    <SectionHeading>About</SectionHeading>

    <p className="text-lg leading-relaxed text-[color:var(--text-muted)] mb-6">
      Placeholder: tu presentacion en un parrafo. Quien eres, que construyes y
      que buscas.
    </p>

    <p className="text-lg leading-relaxed text-[color:var(--text-muted)] mb-10">
      Placeholder: un segundo parrafo con contexto - formacion, en que estas
      trabajando ahora, o que te interesa.
    </p>

    <h2 className="text-sm uppercase tracking-[0.3em] text-[color:var(--accent)] mb-4">
      Stack
    </h2>
    <ul className="flex flex-wrap gap-3">
      {['React', 'Three.js', 'JavaScript', 'Tailwind', 'Blender'].map((item) => (
        <li
          key={item}
          className="border border-[color:var(--border)] rounded-full px-4 py-1 text-sm text-[color:var(--text-muted)]"
        >
          {item}
        </li>
      ))}
    </ul>
  </section>
)

export default AboutSection
