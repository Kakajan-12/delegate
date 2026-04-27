"use client";

export default function PrintTrigger() {
  return (
      <div className="no-print fixed top-0 left-0 right-0 z-50 flex justify-center p-4 bg-white border-b border-gray-200">
        <button
            onClick={() => window.print()}
            className="bg-orange-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-lg shadow-md text-lg"
        >
          🖨️ Print
        </button>
      </div>
  );
}