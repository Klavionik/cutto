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
  if (Array.isArray(payload)) {
    return payload.map((item) =>
      Object.fromEntries(Object.entries(item).map(transformKey(camelCase)))
    )
  }

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

export const createOwner = () => {
  return client.post("owner/").json()
}

export const listOwnerLinks = (owner) => {
  return client.get(`owner/${owner}/links/`).json().then(adaptFromServer)
}

export const deleteOwnerLinks = (owner) => {
  return client.delete(`owner/${owner}/links/`)
}

export const getAliasAvailability = (alias) => {
  return client.get(`alias-availablity/${alias}/`)
}
