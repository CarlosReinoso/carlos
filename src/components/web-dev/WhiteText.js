export default function WhiteText({ children }) {
  return (
    <span className="text-white hover:text-amber-400 transition duration-300">
      {children}
    </span>
  );
}
