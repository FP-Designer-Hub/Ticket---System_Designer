import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "@/components/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-100 max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
          <p className="text-lg text-gray-600 mb-6">Page not found</p>
          <p className="text-sm text-gray-500 mb-6">
            The page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-[#5B5FC7] text-white rounded-lg font-medium hover:bg-[#4845a3] transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
