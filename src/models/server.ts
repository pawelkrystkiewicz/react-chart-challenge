export type DataSet = {
  name: string
  x: number[]
  y: number[]
}

export type DataSets = DataSet[]

export type DrawFunctionQueryParams = {
  step: number
  from: number
  to: number
}
export type DrawFunctionQueryResponse = DataSets
