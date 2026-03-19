export async function saveToStorage(key: string, value: unknown) {
  const stringValue = JSON.stringify(value)
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(key, stringValue)
  } else {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default
    await AsyncStorage.setItem(key, stringValue)
  }
}

export async function getFromStorage(key: string) {
  if (typeof window !== 'undefined' && window.localStorage) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } else {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default
    const data = await AsyncStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }
}