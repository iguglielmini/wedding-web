import { Expense } from "../api/expenseApi";
import { TableColumn } from "../components/basics/tableCustom/tableCustom";
import { formatCurrency } from "../utils";

export const expenseColumns: TableColumn<Expense>[] = [
  {
    id: "date",
    label: "Data",
    format: (value: Expense["date"]) => new Date(value).toLocaleDateString("pt-BR"),
  },
  {
    id: "description",
    label: "Descrição",
  },
  {
    id: "type",
    label: "Tipo",
    format: (value: Expense["type"]) => value.name,
  },
  {
    id: "totalValue",
    label: "Valor Total",
    format: formatCurrency,
  },
  {
    id: "paidValue",
    label: "Valor Pago",
    format: formatCurrency,
  },
  {
    id: "saldo",
    label: "Saldo Devedor",
    format: formatCurrency,
  },
];
