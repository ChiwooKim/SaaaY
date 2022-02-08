
let eventGuid = 0
// eslint-disable-next-line prefer-const
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export function createEventId() {
  return String(eventGuid++)
}
