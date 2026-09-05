import React from 'react';

// DeviceFrame removed — all views are full-width responsive now
export const DeviceFrame = ({ children }) => {
  return <div style={{ flex: 1 }}>{children}</div>;
};
