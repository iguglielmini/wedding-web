import { Box, Divider, Paper, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useDashboard } from "../../context";
import { ExpenseChart, GuestSummary } from "../../components/compositives";
import { mockExpenses } from "../../mocks";

export default function DashboardPage() {
  const lastUpdate = new Date().toISOString();

  const { totalGuestsCount, confirmedGuestsCount, unconfirmedGuestsCount } =
    useDashboard();

  return (
    <Box p={4}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Bem vindo
        </Typography>

        <Box>
          <Paper
            elevation={3}
            sx={{ padding: 1, display: "flex", alignItems: "center" }}
          >
            <CalendarTodayIcon />
            <Typography
              variant="body1"
              sx={{ fontSize: 14, paddingLeft: "3px" }}
            >
              <b>220 dias</b> para o casamento
            </Typography>
          </Paper>
        </Box>
      </Box>
      <Divider />

      <GuestSummary
        total={totalGuestsCount}
        confirmed={confirmedGuestsCount}
        unconfirmed={unconfirmedGuestsCount}
        lastUpdate={lastUpdate}
      />

      <ExpenseChart expenses={mockExpenses} />
    </Box>
  );
}
