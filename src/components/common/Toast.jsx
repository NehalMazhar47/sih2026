import React, { useEffect, useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toastMessage, setToastMessage } = usePlatform();

  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toastMessage, setToastMessage]);

  if (!toastMessage) return null;

  return (
    <div className="toast-wrap">
      <div className="toast">
        <CheckCircle2 size={16} color="#4ADE80" />
        {toastMessage}
      </div>
    </div>
  );
};
