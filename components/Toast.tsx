"use client";

import type { Dispatch, FC, SetStateAction } from "react";

interface ToastProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string | null>>;
}

const Toast: FC<ToastProps> = (props) => {
  const { message, setMessage } = props;

  const handleClose = () => setMessage(null);

  return (
    <div
      id="toast-undo"
      className="fixed right-5 bottom-5 flex items-center w-full max-w-xs p-2 text-white-500 bg-zinc-900 rounded shadow"
      role="alert">
      <div className="text-sm ml-2 font-normal">{message}</div>
      <div className="flex items-center ml-auto space-x-2">
        <button
          type="button"
          className="bg-zinc-900 text-white-400 hover:text-white-900 rounded hover:bg-zinc-800 inline-flex items-center justify-center h-8 w-8"
          data-dismiss-target="#toast-undo"
          aria-label="Close"
          onClick={handleClose}>
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
