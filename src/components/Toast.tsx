import React from 'react';
import { Heart, Trash2 } from 'lucide-react';

export interface ToastMessage {
  id: number;
  text: string;
  type: 'add' | 'remove';
}

interface ToastProps {
  toasts: ToastMessage[];
}

export const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          {toast.type === 'add' ? (
            <Heart size={18} className="toast-icon-fav" />
          ) : (
            <Trash2 size={18} className="toast-icon-remove" />
          )}
          <span>{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
