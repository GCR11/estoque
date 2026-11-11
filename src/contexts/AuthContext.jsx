import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabase.js';
import { AuthContext } from './AuthContextValue.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    let mounted = true;
    let authStateChanged = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      authStateChanged = true;
      setUser(session?.user ?? null);
      setAuthError('');
      setLoading(false);
    });

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!mounted || authStateChanged) {
          return;
        }

        if (error) {
          setAuthError(error.message);
        } else {
          setUser(data.session?.user ?? null);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (mounted && !authStateChanged) {
          setAuthError(error.message || 'Não foi possível verificar a sessão.');
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, authError, signOut }),
    [user, loading, authError, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
