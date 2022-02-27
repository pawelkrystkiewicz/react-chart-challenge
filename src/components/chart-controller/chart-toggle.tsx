import { UnstyledButton } from "@mantine/core"
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"
import { useAppDispatch } from "../../hooks/redux"
import { toggleChart } from "../../store/slices/enabled-charts"

interface ChartToggleProps {
  enabled: boolean
  name: string
  key?: string
}

const ChartToggle: React.FC<ChartToggleProps> = ({ name, enabled }) => {
  const dispatch = useAppDispatch()
  const toggle = () => dispatch(toggleChart(name))
  return (
    <UnstyledButton onClick={toggle}>
      {enabled ? <EyeOpenIcon /> : <EyeClosedIcon />}&nbsp;{name}
    </UnstyledButton>
  )
}

export default ChartToggle
