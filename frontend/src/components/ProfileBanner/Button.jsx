export default function Button({ handleClick, children }) {
  return (
    <button
      className="text-lg px-6 py-1 bg-slate-200 rounded-lg transform transition-transform transition-color hover:bg-slate-300 hover:scale-105"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
