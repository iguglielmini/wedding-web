import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import {
  ButtonCustom,
  InputCustom,
  ModalCustom,
  TableCustom,
} from "../../components/basics";
import { useExpenseType } from "../../context/ExpenseTypeContext";
import { ExpenseType } from "../../context/ExpenseTypeContext";
import { expenseTypeColumns } from "../../mocks";
import AddIcon from "@mui/icons-material/Add";

export default function ExpensesPage() {
  const {
    expenseTypes,
    addExpenseType,
    fetchExpenseTypes,
    deleteExpenseTypeById,
    getExpenseTypeDetails,
  } = useExpenseType();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchExpenseTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      await addExpenseType(name.trim());
      setName("");
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="h4" gutterBottom>
          Tipos de Despesas
        </Typography>

        <ButtonCustom variantType="primary" onClick={() => setModalOpen(true)}>
          <AddIcon />
          Adicionar Tipo
        </ButtonCustom>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <TableCustom<ExpenseType>
        columns={expenseTypeColumns}
        rows={expenseTypes}
        onDelete={(row) => deleteExpenseTypeById(row.id)}
        onEdit={(row) => console.log("editar", row)}
        onView={(row) => getExpenseTypeDetails(row.id).then(console.log)}
      />

      <ModalCustom
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setName("");
          setError(false);
        }}
        title="Adicionar Tipo de Despesa"
      >
        <form onSubmit={handleSubmit}>
          <InputCustom
            label="Nome do tipo de despesa"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error && !name.trim()}
            helperText={error && !name.trim() ? "Campo obrigatório" : ""}
            fullWidth
            required
          />

          <ButtonCustom
            type="submit"
            variantType="primary"
            sx={{ width: "100%", marginTop: "16px" }}
            disabled={loading}
          >
            {loading ? "Adicionando..." : "Salvar"}
          </ButtonCustom>
        </form>
      </ModalCustom>
    </Box>
  );
}
