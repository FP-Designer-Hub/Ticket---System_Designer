interface AvailabilityPillProps {
  status: "available" | "limited" | "booked";
}

export function AvailabilityPill({ status }: AvailabilityPillProps) {
  const statusConfig = {
    available: {
      label: "Available",
      bgColor: "bg-[#34D399]",
      textColor: "text-[#065F46]",
    },
    limited: {
      label: "Limited",
      bgColor: "bg-[#FBBF24]",
      textColor: "text-[#78350F]",
    },
    booked: {
      label: "Fully Booked",
      bgColor: "bg-[#F472B6]",
      textColor: "text-[#831843]",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}
    >
      {config.label}
    </span>
  );
}
