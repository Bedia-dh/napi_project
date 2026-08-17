import "./adminTheme.css";

// Registered under payload.config.ts's admin.components.providers so the
// CSS import above applies across the whole /admin app. This component
// itself does nothing but pass children through — the CSS side-effect
// import is the entire point.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return children;
}
