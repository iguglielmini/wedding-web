import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentIcon from "@mui/icons-material/Payment";
import { AddGuestModal } from "../addGuestModal";
import { useDashboardActions } from "../../../hooks";
import { useDashboard } from "../../../context/DashboardContext";
import { cleanPhone } from "../../../utils";
import { AddExpenseModal } from "../addExpensesModal";
import { useExpense } from "../../../context";
import { AddPayModal } from "../addPaymodal";

export default function SpeedDialActions() {
  const {
    openGuestModal,
    closeGuestModal,
    isGuestModalOpen,
    isExpenseModalOpen,
    closeExpenseModal,
    openExpenseModal,
    isPaymentModalOpen,
    closePaymentModal,
    openPaymentModal,
  } = useDashboardActions();
  const { addGuest } = useDashboard();
  const { addExpense, payExpense, expenses } = useExpense();

  const handleSubmit = async (data: {
    name: string;
    surname: string;
    phone: string;
    invitedBy: "Noivo" | "Noiva" | "Ambos";
    hasCompanion: boolean;
    type: "Amigos" | "Padrinhos" | "Familiar";
  }) => {
    await addGuest({
      name: data.name,
      surname: data.surname,
      phone: cleanPhone(data.phone),
      invitedBy: data.invitedBy,
      hasCompanion: data.hasCompanion,
      type: data.type,
    });

    closeGuestModal();
  };

  const handleAddExpense = async (data: {
    description: string;
    expenseTypeId: string;
    totalValue: number;
    paidValue: number;
  }) => {
    await addExpense({
      date: new Date().toISOString().split("T")[0], // ou outro formato conforme o form
      description: data.description,
      totalValue: data.totalValue,
      paidValue: data.paidValue,
      type: data.expenseTypeId,
    });

    closeExpenseModal();
  };

  const actions = [
    {
      icon: <PersonAddIcon />,
      name: "Adicionar Convidado",
      handler: openGuestModal,
    },
    {
      icon: <AttachMoneyIcon />,
      name: "Adicionar Despesa",
      handler: openExpenseModal,
    },
    {
      icon: <PaymentIcon />,
      name: "Registrar Pagamento",
      handler: openPaymentModal,
    },
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="Menu de ações"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handler}
          />
        ))}
      </SpeedDial>

      <AddGuestModal
        open={isGuestModalOpen}
        onClose={closeGuestModal}
        onSubmit={handleSubmit}
      />
      <AddExpenseModal
        open={isExpenseModalOpen}
        onClose={closeExpenseModal}
        onSubmit={handleAddExpense}
      />

      <AddPayModal
        open={isPaymentModalOpen}
        onClose={closePaymentModal}
        onSubmit={(id, amount) => payExpense(id, amount)}
        expenses={expenses}
      />
    </>
  );
}
