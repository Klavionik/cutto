import isEmpty from "validator/es/lib/isEmpty.js"
import isLength from "validator/es/lib/isLength.js"
import isSlug from "validator/es/lib/isSlug.js"
import isURL from "validator/es/lib/isURL.js"

const TIME_LEEWAY = 60 * 5 * 1000 // 5 minutes.

function slug(value) {
  if (isEmpty(value)) return null
  if (!isSlug(value)) return "Allowed characters: -, a-z, A-Z, 0-9, _"
  if (!isLength(value, { max: 50 })) return "Max. 50 characters"
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

const validators = { url, slug, password, minTime }

export default validators
