import { MainLayout } from "./MainLayout";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-100 max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-[#5B5FC7] to-[#4845a3] rounded-lg flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
          <p className="text-gray-600 mb-6">{description}</p>
          <p className="text-sm text-gray-500">
            Continue prompting to build this page, or check the dashboard for
            active tasks and designer availability.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
