import {
    FilledInput,
    FormControl,
    InputAdornment,
    InputLabel,
  } from "@mui/material";
  import { ChangeEvent } from "react";
  import { formatCurrency } from "../../../utils";
  
  interface InputCurrencyCustomProps {
    label: string;
    value: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
    return (
      <FormControl variant="filled" required={required} fullWidth={fullWidth} sx={sx}>
        <InputLabel htmlFor="currency-input">{label}</InputLabel>
        <FilledInput
          id="currency-input"
          value={value}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/\D/g, "");
            const numeric = (parseFloat(rawValue) / 100).toFixed(2);
            e.target.value = formatCurrency(numeric);
            onChange(e as React.ChangeEvent<HTMLInputElement>);
          }}
          startAdornment={<InputAdornment position="start">R$</InputAdornment>}
        />
      </FormControl>
    );
  }
  