import { useEffect, useState } from "react";

interface LoadingWrapperProps {
  isLoading?: boolean; // Make optional since internal loading is handled too
  children: React.ReactNode;
}

export const LoadingWrapper = ({
  isLoading,
  children,
}: LoadingWrapperProps) => {
  const [internalLoading, setInternalLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInternalLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const showLoader = isLoading ?? internalLoading;

  if (showLoader) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7300]"></div>
      </div>
    );
  }

  return <>{children}</>;
};
