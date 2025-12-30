import { getAuditLogs } from "@/utils/mockData";

export function AuditLogStats() {
  const logs = getAuditLogs();

  const actionCounts = logs.reduce(
    (acc, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const totalActions = logs.length;
  const uniqueUsers = new Set(logs.map((log) => log.user)).size;
  const uniqueActions = Object.keys(actionCounts).length;

  const stats = [
    {
      label: "Total Actions",
      value: totalActions,
      change: "Last 24 hours",
      icon: "📊",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      label: "Active Users",
      value: uniqueUsers,
      change: "Unique admins",
      icon: "👥",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
    },
    {
      label: "Action Types",
      value: uniqueActions,
      change: "Different operations",
      icon: "⚙️",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
    },
    {
      label: "Critical Changes",
      value: Math.ceil(totalActions * 0.2),
      change: "System updates",
      icon: "🔒",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-lg border-2 p-6 ${stat.bgColor} ${stat.borderColor} transition-all hover:shadow-md`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <p className="text-xs text-gray-600">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}
