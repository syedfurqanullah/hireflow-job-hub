import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppErrorBoundary from "./components/common/AppErrorBoundary";
import ThemeProvider from "./context/ThemeContext";

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
        <AppErrorBoundary>
          <AppRoutes />
        </AppErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
