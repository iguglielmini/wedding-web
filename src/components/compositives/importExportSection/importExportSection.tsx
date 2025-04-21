/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Box } from "@mui/material";
import { useDashboard } from "../../../context";
import { exportGuestsToCSV, importCSV } from "../../../utils";
import { AlertMessage, ButtonCustom } from "../../basics";

export default function ImportExportSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addGuest, guests } = useDashboard();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const showAlert = (
    message: string,
    severity: "success" | "error" | "info"
  ) => {
    setAlert({ open: true, message, severity });
    setTimeout(() => setAlert((prev) => ({ ...prev, open: false })), 4000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importCSV(file);

      for (const guest of data) {
        try {
          await addGuest({
            name: guest["Nome"],
            surname: guest["Sobrenome"] || "",
            phone: guest["Telefone"],
            invitedBy: guest["Convidado por"],
            hasCompanion: guest["Acompanhante"] === "Sim",
            type: guest["Tipo"] || "Amigos",
          });
        } catch (error) {
          console.error(error);
          showAlert("Erro ao importar um ou mais convidados", "error");
        }
      }

      showAlert("Convidados importados com sucesso!", "success");
    } catch (err: any) {
      showAlert(err.message || "Erro ao importar CSV", "error");
    } finally {
      e.target.value = "";
    }
  };

  const handleExport = () => {
    exportGuestsToCSV(guests);
    showAlert("Convidados exportados com sucesso!", "success");
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <ButtonCustom variantType="secondary" onClick={handleImportClick}>
        Importar CSV
      </ButtonCustom>

      <ButtonCustom variantType="primary" onClick={handleExport}>
        Exportar CSV
      </ButtonCustom>

      <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1500 }}>
        <AlertMessage
          open={alert.open}
          onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
          severity={alert.severity}
        >
          {alert.message}
        </AlertMessage>
      </Box>
    </Box>
  );
}
