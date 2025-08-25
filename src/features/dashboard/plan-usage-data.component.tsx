import { Card } from "@/components/card.component";
import { Box } from "@/components/box.component";
import { Title } from "@/components/title.component";
import { Text } from "@/components/text.component";
import { Badge } from "@/components/badge.component";
import { ProgressBar } from "@/components/progress-bar.component";
import { Button } from "@/components/button.component";

export interface PlanUsageDataProps {
  planName: string;
  planStatus: string;
  planUsage: string;
  planUsageMax: string;
  onNewQueryButtonClick: () => void;
}

export const PlanUsageData = ({planName, planStatus, planUsage, planUsageMax, onNewQueryButtonClick}: PlanUsageDataProps) => {
  return (
    <Card className="justify-between gap-6">
      <Box direction="column" className="gap-6">
        <Title level={3}>Uso do Plano</Title>

        <Box className="w-full justify-between items-center">
          <Text className="font-medium ">{planName}</Text>
          <Badge color="blue">{planStatus}</Badge>
        </Box>

        <Box direction="column">
          <Box className="w-full justify-between mb-2">
            <Text className="text-gray-600 text-sm">
              Consultas utilizadas
            </Text>
            <Text className="font-bold text-sm">
              {planUsage} / {planUsageMax}
            </Text>
          </Box>
          <ProgressBar
            value={Number(planUsage)}
            max={Number(planUsageMax)}
          />
        </Box>
      </Box>

      <Button variant="outline" className="w-full" onClick={onNewQueryButtonClick}>
        Nova Consulta
      </Button>
    </Card>
  );
};
