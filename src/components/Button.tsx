import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = ({ variant = 'primary', className, ...rest }: Props) => {
  const base = 'rounded-full px-5 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent/50';
  const variants: Record<Variant, string> = {
    primary: 'bg-gradient-to-r from-neon to-accent text-black shadow-glow',
    secondary: 'border border-white/30 text-white hover:border-white/70',
    ghost: 'text-white/70 hover:text-white',
  };

  return <button className={clsx(base, variants[variant], className)} {...rest} />;
};

export default Button;
