interface calculateDurationProps {
  date: string,
  start: string,
  end: string,
}

//Calculate msDuration if added manually
function calculateDuration({date, start, end}: calculateDurationProps): number {
  const startTime: Date = new Date(`${date} ${start}`)
  const endTime: Date = new Date(`${date} ${end}`)
  
  let msDuration: number = endTime.getTime() - startTime.getTime()

  //If working over midnight
  if (msDuration < 0) {
    msDuration += 24 * 60 * 60 * 1000
  }
  
  return msDuration // Returns ms
}

export default calculateDuration