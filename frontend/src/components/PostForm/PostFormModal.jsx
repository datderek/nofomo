import { useEffect, useRef } from 'react';
import PostForm from './PostForm';

const isClickInsideRectangle = (e, element) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

export default function PostFormModal({ isOpen, onClose }) {
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

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
      className="w-min p-4 pt-4 overflow-visible border rounded-lg backdrop:bg-black backdrop:bg-opacity-70"
    >
      <button onClick={onClose} className="absolute top-2 right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="h-5 w-5 fill-black-500"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
      <PostForm onSubmit={onClose} />
    </dialog>
  );
}
