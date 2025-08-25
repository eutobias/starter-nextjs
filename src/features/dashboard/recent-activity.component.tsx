import { Card } from "@/components/card.component";
import { Box } from "@/components/box.component";
import { Title } from "@/components/title.component";
import { Text } from "@/components/text.component";
import { Badge, BadgeAvailableColor } from "@/components/badge.component";
import { Button } from "@/components/button.component";
import { List } from "@/components/list.component";

export interface RecentActivityProps {
  title: string;
}

export const RecentActivity = () => {
  const dummyData = [
    {
      title: "Empresa Exemplo Ltda",
      text: "11.222.333/0001-81 • Relatório Completo",
      badge: {
        color: "green",
        text: "SUCESSO",
      },
      value: "R$ 4,50",
    },
    {
      title: "Comércio ABC S.A.",
      text: "22.333.444/0001-92 • Consulta Básica",
      badge: {
        color: "green",
        text: "SUCESSO",
      },
      value: "R$ 2,50",
    },
    {
      title: "Serviços XYZ Ltda.",
      text: "33.444.555/0001-03 • Relatório Detalhado",
      badge: {
        color: "green",
        text: "SUCESSO",
      },
      value: "R$ 6,00",
    },
  ];

  return (
    <Card className="justify-between gap-6">
      <Box direction="column">
        <Title level={3} className=" mb-6">
          Atividade Recente
        </Title>

        <List.Container>
          {dummyData.map((item) => (
            <List.Item key={item.title} className="flex-row items-center justify-between">
              <Box direction="column" className="flex-1">
                <Text className="font-medium  mb-1">{item.title}</Text>
                <Text className="text-gray-500 text-sm">{item.text}</Text>
              </Box>
              <Badge color={item.badge.color as BadgeAvailableColor}>{item.badge.text}</Badge>
              <Text className="text-gray-500 text-sm ml-2">{item.value}</Text>
            </List.Item>
          ))}
        </List.Container>

        <Button variant="ghost" className="text-blue-600 text-sm font-medium">
          Ver Todas
        </Button>
      </Box>
    </Card>
  );
};
