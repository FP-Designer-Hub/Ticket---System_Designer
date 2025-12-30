import { getTasks } from "@/utils/mockData";

export function LiveTasksMetrics() {
  const tasks = getTasks();

  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const openTasks = tasks.filter((t) => t.status === "open");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const averageProgress =
    inProgressTasks.length > 0
      ? Math.round(
          inProgressTasks.reduce((sum) => sum + 45, 0) / inProgressTasks.length,
        )
      : 0;

  const urgentTasks = inProgressTasks.filter((task) => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  }).length;

  const completionRate =
    tasks.length > 0
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0;

  const metrics = [
    {
      label: "Tasks In Progress",
      value: inProgressTasks.length,
      change: "+2 this week",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      icon: "⚡",
    },
    {
      label: "Urgent Tasks",
      value: urgentTasks,
      change: `Due in next 3 days`,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      icon: "🔴",
    },
    {
      label: "Avg. Progress",
      value: `${averageProgress}%`,
      change: "+5% from yesterday",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      icon: "📊",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      change: `${completedTasks.length} tasks completed`,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      icon: "✅",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`rounded-lg border-2 p-6 ${metric.bgColor} ${metric.borderColor} transition-all hover:shadow-md`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                {metric.label}
              </p>
              <p className={`text-3xl font-bold ${metric.textColor}`}>
                {metric.value}
              </p>
            </div>
            <span className="text-2xl">{metric.icon}</span>
          </div>
          <p className="text-xs text-gray-600">{metric.change}</p>
        </div>
      ))}
    </div>
  );
}
