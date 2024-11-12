const SuccessMessage = ({ message, visible }) => {
  return (
    <div 
      className={`
        mb-4 p-4 
        bg-green-100 border border-green-400 text-green-700 rounded-lg 
        transform transition-all duration-500 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      `}
      style={{
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="flex items-center">
        <svg 
          className="w-5 h-5 mr-2 text-green-500"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
            clipRule="evenodd" 
          />
        </svg>
        {message}
      </div>
    </div>
  );
};

export default SuccessMessage;