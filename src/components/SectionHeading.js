/**
 * SectionHeading — Reusable section title with decorative accent line.
 * Used at the top of every major content section.
 *
 * @param {string} title — The main heading text
 * @param {string} subtitle — Optional descriptive subtitle
 */
export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
