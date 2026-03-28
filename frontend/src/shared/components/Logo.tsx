export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={`${import.meta.env.BASE_URL}CUFA%20PE.jpg`}
        alt="CUFA Pernambuco"
        className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
      />
      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <span className="text-white font-bold text-sm leading-tight">CUFA Pernambuco</span>
          <span className="text-primary-200 text-[10px] uppercase tracking-[0.15em]">Central das Favelas</span>
        </div>
      )}
    </div>
  );
}
