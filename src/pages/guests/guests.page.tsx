import { Box, Divider, Typography } from "@mui/material";
import { Guest } from "../../@types";
import { TableCustom } from "../../components/basics";
import { useDashboard } from "../../context/DashboardContext";
import { useEffect, useState } from "react";
import {
  GuestDetailsModal,
  GuestSummary,
  GuestEditModal,
  ImportExportSection,
} from "../../components/compositives";
import { guestColumns } from "../../mocks";

export default function GuestPage() {
  const {
    guests,
    fetchAllGuests,
    deleteGuest,
    viewGuest,
    updateGuest,
    totalGuestsCount,
    confirmedGuestsCount,
    unconfirmedGuestsCount,
  } = useDashboard();
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleViewGuest = async (id: string) => {
    const guest = await viewGuest(id);
    if (guest) {
      setSelectedGuest(guest);
      setModalOpen(true);
    }
  };

  const handleEditGuest = async (id: string) => {
    const guest = await viewGuest(id);
    if (guest) {
      setSelectedGuest(guest);
      setEditModalOpen(true);
    }
  };

  const handleSubmitEdit = async (id: string, data: Partial<Guest>) => {
    await updateGuest(id, data);
    setEditModalOpen(false);
  };

  useEffect(() => {
    fetchAllGuests();
  }, []);

  const lastUpdate = new Date().toISOString();

  return (
    <Box p={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Lista de Convidados
        </Typography>

        <ImportExportSection />
      </Box>
      
      <Divider />

      <GuestSummary
        total={totalGuestsCount}
        confirmed={confirmedGuestsCount}
        unconfirmed={unconfirmedGuestsCount}
        lastUpdate={lastUpdate}
      />

      <TableCustom<Guest>
        columns={guestColumns}
        rows={guests}
        onDelete={(row) => deleteGuest(row.id)}
        onEdit={(row) => handleEditGuest(row.id)}
        onView={(row) => handleViewGuest(row.id)}
      />

      <GuestDetailsModal
        guest={selectedGuest}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <GuestEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        guest={selectedGuest}
        onSubmit={handleSubmitEdit}
      />
    </Box>
  );
}
