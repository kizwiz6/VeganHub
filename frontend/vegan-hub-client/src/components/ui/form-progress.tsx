interface FormProgressProps {
    progress: number;
  }

  export function FormProgress({ progress }: FormProgressProps) {
    return (
      <div className="space-y-2">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 text-center">
          {progress === 100 ? 'All set! Ready to submit.' : `${progress}% complete`}
        </p>
      </div>
    );
  }