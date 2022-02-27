import { useAppSelector } from "../../hooks/redux"
import { selectEnabledCharts } from "../../store/slices/enabled-charts"
import ChartToggle from "./chart-toggle"
import { ChartControllerContainer } from "./styled"

const ChartController: React.FC = () => {
  const enabledCharts = useAppSelector(selectEnabledCharts)

  return (
    <ChartControllerContainer>
      <h4>Enabled charts</h4>
      {Object.keys(enabledCharts).map(name => (
        <ChartToggle key={name} name={name} enabled={enabledCharts[name]} />
      ))}
    </ChartControllerContainer>
  )
}

export default ChartController
