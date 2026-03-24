import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import router from '@/router';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-sm)',
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
