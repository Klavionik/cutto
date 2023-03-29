import { Button, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core"
import { createLink } from "../api.js"
import { DateTimePicker } from "@mantine/dates"
import LinkDone from "./LinkDone.jsx"
import { OwnerContext } from "../OwnerContext.js"
import { SITE_URL } from "../config.js"
import { useContext } from "react"
import { useForm } from "@mantine/form"
import { useState } from "react"
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
  const alias = form.values.alias || "~auto~"

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Text truncate>
          Your link:&nbsp;
          <Text span weight="bold">
            {SITE_URL}/go/
            <Text span color="blue.6">
              {alias}
            </Text>
          </Text>
        </Text>
        <TextInput
          placeholder="https://example.com/extralongurl?with=stuff"
          label="Target URL"
          description="Where the link should lead?"
          withAsterisk
          {...form.getInputProps("targetUrl")}
        />
        <TextInput
          placeholder="myshinylink"
          label="Link alias"
          description="(Optional) Fill it or leave it blank to autogenerate"
          {...form.getInputProps("alias")}
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
        <Button type="submit" color="teal.7">
          Shorten!
        </Button>
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

  return (
    <Paper shadow="md" p="xl" withBorder maw={600}>
      {created ? <LinkDone data={data} /> : <NewLinkForm onSubmit={onSubmit} />}
    </Paper>
  )
}
