import { Modal, Table } from "@mantine/core"
import { useLoaderData, useNavigate } from "react-router-dom"
import { getLinkClicks } from "../api.js"

export async function loader({ params }) {
  return await getLinkClicks(params.owner, params.alias)
}

function ClicksTable({ clicks }) {
  const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "short",
    timeStyle: "short",
  })
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
              <td>{dateFormatter.format(new Date(item.createdAt))}</td>
              <td>{item.originIp}</td>
              <td>{item.country || "Unknown"}</td>
              <td style={{ maxWidth: 250 }}>{item.userAgent}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default function ClicksList() {
  const data = useLoaderData()
  const navigate = useNavigate()
  const toLinkList = () => navigate("..")

  return (
    <Modal opened={true} size="xl" onClose={toLinkList} title="Clicks statistics">
      <ClicksTable clicks={data} />
    </Modal>
  )
}
