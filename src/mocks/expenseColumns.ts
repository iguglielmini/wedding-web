import { ExpenseType } from "../api";
import { TableColumn } from "../components/basics/tableCustom/tableCustom";

export const expenseTypeColumns: TableColumn<ExpenseType>[] = [
  { id: "name", label: "Nome do Tipo" },
//   { id: "type", label: "Tipo de despesa" },
];
