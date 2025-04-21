const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

export interface ExpenseType {
  id: string;
  name: string;
  createdAt: string;
}

export async function getAllExpenseTypes(): Promise<ExpenseType[]> {
  const res = await fetch(`${API_URL}/expense-types`, { headers });
  if (!res.ok) throw new Error("Erro ao buscar tipos de despesa");
  const data = await res.json();
  return data.data;
}

export async function getExpenseTypeById(id: string): Promise<ExpenseType> {
  const res = await fetch(`${API_URL}/expense-types/${id}`, { headers });
  if (!res.ok) throw new Error("Erro ao buscar tipo de despesa por ID");
  const data = await res.json();
  return data.data;
}

export async function createExpenseType(name: string): Promise<ExpenseType> {
  const res = await fetch(`${API_URL}/expense-types`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao criar tipo de despesa");
  }
  const data = await res.json();
  return data.data;
}

export async function deleteExpenseType(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/expense-types/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao deletar tipo de despesa");
  }
}
