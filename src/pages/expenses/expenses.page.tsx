import { useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { TableCustom } from "../../components/basics";
import { useExpense } from "../../context/ExpenseContext";
import { Expense } from "../../api/expenseApi";
import { expenseColumns } from "../../mocks";

export default function ExpensesTypesPage() {
  const { expenses, fetchExpenses, deleteExpense } = useExpense();

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Box p={4}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Despesas do Casamento
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <TableCustom<Expense>
          columns={expenseColumns}
          rows={expenses}
          onDelete={(row) => deleteExpense(row.id)}
        />
      </Box>
    </Box>
  );
}
