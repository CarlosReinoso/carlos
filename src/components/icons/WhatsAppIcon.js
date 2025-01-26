const WhatsAppIcon = ({link}) => {
  return (
    <a
      href={link}
      className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full hover:scale-110 transition-transform duration-300"
      aria-label="WhatsApp"
      title="Chat on WhatsApp"
       target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.16 1.16 0 0 1 1.24-.27 11.72 11.72 0 0 0 3.68.59 1.16 1.16 0 0 1 1.16 1.16v3.63a1.16 1.16 0 0 1-1.16 1.16A17.09 17.09 0 0 1 3.5 5.83a1.16 1.16 0 0 1 1.16-1.16h3.63a1.16 1.16 0 0 1 1.16 1.16 11.72 11.72 0 0 0 .59 3.68 1.16 1.16 0 0 1-.27 1.24l-2.2 2.2z" />
      </svg>
    </a>
  );
};

export default WhatsAppIcon;
