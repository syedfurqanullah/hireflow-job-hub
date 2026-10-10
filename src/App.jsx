import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppErrorBoundary from "./components/common/AppErrorBoundary";
import ThemeProvider from "./context/theme/ThemeProvider";
import { ToastProvider } from "./context/toast/ToastProvider";

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
