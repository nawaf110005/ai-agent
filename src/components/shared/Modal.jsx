export default function Modal({ isOpen, title, children, onClose, hideClose }) {
    if (!isOpen) return null
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
          {!hideClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {title}
          </h2>
          <div>{children}</div>
        </div>
      </div>
    )
  }