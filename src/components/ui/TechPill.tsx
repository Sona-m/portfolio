interface TechPillProps {
  label: string;
}

const TechPill: React.FC<TechPillProps> = ({ label }) => (
  <span className="tech-pill">{label}</span>
);

export default TechPill;
