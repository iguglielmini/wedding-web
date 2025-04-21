/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllExpenseTypes,
  getExpenseTypeById,
  createExpenseType,
  deleteExpenseType,
} from "../api";
import { AlertMessage } from "../components/basics";
import { Box } from "@mui/material";

export interface ExpenseType {
  id: string;
  name: string;
  createdAt: string;
}

interface ExpenseTypeContextType {
  expenseTypes: ExpenseType[];
  fetchExpenseTypes: () => Promise<void>;
  addExpenseType: (name: string) => Promise<void>;
  deleteExpenseTypeById: (id: string) => Promise<void>;
  getExpenseTypeDetails: (id: string) => Promise<ExpenseType | null>;
}

const ExpenseTypeContext = createContext<ExpenseTypeContextType | undefined>(
  undefined
);

export function ExpenseTypeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const showAlert = (
    message: string,
    severity: "success" | "error" | "info"
  ) => {
    setAlert({ open: true, message, severity });
    setTimeout(() => setAlert((prev) => ({ ...prev, open: false })), 5000);
  };

  const fetchExpenseTypes = async () => {
    try {
      const data = await getAllExpenseTypes();
      setExpenseTypes(data);
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const addExpenseType = async (name: string) => {
    try {
      const newType = await createExpenseType(name);
      setExpenseTypes((prev) => [...prev, newType]);
      showAlert("Tipo de despesa adicionado com sucesso!", "success");
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const deleteExpenseTypeById = async (id: string) => {
    try {
      await deleteExpenseType(id);
      setExpenseTypes((prev) => prev.filter((t) => t.id !== id));
      showAlert("Tipo de despesa removido com sucesso!", "success");
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const getExpenseTypeDetails = async (id: string) => {
    try {
      return await getExpenseTypeById(id);
    } catch (error: any) {
      showAlert(error.message, "error");
      return null;
    }
  };

  useEffect(() => {
    fetchExpenseTypes();
  }, []);

  return (
    <ExpenseTypeContext.Provider
      value={{
        expenseTypes,
        fetchExpenseTypes,
        addExpenseType,
        deleteExpenseTypeById,
        getExpenseTypeDetails,
      }}
    >
      {children}
      <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1500 }}>
        <AlertMessage
          open={alert.open}
          onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
          severity={alert.severity}
        >
          {alert.message}
        </AlertMessage>
      </Box>
    </ExpenseTypeContext.Provider>
  );
}

export function useExpenseType() {
  const context = useContext(ExpenseTypeContext);
  if (!context) {
    throw new Error(
      "useExpenseType deve ser usado dentro de ExpenseTypeProvider"
    );
  }
  return context;
}
