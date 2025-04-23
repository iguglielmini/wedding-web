/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  getExpenseSummary,
  registerPayment,
  deleteExpenseById as deleteExpenseApi,
} from "../api/";
import { Expense, ExpenseSummary } from "../api/";
import { AlertMessage } from "../components/basics";
import { Box } from "@mui/material";

interface ExpenseContextType {
  expenses: Expense[];
  expenseSummary: ExpenseSummary[];
  fetchExpenses: () => Promise<void>;
  fetchExpenseSummary: () => Promise<void>;
  addExpense: (
    data: Omit<Expense, "id" | "createdAt" | "saldo" | "type"> & {
      type: string;
    }
  ) => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
  getExpenseDetails: (id: number) => Promise<Expense | null>;
  payExpense: (id: number, amount: number) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseSummary, setExpenseSummary] = useState<ExpenseSummary[]>([]);
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

  const fetchExpenses = async () => {
    try {
      const data = await getAllExpenses();
      setExpenses(data);
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const fetchExpenseSummary = async () => {
    try {
      const data = await getExpenseSummary();
      setExpenseSummary(data);
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const addExpense: ExpenseContextType["addExpense"] = async (data) => {
    try {
      const newExpense = await createExpense(data);
      setExpenses((prev) => [...prev, newExpense]);
      showAlert("Despesa criada com sucesso!", "success");
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const deleteExpense: ExpenseContextType["deleteExpense"] = async (id) => {
    try {
      await deleteExpenseApi(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      showAlert("Despesa removida com sucesso!", "success");
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  const getExpenseDetails: ExpenseContextType["getExpenseDetails"] = async (
    id
  ) => {
    try {
      return await getExpenseById(id);
    } catch (error: any) {
      showAlert(error.message, "error");
      return null;
    }
  };

  const payExpense: ExpenseContextType["payExpense"] = async (id, amount) => {
    try {
      const updated = await registerPayment(id, amount);
      setExpenses((prev) => prev.map((e) => (e.id === id ? updated : e)));
      showAlert("Pagamento registrado com sucesso!", "success");
    } catch (error: any) {
      showAlert(error.message, "error");
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchExpenseSummary();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        expenseSummary,
        fetchExpenses,
        fetchExpenseSummary,
        addExpense,
        deleteExpense,
        getExpenseDetails,
        payExpense,
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
    </ExpenseContext.Provider>
  );
};

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense deve ser usado dentro de ExpenseProvider");
  }
  return context;
}
