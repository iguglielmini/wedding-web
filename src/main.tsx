import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./styles";
import "./styles/variables.css";
import "./styles/global.css";
import {
  AuthProvider,
  DashboardProvider,
  ExpenseProvider,
  ExpenseTypeProvider,
} from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <DashboardProvider>
          <ExpenseTypeProvider>
            <ExpenseProvider>
              <App />
            </ExpenseProvider>
          </ExpenseTypeProvider>
        </DashboardProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
