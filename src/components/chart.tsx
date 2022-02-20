import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartDataPoint } from '../models/chart'
import { AllowedChartNames } from '../models/system'
import jsonData from '../temp.json'
import { dataMapper } from '../utils/data-mapper'

interface ChartProps {
  data: ChartDataPoint[]
  names: AllowedChartNames
}

export const Chart: React.FC<ChartProps> = ({ data, names }) => {
  return (
    <LineChart width={1000} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(names).map(
        name => names[name] && <Line key={name} type="monotone" dataKey={name} stroke="#8884d8" activeDot={{ r: 2 }} />,
      )}
    </LineChart>
  )
}
