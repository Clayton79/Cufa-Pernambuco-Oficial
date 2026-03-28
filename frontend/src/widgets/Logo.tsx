import { clsx } from 'clsx';

interface LogoProps {
  collapsed?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ collapsed = false, className, variant = 'light' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-foreground';
  const subColor = variant === 'light' ? 'text-primary-300' : 'text-muted';

  return (
    <div className={clsx('flex items-center gap-3', collapsed && 'justify-center', className)}>
      <img
        src={`${import.meta.env.BASE_URL}CUFA%20PE.jpg`}
        alt="CUFA Pernambuco"
        className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
      />
      {!collapsed && (
        <div>
          <h1 className={clsx('text-sm font-bold leading-tight', textColor)}>CUFA Pernambuco</h1>
          <p className={clsx('text-[10px] tracking-wider uppercase', subColor)}>
            Central das Favelas
          </p>
        </div>
      )}
    </div>
  );
}
