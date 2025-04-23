import { Autocomplete, TextField, Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ModalCustom,
  InputCustom,
  ButtonCustom,
  InputCurrencyCustom,
  AlertMessage,
} from "../../basics";
import {
  ExpenseType,
  useExpenseType,
} from "../../../context/ExpenseTypeContext";

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    description: string;
    expenseTypeId: string;
    totalValue: number;
    paidValue: number;
  }) => void;
}

export default function AddExpenseModal({
  open,
  onClose,
  onSubmit,
}: AddExpenseModalProps) {
  const { expenseTypes, fetchExpenseTypes } = useExpenseType();

  const [description, setDescription] = useState("");
  const [type, setType] = useState<ExpenseType | null>(null);
  const [totalValue, setTotalValue] = useState(0);
  const [paidValue, setPaidValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    fetchExpenseTypes();
  }, []);

  useEffect(() => {
    if (open) {
      // Resetar erro ao abrir o modal
      setErrorAlert("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !type) return;

    if (paidValue > totalValue) {
      setErrorAlert("O valor pago não pode ser maior que o valor total.");
      setTimeout(() => setErrorAlert(""), 5000); // auto-close alert
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        description,
        expenseTypeId: type.id,
        totalValue,
        paidValue,
      });

      setDescription("");
      setType(null);
      setTotalValue(0);
      setPaidValue(0);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const remaining = totalValue - paidValue;

  return (
    <ModalCustom open={open} onClose={onClose} title="Nova Despesa">
      <form onSubmit={handleSubmit}>
        {errorAlert && (
          <Box mb={2}>
            <AlertMessage
              open={true}
              severity="error"
              onClose={() => setErrorAlert("")}
            >
              {errorAlert}
            </AlertMessage>
          </Box>
        )}

        <InputCustom
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
        />

        <Autocomplete
          options={expenseTypes}
          getOptionLabel={(option) => option.name}
          value={type}
          onChange={(_, newValue) => setType(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tipo de Despesa"
              margin="normal"
              required
            />
          )}
        />
        <InputCurrencyCustom
          label="Valor Total"
          value={totalValue}
          onChange={setTotalValue}
          sx={{ mt: 2 }}
          fullWidth
          required
        />
        <InputCurrencyCustom
          label="Valor Pago"
          value={paidValue}
          onChange={setPaidValue}
          sx={{ mt: 2, mb: 2 }}
          fullWidth
          required
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <ButtonCustom
            type="submit"
            variantType="primary"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar Despesa"}
          </ButtonCustom>

          <Box sx={{ textAlign: "left" }}>
            <strong>Saldo devedor:</strong>{" "}
            {remaining.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Box>
        </Box>
      </form>
    </ModalCustom>
  );
}
