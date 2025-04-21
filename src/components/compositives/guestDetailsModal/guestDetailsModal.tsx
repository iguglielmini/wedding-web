import { Box, Typography } from "@mui/material";
import { Guest } from "../../../@types";
import { ModalCustom } from "../../basics";
import { formatPhone } from "../../../utils";

interface GuestDetailsModalProps {
  guest: Guest | null;
  open: boolean;
  onClose: () => void;
}

export default function GuestDetailsModal({
  guest,
  open,
  onClose,
}: GuestDetailsModalProps) {
  return (
    <ModalCustom open={open} onClose={onClose} title="Detalhes do Convidado">
      {guest && (
        <Box>
          <Typography pb={2}>
            <strong>Nome:</strong> {guest.name} {guest.surname}
          </Typography>
          <Typography pb={2}>
            <strong>Telefone:</strong> {formatPhone(guest.phone)}
          </Typography>
          <Typography pb={2}>
            <strong>Convidado por:</strong> {guest.invitedBy}
          </Typography>
          <Typography pb={2}>
            <strong>Tipo:</strong> {guest.type}
          </Typography>
          <Typography pb={2}>
            <strong>Acompanhante:</strong> {guest.hasCompanion ? "Sim" : "Não"}
          </Typography>
          <Typography>
            <strong>Confirmado:</strong> {guest.confirmed ? "Sim" : "Não"}
          </Typography>
        </Box>
      )}
    </ModalCustom>
  );
}
