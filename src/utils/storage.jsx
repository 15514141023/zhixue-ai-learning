export function getStorage(key, defaultValue) {
  const value = localStorage.getItem(key)

  if (!value) {
    return defaultValue
  }

  try {
    return JSON.parse(value)
  } catch (error) {
    console.error('localStorage 解析失败:', error)
    return defaultValue
  }
}

export function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeStorage(key) {
  localStorage.removeItem(key)
}