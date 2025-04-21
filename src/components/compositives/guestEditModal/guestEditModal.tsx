import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Guest } from "../../../@types";
import { ModalCustom, InputCustom, ButtonCustom } from "../../basics";
import { cleanPhone, formatPhone } from "../../../utils";

interface GuestEditModalProps {
  guest: Guest | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: Partial<Guest>) => void;
}

export default function GuestEditModal({
  guest,
  open,
  onClose,
  onSubmit,
}: GuestEditModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    invitedBy: "Noivo" as "Noivo" | "Noiva" | "Ambos",
    type: "Amigos" as "Amigos" | "Padrinhos" | "Familiar",
    hasCompanion: false,
  });

  useEffect(() => {
    if (guest) {
      setFormData({
        name: guest.name,
        surname: guest.surname,
        phone: guest.phone,
        invitedBy: guest.invitedBy,
        type: guest.type,
        hasCompanion: guest.hasCompanion,
      });
    }
  }, [guest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, hasCompanion: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guest) {
      onSubmit(guest.id, {
        ...formData,
        phone: cleanPhone(formData.phone),
      });
    }
  };

  return (
    <ModalCustom open={open} onClose={onClose} title="Editar Convidado">
      <form onSubmit={handleSubmit}>
        <InputCustom
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          fullWidth
        />

        <InputCustom
          label="Sobrenome"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          required
          fullWidth
          sx={{ mt: 2 }}
        />

        <InputCustom
          label="Telefone"
          name="phone"
          value={formatPhone(formData.phone)}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              phone: formatPhone(e.target.value),
            }))
          }
          required
          fullWidth
          sx={{ mt: 2 }}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="invitedBy-label">Convidado por</InputLabel>
          <Select
            labelId="invitedBy-label"
            name="invitedBy"
            value={formData.invitedBy}
            label="Convidado por"
            onChange={handleSelectChange}
          >
            <MenuItem value="Noivo">Noivo</MenuItem>
            <MenuItem value="Noiva">Noiva</MenuItem>
            <MenuItem value="Ambos">Ambos</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            labelId="type-label"
            name="type"
            value={formData.type}
            label="Tipo"
            onChange={handleSelectChange}
          >
            <MenuItem value="Amigos">Amigos</MenuItem>
            <MenuItem value="Padrinhos">Padrinhos</MenuItem>
            <MenuItem value="Familiar">Familiar</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography fontWeight="bold">Acompanhante:</Typography>
          <Box sx={{ display: "flex", gap: 4, mt: 1 }}>
            <label>
              <input
                type="radio"
                checked={formData.hasCompanion}
                onChange={() => handleRadioChange(true)}
              />{" "}
              Sim
            </label>
            <label>
              <input
                type="radio"
                checked={!formData.hasCompanion}
                onChange={() => handleRadioChange(false)}
              />{" "}
              Não
            </label>
          </Box>
        </Box>

        <ButtonCustom
          type="submit"
          variantType="primary"
          className="w-full mt-4"
        >
          Salvar Alterações
        </ButtonCustom>
      </form>
    </ModalCustom>
  );
}
