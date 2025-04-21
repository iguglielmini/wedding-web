import { ExpenseType } from "../api";
import { TableColumn } from "../components/basics/tableCustom/tableCustom";

export const expenseTypeColumns: TableColumn<ExpenseType>[] = [
    { id: "name", label: "Nome do Tipo" },
    {
      id: "createdAt",
      label: "Data de Criação",
      format: (value: string) =>
        new Date(value).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
  ];