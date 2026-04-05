/**
 * @file PlaceholderPage.tsx
 * @description Mise en page minimale pour les pages « à venir » (titre + texte optionnel).
 */

type PlaceholderPageProps = {
  title: string;
  description?: string;
};

/**
 * @param title - Titre principal affiché en Teko.
 * @param description - Paragraphe optionnel sous le titre.
 * @returns {JSX.Element} Section centrée hauteur partielle.
 */
export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="min-h-[60vh] px-6 pt-28 pb-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          className="mb-4 text-[#d4cfc4]"
          style={{
            fontFamily: "'Teko', sans-serif",
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
          }}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="text-[#8a8777] leading-relaxed"
            style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '15px' }}
          >
            {description}
          </p>
        ) : (
          <p
            className="text-[#8a8777]"
            style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '14px' }}
          >
            Contenu à venir.
          </p>
        )}
      </div>
    </section>
  );
}
