export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative w-10 h-10">
        <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin">
          <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-gray-800"></div>
        </div>
      </div>
    </div>
  );
} 