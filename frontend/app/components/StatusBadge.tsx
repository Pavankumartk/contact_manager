interface StatusBadgeProps {
  status: 'active' | 'inactive'
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      label: 'Active',
      className: 'bg-success/20 text-success'
    },
    inactive: {
      label: 'Inactive',
      className: 'bg-warning/20 text-warning'
    }
  }

  const config = statusConfig[status]

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}
