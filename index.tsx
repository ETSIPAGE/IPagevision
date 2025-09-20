import React from 'react';
import ReactDOM from 'react-dom/client';
// The error "File '.../App.tsx' is not a module" on the next line was caused by
// App.tsx containing invalid placeholder text instead of a valid component.
// This has been fixed by implementing the App component in App.tsx.
import App from './src/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
