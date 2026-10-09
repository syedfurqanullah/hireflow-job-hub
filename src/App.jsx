import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppErrorBoundary from "./components/common/AppErrorBoundary";

/* =========================================================
   HireFlow Root Application
   Purpose:
   - BrowserRouter ko complete application ke around provide karta hai.
   - AppRoutes website ki routing handle karta hai.
========================================================= */

function App() {
  return (
    <BrowserRouter>
      <AppErrorBoundary>
        <AppRoutes />
      </AppErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
