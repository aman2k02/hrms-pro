export default function Card({
  children,
  title,
  subtitle,
  className = "",
}) {
  return (
    <div
      className={`relative rounded-3xl bg-slate-900 
                  border border-slate-800 
                  shadow-xl 
                  hover:shadow-2xl hover:scale-[1.01]
                  transition-all duration-300 
                  p-8 ${className}`}
    >
      {/* Optional subtle gradient glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/5 to-indigo-600/5 pointer-events-none" />

      {/* Header Section (Optional) */}
      {title && (
        <div className="mb-8 relative">
          <h3 className="text-xl font-semibold text-white tracking-wide">
            {title}
          </h3>

          {subtitle && (
            <p className="text-sm text-slate-400 mt-2">
              {subtitle}
            </p>
          )}

          {/* Modern divider */}
          <div className="mt-5 h-px bg-slate-800" />
        </div>
      )}

      <div className="relative">
        {children}
      </div>
    </div>
  );
}