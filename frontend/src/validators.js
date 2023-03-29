import isEmpty from "validator/es/lib/isEmpty.js"
import isLength from "validator/es/lib/isLength.js"
import isURL from "validator/es/lib/isURL.js"
import isUUID from "validator/es/lib/isUUID.js"

const TIME_LEEWAY = 60 * 5 * 1000 // 5 minutes.

function isSlug(value) {
  return /[-a-zA-Z0-9_]+/.test(value)
}

function slug(value) {
  if (isEmpty(value)) return null
  if (!isLength(value, { min: 4, max: 50 })) return "Min. 4 characters, max. 50 characters"
}

function password(value) {
  if (!isLength(value, { max: 12 })) return "Max. 12 characters"
}

function url(value) {
  if (isEmpty(value)) return "Required"
  if (!isURL(value)) return "Has to be a valid URL"
}

function minTime(value) {
  if (!value) return null

  const formatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
    timeStyle: "short",
  })
  const minDatetime = new Date(Number(new Date()) + TIME_LEEWAY)
  return value < minDatetime ? `Min. date: ${formatter.format(minDatetime)}` : null
}

function uuid(value) {
  console.log(value)
  if (!isUUID(value, 4)) return "Invalid ID"
}

const validators = { url, uuid, slug, password, minTime, isSlug }

export default validators
