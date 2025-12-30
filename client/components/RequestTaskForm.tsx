import { useState } from "react";
import { getDesigners } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RequestTaskFormProps {
  onSubmit?: (data: FormData) => void;
}

export interface FormData {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  preferredDesigner: string;
}

export function RequestTaskForm({ onSubmit }: RequestTaskFormProps) {
  const designers = getDesigners();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    preferredDesigner: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.dueDate) {
      onSubmit?.(formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          dueDate: "",
          preferredDesigner: "",
        });
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-8"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Task Title *
          </label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Create new landing page design"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B5FC7]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the task requirements, design details, and any specific notes..."
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B5FC7] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Priority *
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B5FC7]"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Due Date *
            </label>
            <Input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B5FC7]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Preferred Designer
            </label>
            <select
              name="preferredDesigner"
              value={formData.preferredDesigner}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B5FC7]"
            >
              <option value="">Any Available</option>
              {designers.map((designer) => (
                <option key={designer.id} value={designer.id}>
                  {designer.name} ({designer.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="px-6 py-2 bg-[#5B5FC7] text-white rounded-lg font-medium hover:bg-[#4845a3]"
          >
            Submit Task Request
          </Button>
          <Button
            type="reset"
            className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300"
          >
            Clear
          </Button>
        </div>

        {submitted && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-medium text-green-800">
              Task request submitted successfully!
            </span>
          </div>
        )}
      </div>
    </form>
  );
}
