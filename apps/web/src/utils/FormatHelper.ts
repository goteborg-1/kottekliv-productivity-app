// Extract HH:MM from Date object (Sun Feb 01 2026 17:26:40 GMT+0100 ---> 17:26)
export function formatTime(date: Date): string {
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

// Get YYYY-MM-DD from Date object (Sun Feb 01 2026 17:26:40 GMT+0100 ---> 2026-02-01)
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]!; // using !assertion telling ts it can't be null or undefined
}

export function formatPomodoroDisplay(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const displayMinutes = minutes.toString().padStart(2, "0");
  const displaySeconds = seconds.toString().padStart(2, "0");
  
  return `${displayMinutes}:${displaySeconds}`
}

export function formatTimeString(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  // If there are hours, always show hours and minutes (even if 0min)
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  // If there are minutes, show minutes and seconds
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  
  // Less than a minute, just show seconds
  return `${seconds}s`;
}