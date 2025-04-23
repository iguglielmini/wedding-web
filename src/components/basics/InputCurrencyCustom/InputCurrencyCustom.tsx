import {
  FilledInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import { formatCurrency } from "../../../utils";

interface InputCurrencyCustomProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
  fullWidth?: boolean;
  sx?: object;
}

export default function InputCurrencyCustom({
  label,
  value,
  onChange,
  required = false,
  fullWidth = false,
  sx = {},
}: InputCurrencyCustomProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const numericValue = Number(raw) / 100;
    onChange(numericValue);
  };

  return (
    <FormControl variant="filled" required={required} fullWidth={fullWidth} sx={sx}>
      <InputLabel htmlFor="currency-input">{label}</InputLabel>
      <FilledInput
        id="currency-input"
        value={formatCurrency(value)}
        onChange={handleChange}
      />
    </FormControl>
  );
}
