import { Dialog } from '@headlessui/react'
import { useState } from "react"

const ModernModal = ({ isOpen, setIsOpen, title, content, variant = "default" }) => {
  const [activeTab, setActiveTab] = useState(0)

  const renderIcon = () => {
    switch(variant) {
      case "map":
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
        )
      case "cv":
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )
      case "info":
        return (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const getVariantStyles = () => {
    switch(variant) {
      case "map":
        return "bg-blue-50"
      case "cv":
        return "bg-purple-50"
      case "info":
        return "bg-green-50"
      default:
        return "bg-gray-50"
    }
  }

  return (
    <Dialog 
      open={isOpen} 
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-lg rounded-lg bg-white shadow-xl overflow-hidden transform transition-all">
          {/* Header background */}
          <div className={`absolute top-0 left-0 right-0 h-28 ${getVariantStyles()}`} />

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-500 hover:bg-white/10 hover:text-gray-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative px-6 pt-6 pb-8">
            {renderIcon()}

            <Dialog.Title className="text-center mt-4 text-xl font-bold tracking-tight text-gray-900">
              {title}
            </Dialog.Title>

            <div className="mt-6 space-y-4">
              {Array.isArray(content) ? (
                <>
                  <div className="flex justify-center"> {/* Añadido contenedor centrado */}
                    <div className="inline-flex space-x-1 bg-gray-100 p-1 rounded-lg"> {/* Cambiado a inline-flex */}
                      {content.map((tab, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveTab(index)}
                          className={`px-6 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                            activeTab === index 
                              ? "bg-white shadow text-gray-900" 
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {tab.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    {content[activeTab].content}
                  </div>
                </>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg">
                  {content}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${variant === "map" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" :
                    variant === "cv" ? "bg-purple-100 text-purple-700 hover:bg-purple-200" :
                    variant === "info" ? "bg-green-100 text-green-700 hover:bg-green-200" :
                    "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                Entendido
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default ModernModal