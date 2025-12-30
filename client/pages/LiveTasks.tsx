import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { LiveTaskCard } from "@/components/LiveTaskCard";
import { TaskActivityFeed } from "@/components/TaskActivityFeed";
import { LiveTasksMetrics } from "@/components/LiveTasksMetrics";
import { getTasks } from "@/utils/mockData";

export default function LiveTasks() {
  const [tasks] = useState(getTasks());
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Live Tasks
            </h1>
            <p className="text-gray-600">
              Monitor real-time updates and progress of tasks in progress across
              your team.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-700">
              {inProgressTasks.length} Live
            </span>
          </div>
        </div>

        {/* Metrics Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Team Performance Metrics
          </h2>
          <LiveTasksMetrics />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Tasks Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                In Progress Tasks
              </h2>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-600">Auto-refresh</span>
              </label>
            </div>

            {inProgressTasks.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center border border-gray-100 shadow-sm">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-500 font-medium mb-1">No live tasks</p>
                <p className="text-gray-400 text-sm">
                  All tasks are either open or completed
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inProgressTasks.map((task) => (
                  <LiveTaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>

          {/* Activity Feed Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TaskActivityFeed />
            </div>
          </div>
        </div>

        {/* Team Status Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Real-time Team Status
              </h3>
              <p className="text-gray-700 mb-4">
                All team members are actively working on their tasks. No
                blockers reported.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Team Capacity</p>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-white border-2 border-blue-400"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    3/3 Active
                  </p>
                  <p className="text-xs text-gray-600">Designers online</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600 mb-1">87%</p>
              <p className="text-sm text-gray-600">Team Efficiency</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
