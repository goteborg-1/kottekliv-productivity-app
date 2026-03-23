// For mobile version of local storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveToStorage(key: string, value: unknown) {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    console.error(`[Storage] Could not save "${key}":`, e);
  }
}

export async function getFromStorage(key: string) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`[Storage] Could not read "${key}":`, e);
    return null;
  }
}