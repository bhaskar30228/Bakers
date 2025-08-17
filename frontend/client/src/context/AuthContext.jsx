import { createContext, useState ,useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [onClose, setOnClose] = useState(() => () => setIsOpen(false));
  const [cartLength, setCartLength] = useState(0);
  const token= localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartLength(cart.length);
}, [cart]);

useEffect(() => {
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  } else {
    setIsAdmin(false);
  }
}, [token]); // runs only when token changes


  return (
    <AuthContext.Provider value={{ isOpen, setIsOpen, onClose, setOnClose, cart, setCart, cartLength, setCartLength, isLoggedIn, setIsLoggedIn,token ,isAdmin,setIsAdmin}}>
      {children}
    </AuthContext.Provider>
  );
}