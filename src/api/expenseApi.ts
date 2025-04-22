import { ExpenseType } from "../context/ExpenseTypeContext";

export interface Expense {
  id: number;
  date: string;
  description: string;
  type: ExpenseType;
  totalValue: number;
  paidValue: number;
  saldo: number;
  createdAt: string;
}

export interface ExpenseSummary {
  type: string;
  total: number;
  paid: number;
  saldo: number;
}

const API_URL = `${import.meta.env.VITE_API_URL}/expenses`;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export async function createExpense(data: {
  date: string;
  description: string;
  type: string; // ID do tipo
  totalValue: number;
  paidValue: number;
}): Promise<Expense> {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao criar despesa");
  }

  const result = await res.json();
  return result.data;
}

export async function getAllExpenses(): Promise<Expense[]> {
  const res = await fetch(`${API_URL}`, {
    headers: authHeader(),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao buscar despesas");
  }

  const result = await res.json();
  return result.data;
}

export async function getExpenseSummary(): Promise<ExpenseSummary[]> {
  const res = await fetch(`${API_URL}/summary`, {
    headers: authHeader(),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao buscar resumo de despesas");
  }

  const result = await res.json();
  return result.data;
}

export async function getExpenseById(id: number): Promise<Expense> {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: authHeader(),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao buscar despesa por ID");
  }

  const result = await res.json();
  return result.data;
}

export async function registerPayment(id: string | number, amount: number) {
  const res = await fetch(`${API_URL}/${id}/pay`, {
    method: "PATCH",
    headers: authHeader(),
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao registrar pagamento");
  }

  const data = await res.json();
  return data.data;
}
