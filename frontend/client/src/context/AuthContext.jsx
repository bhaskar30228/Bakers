import { createContext, useState ,useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [onClose, setOnClose] = useState(() => () => setIsOpen(false));
  const [cartLength, setCartLength] = useState(0);
  const token= localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);
  return (
    <AuthContext.Provider value={{ isOpen, setIsOpen, onClose, setOnClose, cart, setCart, cartLength, setCartLength, isLoggedIn, setIsLoggedIn,token }}>
      {children}
    </AuthContext.Provider>
  );
}