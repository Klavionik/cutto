import { Modal, Paper, Stack, Table } from "@mantine/core"
import { useLoaderData, useNavigate } from "react-router-dom"
import { getLinkClicks } from "../api.js"
import { useIsTablet } from "../utils.js"

export async function loader({ params }) {
  return await getLinkClicks(params.owner, params.alias)
}

function DateCell({ date, dateFormatter }) {
  return dateFormatter.format(new Date(date))
}

function CountryCell({ country }) {
  return country || "Unknown"
}

function ClicksTable({ clicks, dateFormatter }) {
  return (
    <Table verticalSpacing="sm">
      <thead>
        <tr>
          <th>Created</th>
          <th>IP</th>
          <th>Country</th>
          <th>User Agent</th>
        </tr>
      </thead>
      <tbody>
        {clicks.map((item) => {
          return (
            <tr key={item.id}>
              <td>
                <DateCell date={item.createdAt} dateFormatter={dateFormatter} />
              </td>
              <td>{item.originIp}</td>
              <td>
                <CountryCell country={item.country} />
              </td>
              <td style={{ maxWidth: 250 }}>{item.userAgent}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

function MobileClicksTable({ clicks, dateFormatter }) {
  return clicks.map((item) => {
    return (
      <Paper shadow="xs" p="xs" key={item.id}>
        <Table>
          <tbody>
            <tr>
              <th>Created</th>
              <td>
                <DateCell date={item.createdAt} dateFormatter={dateFormatter} />
              </td>
            </tr>
            <tr>
              <th>IP</th>
              <td>{item.originIp}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>
                <CountryCell country={item.country} />
              </td>
            </tr>
            <tr>
              <th>User Agent</th>
              <td style={{ maxWidth: 250 }}>{item.userAgent}</td>
            </tr>
          </tbody>
        </Table>
      </Paper>
    )
  })
}

export default function ClicksList() {
  const data = useLoaderData()
  const navigate = useNavigate()
  const toLinkList = () => navigate("..")
  const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "short",
    timeStyle: "short",
  })
  const isTablet = useIsTablet()

  return (
    <Modal
      opened={true}
      size="xl"
      padding="xs"
      fullScreen={isTablet}
      onClose={toLinkList}
      title="Clicks statistics"
    >
      {isTablet ? (
        <Stack>
          <MobileClicksTable clicks={data} dateFormatter={dateFormatter} />
        </Stack>
      ) : (
        <ClicksTable clicks={data} dateFormatter={dateFormatter} />
      )}
    </Modal>
  )
}
