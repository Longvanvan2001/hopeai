export function PageHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl text-balance">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground text-pretty">{subtitle}</p>
      )}
    </div>
  )
}
