import { Badge } from "@/components/badge.component";
import { Box } from "@/components/box.component";
import { Button } from "@/components/button.component";
import { Card } from "@/components/card.component";
import { CustomIcon } from "@/components/custom-icon.component";
import { Grid } from "@/components/grid.component";
import { Text } from "@/components/text.component";
import { Title } from "@/components/title.component";
import { MetricCard } from "@/components/metric-cards.component";
import { PlanUsageData } from "@/features/dashboard/plan-usage-data.component";
import { RecentActivity } from "@/features/dashboard/recent-activity.component";
import { ActionButton } from "@/components/action-button.component";

export const Dashboard = () => {
  return (
    <Box direction="column" className="w-full min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <Box direction="column" className="mb-8">
        <Title level={1} className=" mb-2">
          Bem-vindo, Admin Sistema!
        </Title>
        <Text className="text-gray-600">
          Acompanhe o desempenho e uso da sua plataforma Business Hub
        </Text>
      </Box>

      {/* Metrics Cards */}
      <Grid columns={4} className="gap-6 mb-8">
        {/* Consultas Este Mês */}
        <MetricCard
          title="Consultas Este Mês"
          value="45"
          footer="de 1000"
          icon="file-text"
        />

        {/* Consultas Excedentes */}
        <MetricCard
          title="Consultas Excedentes"
          value="0"
          footer="R$ 0,00"
          icon="check-circle"
        />

        {/* Usuários Ativos */}
        <MetricCard
          title="Usuários Ativos"
          value="1"
          footer="+0% vs mês anterior"
          icon="users"
        />

        {/* Custo Total */}
        <MetricCard
          title="Custo Total"
          value="699,90"
          footer="Plano mensal"
          icon="credit-card"
        />
      </Grid>

      {/* Content Grid */}
      <Grid columns={2} className="gap-6">
        {/* Uso do Plano */}
        <PlanUsageData
          planName="Plano Empresarial"
          planStatus="ATIVO"
          planUsage="45"
          planUsageMax="1000"
          onNewQueryButtonClick={() => {console.log("Nova consulta")}}
        />

        {/* Atividade Recente */}
        <RecentActivity />
      </Grid>

      {/* Quick Actions */}
      <Card className="mt-8">
        <Title level={3} className=" mb-6">
          Ações Rápidas
        </Title>

        <Grid columns={4} className="gap-4">
          <ActionButton
            variant="outline"
            icon="file-text"
            label="Nova Consulta"
            iconColor="text-blue-500"
          />

          <ActionButton
            icon="trending-up"
            label="Estatísticas"
            iconColor="text-green-500"
          />

          <ActionButton
            icon="users"
            label="Usuários"
            iconColor="text-purple-500"
          />

          <ActionButton
            icon="credit-card"
            label="Minha Conta"
            iconColor="text-orange-500"
          />
        </Grid>
      </Card>
    </Box>
  );
};
