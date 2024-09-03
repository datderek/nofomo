import { useEffect, useRef } from 'react';

const isClickInsideRectangle = (e, element) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

export default function PostFormModal({ isOpen, onSubmit, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      ref.current?.showModal();
    } else {
      document.body.classList.remove('overflow-hidden');
      ref.current?.close();
    }
  }, [isOpen]);

  const submitAndClose = () => {
    onSubmit();
    onClose();
  };

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
      className="w-min p-4 overflow-visible border rounded-lg backdrop:bg-black backdrop:bg-opacity-70"
    >
      {children}

      <div className="flex gap-5">
        <button onClick={submitAndClose}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
}
