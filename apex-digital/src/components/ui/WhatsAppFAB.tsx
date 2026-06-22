export default function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/971522278380"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-8 right-5 z-50 group flex items-center gap-2.5 select-none opacity-40 hover:opacity-100 transition-opacity duration-300"
    >
      {/* Tooltip */}
      <span
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap
          bg-[#0D0D2B] text-white text-[12px] font-medium px-3 py-1.5 rounded-full
          pointer-events-none"
      >
        Chat with us
      </span>

      {/* Button */}
      <div className="relative flex items-center justify-center w-13 h-13">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />

        {/* Icon circle */}
        <div
          className="relative w-13 h-13 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg
            group-hover:scale-110 group-active:scale-95 transition-transform duration-200"
          style={{ width: 52, height: 52 }}
        >
          {/* WhatsApp SVG logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-7 h-7"
            fill="white"
          >
            <path d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 10L4 44l10.3-2.7C17.1 43 20.5 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.4l-.6-.4-6.1 1.6 1.6-5.9-.4-.6C8.3 30.2 7.5 27.1 7.5 24 7.5 14.8 14.8 7.5 24 7.5S40.5 14.8 40.5 24 33.2 40 24 40zm10.9-13.3c-.6-.3-3.5-1.7-4-1.9-.6-.2-1-.3-1.4.3s-1.6 1.9-2 2.3c-.4.4-.7.5-1.3.2s-2.5-.9-4.7-2.9c-1.7-1.6-2.9-3.5-3.2-4.1-.3-.6 0-.9.3-1.2.3-.3.6-.7.9-1s.4-.6.6-1c.2-.4.1-.7 0-1s-1.4-3.3-1.9-4.5c-.5-1.2-1-1-1.4-1h-1.2c-.4 0-1 .1-1.6.8-.5.6-2 2-2 4.8s2.1 5.6 2.4 6c.3.4 4.1 6.2 9.9 8.7 1.4.6 2.4 1 3.3 1.2 1.4.4 2.6.3 3.6.2 1.1-.2 3.5-1.4 4-2.8.5-1.4.5-2.5.3-2.8-.1-.1-.5-.3-1.1-.5z" />
          </svg>
        </div>
      </div>
    </a>
  );
}
