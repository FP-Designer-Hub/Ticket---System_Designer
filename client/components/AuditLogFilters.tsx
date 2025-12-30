import { getAuditLogs } from "@/utils/mockData";
import { Input } from "@/components/ui/input";

interface AuditLogFiltersProps {
  onSearchChange?: (query: string) => void;
  onActionChange?: (action: string) => void;
  onUserChange?: (user: string) => void;
  onDateRangeChange?: (range: "today" | "week" | "month" | "all") => void;
}

export function AuditLogFilters({
  onSearchChange,
  onActionChange,
  onUserChange,
  onDateRangeChange,
}: AuditLogFiltersProps) {
  const logs = getAuditLogs();

  // Extract unique values
  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)));
  const uniqueUsers = Array.from(new Set(logs.map((log) => log.user)));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
      {/* Search Box */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Search
        </label>
        <Input
          type="text"
          placeholder="Search by action, user, or details..."
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B5FC7]"
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Action Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Action Type
          </label>
          <select
            onChange={(e) => onActionChange?.(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B5FC7] text-sm"
          >
            <option value="">All Actions</option>
            {uniqueActions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>

        {/* User Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            User
          </label>
          <select
            onChange={(e) => onUserChange?.(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B5FC7] text-sm"
          >
            <option value="">All Users</option>
            {uniqueUsers.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Time Period
          </label>
          <select
            onChange={(e) => onDateRangeChange?.(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B5FC7] text-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Quick Filters
        </label>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
            Critical Changes
          </button>
          <button className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
            Removals
          </button>
          <button className="px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
            New Additions
          </button>
          <button className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Reset Filters
          </button>
        </div>
      </div>

      {/* Filter Info */}
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">💡 Tip:</span> Use multiple filters
          together for more precise audit trail searches. All actions are logged
          with timestamps for compliance tracking.
        </p>
      </div>
    </div>
  );
}
