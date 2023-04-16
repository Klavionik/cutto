import { Button, PasswordInput, Stack, Text, TextInput, Tooltip } from "@mantine/core"
import { createLink, getAliasAvailability } from "../api.js"
import { IconAlertCircleFilled, IconCircleCheckFilled } from "@tabler/icons-react"
import { useContext, useEffect, useState } from "react"
import { useDebouncedValue, useFocusTrap } from "@mantine/hooks"
import { DateTimePicker } from "@mantine/dates"
import LinkDone from "./LinkDone.jsx"
import { OwnerContext } from "../OwnerContext.js"
import PageCard from "./PageCard.jsx"
import { SITE_URL } from "../config.js"
import { useForm } from "@mantine/form"
import validators from "../validators.js"

function NewLinkForm({ onSubmit }) {
  const owner = useContext(OwnerContext)
  const form = useForm({
    initialValues: {
      targetUrl: "",
      alias: "",
      password: "",
      expiresAfter: null,
      owner,
    },
    validate: {
      targetUrl: validators.url,
      alias: validators.slug,
      password: validators.password,
      expiresAfter: validators.minTime,
    },
  })
  const [aliasAvailable, setAliasAvailable] = useState(null)
  const alias = form.values.alias || "~auto~"
  const { value, ...aliasProps } = form.getInputProps("alias")
  const [debounced] = useDebouncedValue(value, 300)
  const focusTrapRef = useFocusTrap()

  function resolveAliasIcon() {
    let component = null

    if (aliasAvailable) {
      component = (
        <Tooltip label="Alias available">
          <IconCircleCheckFilled style={{ color: "#12B886" }} />
        </Tooltip>
      )
    }

    if (aliasAvailable === false) {
      component = (
        <Tooltip label="Alias taken">
          <IconAlertCircleFilled style={{ color: "#FA5252" }} />
        </Tooltip>
      )
    }

    return component
  }

  useEffect(() => {
    if (!debounced) return setAliasAvailable(null)

    getAliasAvailability(debounced)
      .then(() => setAliasAvailable(true))
      .catch(() => setAliasAvailable(false))
  }, [debounced])

  function onAliasKeyDown(event) {
    if (!validators.isSlug(event.key)) {
      event.preventDefault()
    }
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Stack spacing={0}>
          <Text c="dimmed" fz="xs" span>
            Your link
          </Text>
          <Text span weight="bold" size="sm" truncate>
            {SITE_URL}/go/
            <Text span color="blue.6">
              {alias}
            </Text>
          </Text>
        </Stack>
        <Stack>
          <TextInput
            ref={focusTrapRef}
            placeholder="https://example.com/extralongurl?with=stuff"
            label="Target URL"
            description="Where the link should lead?"
            withAsterisk
            {...form.getInputProps("targetUrl")}
          />
          <TextInput
            placeholder="myshinylink"
            label="Link alias"
            description="(Optional) Allowed characters: -, a-z, A-Z, 0-9, _"
            rightSection={resolveAliasIcon()}
            {...aliasProps}
            onKeyDown={onAliasKeyDown}
          />
          <PasswordInput
            placeholder="qwerty is a good one"
            label="Password protection"
            description="(Optional) Set a password for the link"
            {...form.getInputProps("password")}
          />
          <DateTimePicker
            label="Expires after"
            description="(Optional) Make the link expire after some time"
            placeholder="Does not expire"
            clearable
            minDate={new Date()}
            {...form.getInputProps("expiresAfter")}
          />
          <Button
            type="submit"
            color="teal.7"
            disabled={!form.values.targetUrl.length || aliasAvailable === false}
          >
            Shorten!
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default function NewLink() {
  const [created, setCreated] = useState(false)
  const [data, setData] = useState({})

  async function onSubmit(payload) {
    const data = await createLink(payload)
    setData(data)
    setCreated(true)
  }

  function handleAddAnother() {
    setData({})
    setCreated(false)
  }

  return (
    <PageCard>
      {created ? (
        <LinkDone data={data} addAnotherHandler={handleAddAnother} />
      ) : (
        <NewLinkForm onSubmit={onSubmit} />
      )}
    </PageCard>
  )
}
