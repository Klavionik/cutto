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
import { useLocalStorage, useToggle } from "@mantine/hooks"
import { getOwner } from "../api.js"
import { useForm } from "@mantine/form"
import validators from "../validators.js"

export default function Welcome() {
  const form = useForm({
    initialValues: {
      ownerId: "",
    },
    validate: {
      ownerId: validators.uuid,
    },
  })
  const [owner, setOwner] = useLocalStorage({ key: "owner", getInitialValueInEffect: false })
  const [opened, toggleOpened] = useToggle()

  async function handleSubmit(values) {
    try {
      await getOwner(values.ownerId)
    } catch (e) {
      if (e?.response?.status === 404) {
        form.setFieldError("ownerId", "ID does not exist.")
        return
      }
      throw e
    }

    toggleOpened()
    setOwner(values.ownerId)
  }

  return (
    <Paper shadow="md" p="xl" pt={0} withBorder maw={600}>
      <TypographyStylesProvider>
        <Title order={2}>Welcome!</Title>
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
            <Popover
              width={300}
              position="top-start"
              withArrow
              trapFocus
              shadow="md"
              opened={opened}
              onChange={toggleOpened}
              onClose={() => form.reset()}
            >
              <Popover.Target>
                <Button color="red.6" variant="outline" onClick={() => toggleOpened()}>
                  Not your ID?
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <form method="post" onSubmit={form.onSubmit(handleSubmit)}>
                  <Stack>
                    <Text size={12}>
                      Enter your previous ID and click&nbsp;
                      <Text span weight="bold">
                        Apply
                      </Text>
                      &nbsp;to reclaim access.
                    </Text>
                    <TextInput size="xs" {...form.getInputProps("ownerId")} />
                    <Button
                      size="xs"
                      style={{ alignSelf: "flex-start" }}
                      variant="filled"
                      color="green"
                      type="submit"
                    >
                      Apply
                    </Button>
                  </Stack>
                </form>
              </Popover.Dropdown>
            </Popover>
          </Text>
        </Alert>
      </TypographyStylesProvider>
    </Paper>
  )
}
