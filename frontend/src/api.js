import { camelCase } from "camel-case"
import ky from "ky"
import { SITE_URL } from "./config.js"
import { snakeCase } from "snake-case"

const client = ky.create({
  prefixUrl: `${SITE_URL}/api`,
})

const transformKey =
  (transformFunction) =>
  ([key, value]) =>
    [transformFunction(key), value]

const adaptFromServer = (payload) => {
  return Object.fromEntries(Object.entries(payload).map(transformKey(camelCase)))
}

const adaptToServer = (payload) => {
  return Object.fromEntries(Object.entries(payload).map(transformKey(snakeCase)))
}

export const createLink = (payload) => {
  return client
    .post("links/", { json: adaptToServer(payload) })
    .json()
    .then(adaptFromServer)
}
