/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Card,
    CardContent,
    Typography,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
  } from "@mui/material";
  import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  import { useState } from "react";
  
  interface Expense {
    type: string;
    totalValue: number;
    paidValue: number;
    date: string; // ISO format
  }
  
  interface ExpenseChartProps {
    expenses: Expense[];
  }
  
  const COLORS = ["#66bb6a", "#ef5350", "#ffa726", "#42a5f5", "#ab47bc"];
  
  export default function ExpenseChart({ expenses }: ExpenseChartProps) {
    const [filterMonth, setFilterMonth] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
  
    const handleMonthChange = (event: any) => {
      setFilterMonth(event.target.value);
    };
  
    const handleStatusChange = (event: any) => {
      setFilterStatus(event.target.value);
    };
  
    const filteredExpenses = expenses.filter((exp) => {
      const matchesMonth =
        filterMonth === "all" || new Date(exp.date).getMonth() + 1 === Number(filterMonth);
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "paid" && exp.paidValue >= exp.totalValue) ||
        (filterStatus === "unpaid" && exp.paidValue < exp.totalValue);
  
      return matchesMonth && matchesStatus;
    });
  
    const chartData = filteredExpenses.map((expense) => ({
      name: expense.type,
      Pago: expense.paidValue,
      "A Pagar": expense.totalValue - expense.paidValue,
    }));
  
    const flattened = chartData.flatMap((item) => [
      { name: `${item.name} - Pago`, value: item["Pago"] },
      { name: `${item.name} - A Pagar`, value: item["A Pagar"] },
    ]);
  
    const formatCurrency = (value: number) =>
      value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
  
    return (
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Distribuição de Despesas
          </Typography>
  
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl>
              <InputLabel>Mês</InputLabel>
              <Select value={filterMonth} label="Mês" onChange={handleMonthChange}>
                <MenuItem value="all">Todos</MenuItem>
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} label="Status" onChange={handleStatusChange}>
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="paid">Pago</MenuItem>
                <MenuItem value="unpaid">A Pagar</MenuItem>
              </Select>
            </FormControl>
          </Box>
  
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={flattened}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
              >
                {flattened.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => label}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }