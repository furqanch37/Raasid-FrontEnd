import { createContext, useState, useContext } from 'react';
import ToastNotification from '../components/UI/ToastNotification';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: '',
    show: false,
    linkss: null,
    linkTextss: '',
    status: 'success',
    onClose: () => {},
  });
  const showToast = ({ message, link, linkText, status }) => {
    setToast({
      message,
      show: true,
      linked: link,
      linkTexted: linkText,
      status: status || 'success',
      onClose: () => setToast((prev) => ({ ...prev, show: false })),
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastNotification {...toast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
