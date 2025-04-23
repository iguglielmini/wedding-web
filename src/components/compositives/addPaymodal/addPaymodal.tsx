import { Autocomplete, Box, TextField } from "@mui/material";
import { useState } from "react";
import {
  ModalCustom,
  ButtonCustom,
  AlertMessage,
  InputCurrencyCustom,
} from "../../basics";
import { Expense } from "../../../api/expenseApi";

interface AddPayModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: number, amount: number) => void;
  expenses: Expense[];
}

export default function AddPayModal({
  open,
  onClose,
  onSubmit,
  expenses,
}: AddPayModalProps) {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [errorAlert, setErrorAlert] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpense || amount <= 0) {
      setErrorAlert("Preencha todos os campos corretamente.");
      return;
    }

    onSubmit(selectedExpense.id, amount);
    setSelectedExpense(null);
    setAmount(0);
    onClose();
  };

  return (
    <ModalCustom open={open} onClose={onClose} title="Registrar Pagamento">
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

        <Autocomplete
          options={expenses}
          getOptionLabel={(option) =>
            `${option.description} (ID: ${option.id})`
          }
          value={selectedExpense}
          onChange={(_, newValue) => setSelectedExpense(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Despesa" margin="normal" required />
          )}
        />

        <InputCurrencyCustom
          label="Valor do Pagamento"
          value={amount}
          onChange={setAmount}
          sx={{ mt: 2 }}
          fullWidth
          required
        />

        <Box mt={2}>
          <ButtonCustom type="submit" variantType="primary" className="w-full">
            Registrar Pagamento
          </ButtonCustom>
        </Box>
      </form>
    </ModalCustom>
  );
}
