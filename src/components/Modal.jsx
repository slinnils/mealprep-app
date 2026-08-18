export default function Modal({
  ref,
  title,
  children,
  onClose,
}) {
  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.target === ref.current) {
          ref.current.close();
        }
      }}
      className="mx-auto my-auto bg-blue bg-cyan-900 p-5 rounded-2xl"
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}

      <button type="button" onClick={onClose} className="button mt-10 text-gray-300">
        Schliessen
      </button>
    </dialog>
  );
}
