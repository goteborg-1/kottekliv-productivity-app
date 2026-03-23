/**
 * convert ms to readable format
 * @param ms ms to be converted to string
 * @returns string, depending on how long the format changes (eg. "1h 45m" "15m 30s", "45s")
 */
export function makeMsReadable(ms: number): string {
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
