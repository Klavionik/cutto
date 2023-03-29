import {
  Alert,
  Button,
  List,
  Paper,
  Popover,
  Stack,
  Text,
  TextInput,
  Title,
  TypographyStylesProvider,
} from "@mantine/core"
import { OwnerContext } from "../OwnerContext.js"
import { useContext } from "react"

export default function Welcome() {
  const owner = useContext(OwnerContext)

  return (
    <Paper shadow="md" p="xl" pt={0} withBorder maw={600}>
      <TypographyStylesProvider>
        <Title>Welcome!</Title>
        <Text>This little homemade shortener is capable of:</Text>

        <List>
          <List.Item>Creating short links (obviously)</List.Item>
          <List.Item>Applying expiration date and password to the link</List.Item>
          <List.Item>Using custom or autogenerated link alias</List.Item>
          <List.Item>Displaying link history</List.Item>
          <List.Item>Tracking click statistics</List.Item>
        </List>

        <Alert color="orange" title="Important">
          <Text>
            On the first visit you are assigned a unique ID that will be used to keep the
            association between you and the links you create and provide access to your history and
            statistics.
          </Text>
          <br />
          <Text>
            Your unique ID:&nbsp;
            <Text span weight="bold">
              {owner}
            </Text>
            <br />
            <br />
            <Popover width={300} position="top-start" withArrow shadow="md">
              <Popover.Target>
                <Button color="red.6" variant="outline">
                  Not your ID?
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack>
                  <Text size={12}>
                    Enter your previous ID and click&nbsp;
                    <Text span weight="bold">
                      Apply
                    </Text>
                    &nbsp;to reclaim access.
                  </Text>
                  <TextInput size="xs" />
                  <Button size="xs" variant="filled" color="green">
                    Apply
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Text>
        </Alert>
      </TypographyStylesProvider>
    </Paper>
  )
}