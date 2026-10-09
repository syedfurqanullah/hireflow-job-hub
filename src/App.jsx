import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppErrorBoundary from "./components/common/AppErrorBoundary";
import ThemeProvider from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";

/* =========================================================
   HireFlow Root Application
   Purpose:
   - BrowserRouter ko complete application ke around provide karta hai.
   - AppRoutes website ki routing handle karta hai.
========================================================= */

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AppErrorBoundary>
            <AppRoutes />
          </AppErrorBoundary>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
