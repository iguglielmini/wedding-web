import Papa from "papaparse";
import { saveAs } from "file-saver";

interface GuestExport {
  name: string;
  surname: string;
  phone: string;
  type: string;
  invitedBy: string;
  hasCompanion: boolean;
  confirmed: boolean;
}

export const exportGuestsToCSV = (guests: GuestExport[]) => {
  const csv = Papa.unparse(
    guests.map((guest) => ({
      Nome: guest.name,
      Sobrenome: guest.surname,
      Telefone: guest.phone,
      Tipo: guest.type,
      "Convidado por": guest.invitedBy,
      Acompanhante: guest.hasCompanion ? "Sim" : "Não",
      Confirmado: guest.confirmed ? "Sim" : "Não",
    }))
  );

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "convidados.csv");
};
