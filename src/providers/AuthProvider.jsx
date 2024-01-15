import { createContext, useState, useEffect } from 'react';
import { supabase } from '../client';
export const AuthContext = createContext();

const UserProvider = ({ children }) => {
  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });
  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      redirectTo: 'https://oxdhxqqtbimpthunoawy.supabase.co/auth/v1/callback',
    });

  const passwordReset = (email) =>
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/update-password',
    });

  const updatePassword = (updatedPassword) =>
    supabase.auth.updateUser({ password: updatedPassword });

  const signOut = () => supabase.auth.signOut();

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
        setAuth(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signInWithGoogle,
        passwordReset,
        updatePassword,
        signOut,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;
