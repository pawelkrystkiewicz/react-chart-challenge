import { useMantineTheme } from "@mantine/core"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { ChartDataPoint } from "../models/chart"
import { EnabledChartNames } from "../models/system"
import {
  getDarkerMantineShades,
  getTextValue,
  getValueBasedColor,
} from "../utils/chart-color-functions"

interface ChartProps {
  data?: ChartDataPoint[]
  names: EnabledChartNames
}

export const Chart: React.FC<ChartProps> = ({ data, names }) => {
  const {
    colors: { dark, blue, green, orange, red, grape },
  } = useMantineTheme()

  const colors = [
    ...getDarkerMantineShades(blue),
    ...getDarkerMantineShades(green),
    ...getDarkerMantineShades(orange),
    ...getDarkerMantineShades(red),
    ...getDarkerMantineShades(grape),
  ]

  const getColor = getValueBasedColor(colors)

  return (
    <ResponsiveContainer width="100%" minHeight={350} data-testid="chart">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" axisLine={false} />
        <YAxis axisLine={false} />
        <ReferenceLine xAxisId={0} x={0} stroke={dark[2]} />
        <ReferenceLine yAxisId={0} y={0} stroke={dark[2]} />
        <Tooltip />
        <Legend />
        {Object.keys(names).map(
          name =>
            names[name] && (
              <Line
                yAxisId={0}
                xAxisId={0}
                key={name}
                dataKey={name}
                type="monotone"
                stroke={getColor(getTextValue(name))}
                activeDot={{ r: 2 }}
              />
            )
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
