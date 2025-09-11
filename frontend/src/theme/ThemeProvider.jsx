import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const ThemeModeContext = createContext({
  mode: "system",
  setMode: () => {},
  effectiveMode: "light",
});

const STORAGE_KEY = "adminThemeMode"; // 'light' | 'dark' | 'system'

export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "system";
    } catch {
      return "system";
    }
  });

  const systemPrefersDark = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, []);

  const effectiveMode =
    mode === "system" ? (systemPrefersDark ? "dark" : "light") : mode;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
  }, [mode]);

  const theme = useMemo(() => {
    const isDark = effectiveMode === "dark";
    return createTheme({
      palette: {
        mode: effectiveMode,
        primary: { main: "#ff9921" },
        secondary: { main: "#22d3ee" },
        background: isDark
          ? {
              default: "#0b1220",
              paper: "#0f172a",
            }
          : {
              default: "#f8fafc",
              paper: "#ffffff",
            },
        text: isDark
          ? { primary: "#e2e8f0", secondary: "#94a3b8" }
          : { primary: "#0f172a", secondary: "#475569" },
        divider: isDark ? "#1f2937" : "#e2e8f0",
        action: isDark
          ? {
              hover: "rgba(148,163,184,0.08)",
              selected: "rgba(148,163,184,0.16)",
            }
          : { hover: "#f1f5f9", selected: "#e2e8f0" },
      },
      shape: { borderRadius: 10 },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
            },
          },
        },
        MuiAppBar: {
          defaultProps: { elevation: 0 },
        },
        MuiButton: {
          styleOverrides: {
            root: { textTransform: "none", fontWeight: 600 },
          },
        },
      },
    });
  }, [effectiveMode]);

  const contextValue = useMemo(
    () => ({ mode, setMode, effectiveMode }),
    [mode, effectiveMode]
  );

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);
