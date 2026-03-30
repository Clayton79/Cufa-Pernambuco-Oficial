import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ text = 'Carregando...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3" role="status" aria-live="polite">
      <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner />
    </div>
  );
}
