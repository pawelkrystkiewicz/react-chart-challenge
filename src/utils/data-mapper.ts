import { ChartDataPoint } from '../models/chart'
import { DataSets } from '../models/server'

export interface DataMapperResult {
  data: ChartDataPoint[]
  names: string[]
}

export const dataMapper = (data: DataSets): DataMapperResult => {
  // x is common in API so we can just take it from first chart
  // also assuming there is always response
  let finalData = data[0].x.map(value => ({ x: value }))

  data.forEach(entry => {
    finalData = entry.y.map((value, idx) => ({ [entry.name]: value, ...finalData[idx] }))
  })

  const names = Object.keys(finalData[0]).filter(name => name !== 'x')

  return { data: finalData, names }
}
