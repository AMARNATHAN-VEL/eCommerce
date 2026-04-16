import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import * as api from "../services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setError(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("currentUser");
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");
        if (userId) {
          // Optimistically set from localStorage, then refetch full user
          const optimisticUser = JSON.parse(
            localStorage.getItem("currentUser") || "{}",
          );
          setCurrentUser(optimisticUser);

          // Refetch full user data
          const { success, data } = await api.getCurrentUser(userId);
          if (success && data) {
            setCurrentUser(data);
            localStorage.setItem("currentUser", JSON.stringify(data));
          } else {
            // Invalid user, logout
            handleLogout();
          }
        }
      } catch (err) {
        console.error("Failed to load user:", err);
        setError("Failed to load user session");
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [handleLogout]);

  const handleLogin = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const {
        success,
        data,
        error: loginError,
      } = await api.login(email, password);

      if (success && data) {
        setCurrentUser(data);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("currentUser", JSON.stringify(data));
        setError(null);
        return { success: true };
      } else {
        setError(loginError || "Login failed");
        return { success: false, error: loginError };
      }
    } catch (err) {
      setError("Login failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRegister = useCallback(
    async (name, email, password) => {
      try {
        setLoading(true);
        setError(null);

        const { success: regSuccess, error: regError } = await api.register({
          name,
          email,
          password,
        });

        if (!regSuccess) {
          setError(regError || "Registration failed");
          return { success: false, error: regError };
        }

        // Auto-login after successful registration
        return await handleLogin(email, password);
      } catch (err) {
        setError("Registration failed");
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [handleLogin],
  );

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      error,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
    }),
    [currentUser, loading, error, handleLogin, handleRegister, handleLogout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
