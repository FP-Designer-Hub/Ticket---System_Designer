import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { RequestTaskForm, FormData } from "@/components/RequestTaskForm";
import { createTask } from "@/utils/mockData";
import { ActiveTasksList } from "@/components/ActiveTasksList";
import { DesignerAvailabilityWidget } from "@/components/DesignerAvailabilityWidget";

export default function RequestTask() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSubmit = (data: FormData) => {
    // Persist task to localStorage (org-ready, no backend needed)
    createTask({
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
      preferredDesignerId: data.preferredDesigner || undefined,
    });

    // Trigger a refresh of the active tasks list
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Request Task
          </h1>
          <p className="text-gray-600">
            Create a new design task request and assign it to your team. Check
            designer availability before submitting.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Task Request Form */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                New Task Request
              </h2>
              <RequestTaskForm onSubmit={handleFormSubmit} />
            </div>

            {/* Active Tasks */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Active Tasks
              </h2>
              <ActiveTasksList key={refreshKey} />
            </div>
          </div>

          {/* Right Column - Designer Availability */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <DesignerAvailabilityWidget />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
