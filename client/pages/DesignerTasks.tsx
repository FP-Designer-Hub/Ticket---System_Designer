import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { DesignerTasksSection } from "@/components/DesignerTasksSection";
import { getDesigners, Task } from "@/utils/mockData";

export default function DesignerTasks() {
  const [designers] = useState(getDesigners());
  const [filter, setFilter] = useState<
    "all" | "available" | "limited" | "booked"
  >("all");

  const filteredDesigners = designers.filter((designer) => {
    if (filter === "all") return true;
    return designer.status === filter;
  });

  const handleTaskStatusChange = (
    taskId: string,
    newStatus: Task["status"],
  ) => {
    console.log(`Task ${taskId} status changed to ${newStatus}`);
    // In a real app, this would trigger an API call to update the task
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Designer Tasks
          </h1>
          <p className="text-gray-600">
            View and manage tasks assigned to each designer on your team. Track
            workload, progress, and availability at a glance.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              filter === "all"
                ? "bg-[#5B5FC7] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Designers
          </button>
          <button
            onClick={() => setFilter("available")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              filter === "available"
                ? "bg-green-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setFilter("limited")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              filter === "limited"
                ? "bg-amber-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Limited Capacity
          </button>
          <button
            onClick={() => setFilter("booked")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              filter === "booked"
                ? "bg-red-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Fully Booked
          </button>
        </div>

        {/* Designer Tasks Sections */}
        <div className="space-y-8">
          {filteredDesigners.length === 0 ? (
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
                  d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zM5 20a4 4 0 014-4h6a4 4 0 014 4v2H5v-2z"
                />
              </svg>
              <p className="text-gray-500 font-medium mb-1">
                No designers found
              </p>
              <p className="text-gray-400 text-sm">
                Try adjusting your filters to see designer task assignments
              </p>
            </div>
          ) : (
            filteredDesigners.map((designer) => (
              <DesignerTasksSection
                key={designer.id}
                designer={designer}
                onTaskStatusChange={handleTaskStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
