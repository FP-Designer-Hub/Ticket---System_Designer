import { useState, useMemo } from "react";
import { getAuditLogs, AuditLog } from "@/utils/mockData";

interface AuditLogTableProps {
  searchQuery?: string;
  filterAction?: string;
  filterUser?: string;
}

export function AuditLogTable({
  searchQuery = "",
  filterAction = "",
  filterUser = "",
}: AuditLogTableProps) {
  const logs = getAuditLogs();
  const [sortField, setSortField] = useState<"timestamp" | "action" | "user">(
    "timestamp",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredLogs = useMemo(() => {
    return logs
      .filter((log) => {
        const matchesSearch =
          log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.details.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesAction = !filterAction || log.action === filterAction;
        const matchesUser = !filterUser || log.user === filterUser;

        return matchesSearch && matchesAction && matchesUser;
      })
      .sort((a, b) => {
        let aValue: string | number = a[sortField];
        let bValue: string | number = b[sortField];

        if (aValue < bValue) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
  }, [searchQuery, filterAction, filterUser, sortField, sortOrder]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const getActionIcon = (action: string) => {
    const icons: Record<string, string> = {
      "Task Assigned": "📌",
      "Task Created": "✏️",
      "Status Updated": "🔄",
      "Designer Removed": "❌",
      "Task Completed": "✅",
      "Configuration Changed": "⚙️",
      "User Added": "➕",
      "User Removed": "➖",
    };
    return icons[action] || "📝";
  };

  const getSeverityColor = (action: string) => {
    if (action.includes("Removed") || action.includes("Delete"))
      return "bg-red-50 border-red-200";
    if (action.includes("Created") || action.includes("Added"))
      return "bg-green-50 border-green-200";
    if (action.includes("Updated") || action.includes("Changed"))
      return "bg-blue-50 border-blue-200";
    return "bg-gray-50 border-gray-200";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Stats */}
      <div className="px-8 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Audit Trail</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {filteredLogs.length} of {logs.length} total actions
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            {filteredLogs.length}
          </p>
          <p className="text-xs text-gray-600">Records found</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                <button
                  onClick={() => toggleSort("timestamp")}
                  className="flex items-center gap-2 hover:text-gray-700 transition-colors"
                >
                  Timestamp
                  {sortField === "timestamp" && (
                    <span className="text-xs">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                <button
                  onClick={() => toggleSort("action")}
                  className="flex items-center gap-2 hover:text-gray-700 transition-colors"
                >
                  Action
                  {sortField === "action" && (
                    <span className="text-xs">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                <button
                  onClick={() => toggleSort("user")}
                  className="flex items-center gap-2 hover:text-gray-700 transition-colors"
                >
                  User
                  {sortField === "user" && (
                    <span className="text-xs">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center">
                  <svg
                    className="w-12 h-12 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium">No records found</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Try adjusting your filters or search query
                  </p>
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${getSeverityColor(log.action)}`}
                >
                  <td className="px-8 py-4 text-sm text-gray-600 font-mono">
                    {log.timestamp}
                  </td>
                  <td className="px-8 py-4 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">
                        {getActionIcon(log.action)}
                      </span>
                      <span className="font-medium text-gray-900">
                        {log.action}
                      </span>
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                      {log.user}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-700">
                    {log.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination / Footer */}
      <div className="px-8 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <p className="text-xs text-gray-600">
          Showing <span className="font-semibold">{filteredLogs.length}</span>{" "}
          of <span className="font-semibold">{logs.length}</span> audit logs
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50">
            ← Previous
          </button>
          <span className="text-sm text-gray-600">Page 1</span>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
