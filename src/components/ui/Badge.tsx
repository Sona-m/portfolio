interface BadgeProps {
  variant: string;
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ variant, label }) => (
  <span className={`badge badge--${variant}`}>{label}</span>
);

export default Badge;
