export function getItem(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data).value : null
}

export function setItem(key, value) {
  const data = JSON.stringify({ value })
  localStorage.setItem(key, data)
}
