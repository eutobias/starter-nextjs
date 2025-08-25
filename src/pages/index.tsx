import { Box } from "@/components/box.component";
import { Title } from "@/components/title.component";
import { Grid } from "@/components/grid.component";
import { Text } from "@/components/text.component";
import { Button } from "@/components/button.component";
import { LinkButton } from "@/components/link-button.component";
import { Dashboard } from "@/features/dashboard/dashboard.component";

export default function Home() {
  return (
    <Grid columns={2} className="gap-4">
      <Box className="col-span-2 w-full">
        <Dashboard />
      </Box>

      <Box direction={"column"} className="gap-4">
        <Title level={1}>Hello World</Title>
        <Title level={2}>Hello World</Title>
        <Title level={3}>Hello World</Title>
        <Title level={4}>Hello World</Title>
        <Title level={5}>Hello World</Title>
        <Title level={6}>Hello World</Title>
      </Box>
      <Box direction={"column"} className="gap-4">
        <Text className="text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam,{" "}
          <LinkButton href="/">
            quis nostrud exercitation ullamco laboris nisi ut
          </LinkButton>
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text className="text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Box>
      <Box direction={"column"} className="gap-4">
        <Button>Primary Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline" size="lg">
          Large Outline
        </Button>
        <Button variant="ghost" size="sm">
          Small Ghost
        </Button>
        <Button variant="destructive">Delete</Button>
        <Button disabled>Disabled</Button>
      </Box>
      <Box direction={"column"} className="gap-4">
        <LinkButton href="/dashboard">Go to Dashboard</LinkButton>
        <LinkButton href="/profile" variant="secondary">
          View Profile
        </LinkButton>
        <LinkButton href="https://example.com" external variant="outline">
          External Link
        </LinkButton>
        <LinkButton href="/settings" size="lg" variant="ghost">
          Settings
        </LinkButton>
      </Box>
    </Grid>
  );
}
