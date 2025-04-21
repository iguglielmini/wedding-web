import { Guest } from "../@types";
import { TableColumn } from "../components/basics/tableCustom/tableCustom";
import { formatPhone } from "../utils";

export const guestColumns = [
  { id: "name", label: "Nome" },
  { id: "surname", label: "Sobrenome" },
  {
    id: "phone",
    label: "Telefone",
    format: (v: string) => formatPhone(v),
  },
  { id: "type", label: "Tipo" },
  { id: "invitedBy", label: "Convidado por" },
  {
    id: "hasCompanion",
    label: "Acompanhante",
    format: (v: boolean) => (v ? "✅" : "❌"),
  },
  {
    id: "confirmed",
    label: "Confirmado",
    format: (v: boolean) => (v ? "✅" : "❌"),
  },
] satisfies TableColumn<Guest>[];
