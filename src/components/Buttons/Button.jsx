import './Button.css';

export default function Button({
  children,
  type = 'primary',
  active,
  ...props
}) {
  return (
    <button
      className={`button ${active && 'button-active'} button-${type}`}
      {...props}
    >
      {children}
    </button>
  );
}
