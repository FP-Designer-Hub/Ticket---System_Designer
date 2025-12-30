import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { AuditLogStats } from "@/components/AuditLogStats";
import { AuditLogFilters } from "@/components/AuditLogFilters";
import { AuditLogTable } from "@/components/AuditLogTable";

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [dateRange, setDateRange] = useState<
    "today" | "week" | "month" | "all"
  >("all");

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Logs</h1>
          <p className="text-gray-600">
            Review administrative actions and system changes with complete audit
            trail. Track all modifications for compliance and security purposes.
          </p>
        </div>

        {/* Admin Badge */}
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <svg
            className="w-5 h-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span className="text-sm font-semibold text-red-700">
            Admin Only • This page is restricted to administrators
          </span>
        </div>

        {/* Metrics Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Audit Summary
          </h2>
          <AuditLogStats />
        </div>

        {/* Filters Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Filter & Search
          </h2>
          <AuditLogFilters
            onSearchChange={setSearchQuery}
            onActionChange={setFilterAction}
            onUserChange={setFilterUser}
            onDateRangeChange={setDateRange}
          />
        </div>

        {/* Audit Logs Table */}
        <div>
          <AuditLogTable
            searchQuery={searchQuery}
            filterAction={filterAction}
            filterUser={filterUser}
          />
        </div>

        {/* Compliance Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 border border-indigo-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Compliance & Security
              </h3>
              <p className="text-gray-700 mb-4">
                All administrative actions are permanently logged for audit
                purposes. Logs are retained for 90 days and can be exported for
                compliance reviews.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> All changes
                  timestamped with user identification
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Complete audit trail
                  for accountability
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Searchable and
                  filterable records
                </li>
              </ul>
            </div>
            <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-50 border border-indigo-200 transition-colors flex-shrink-0">
              Export Logs
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
