import { Button } from '../common/Button';

export type ServiceType = 'option-1' | 'option-2' | 'option-3' | 'option-4';

interface ServiceTypeFormProps {
  onSubmit: (serviceType: ServiceType) => void;
}

export function ServiceTypeForm({ onSubmit }: ServiceTypeFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Select Your Option
        </h2>
        <p className="text-gray-600 mb-6">
          Choose the option that best suits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <button
          onClick={() => onSubmit('option-1')}
          className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#159A00] hover:bg-[#159A00]/5 transition-colors duration-200"
        >
          <div className="w-12 h-12 bg-[#159A00]/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-[#159A00]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Option 1</h3>
          <p className="text-sm text-gray-600 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
          </p>
        </button>

        <button
          onClick={() => onSubmit('option-2')}
          className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#159A00] hover:bg-[#159A00]/5 transition-colors duration-200"
        >
          <div className="w-12 h-12 bg-[#159A00]/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-[#159A00]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Option 2</h3>
          <p className="text-sm text-gray-600 text-center">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
          </p>
        </button>

        <button
          onClick={() => onSubmit('option-3')}
          className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#159A00] hover:bg-[#159A00]/5 transition-colors duration-200"
        >
          <div className="w-12 h-12 bg-[#159A00]/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-[#159A00]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Option 3</h3>
          <p className="text-sm text-gray-600 text-center">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.
          </p>
        </button>

        <button
          onClick={() => onSubmit('option-4')}
          className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#159A00] hover:bg-[#159A00]/5 transition-colors duration-200"
        >
          <div className="w-12 h-12 bg-[#159A00]/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-[#159A00]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Option 4</h3>
          <p className="text-sm text-gray-600 text-center">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
          </p>
        </button>
      </div>
    </div>
  );
} 