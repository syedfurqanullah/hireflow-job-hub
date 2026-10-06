import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

/* =========================================================
   HireFlow Root Application
   Purpose:
   - BrowserRouter ko complete application ke around provide karta hai.
   - AppRoutes website ki routing handle karta hai.
========================================================= */

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;