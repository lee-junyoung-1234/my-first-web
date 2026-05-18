"use client";

import React from "react";

type Props = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
};

export default function Toast({ message, actionLabel, onAction, onClose, className }: Props) {
  return (
    <div className={`fixed right-4 bottom-6 z-50 ${className ?? ""}`}>
      <div className="bg-white border rounded-lg shadow-md p-3 flex items-center gap-3 max-w-sm">
        <div className="text-sm">{message}</div>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="ml-auto px-2 py-1 text-sm border rounded bg-gray-100"
          >
            {actionLabel}
          </button>
        )}
        {onClose && (
          <button onClick={onClose} className="ml-2 text-sm text-gray-500 px-2 py-1">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
