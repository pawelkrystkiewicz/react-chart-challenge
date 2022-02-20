export type DataSet = {
  name: string
  x: number[]
  y: number[]
}

export type DataSets = DataSet[]
export type ServerResponse = { result: DataSet[] }
