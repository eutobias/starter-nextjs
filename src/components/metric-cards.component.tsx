import { Card } from "@/components/card.component";
import { Box } from "@/components/box.component";
import { Text } from "@/components/text.component";
import { Title } from "@/components/title.component";
import { CustomIcon } from "@/components/custom-icon.component";
import { IconName } from "lucide-react/dynamic";

export interface  MetricCardProps {
  title: string;
  value: string;
  footer: string
  icon: IconName;
}

export const MetricCard = ({title, value, icon, footer}: MetricCardProps) => {
  return (
    <Card>
      <Box className="justify-between items-center">
        <Box direction="column" className="gap-4">
          <Text className="text-gray-600 text-sm font-medium">
            {title}
          </Text>
          <Title level={2} className="text-3xl font-bold text-gray-900 mb-1">
            {value}
          </Title>
          <Text className="text-gray-500 text-sm">{footer}</Text>
        </Box>
        <CustomIcon name={icon} className="text-blue-500" size={20} />
      </Box>
    </Card>
  );
};
