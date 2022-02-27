import { MantineNumberSize, NumberInput } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { DrawFunctionQueryParams } from "../models/server"
import { selectQueryParams, setQueryParam } from "../store/slices/query-params"

const ParamsController: React.FC = () => {
  const dispatch = useAppDispatch()
  const { from, to, step } = useAppSelector(selectQueryParams)
  const onChange = (target: keyof DrawFunctionQueryParams) => (value: number) =>
    dispatch(setQueryParam({ target, value }))

  const commonProps = {
    radius: "md" as MantineNumberSize,
    required: true,
    stepHoldDelay: 500,
    stepHoldInterval: 100,
  }

  return (
    <div style={{ width: 200 }}>
      <h4>Query parameters</h4>
      <NumberInput
        value={from}
        label="From"
        description={`Start of x axis. Can't be greater than ${to}`}
        onChange={onChange("from")}
        max={to}
        {...commonProps}
      />
      <NumberInput
        value={to}
        label="To"
        description={`End of x axis. Can't be lower than ${from}`}
        onChange={onChange("to")}
        min={from}
        {...commonProps}
      />
      <NumberInput
        value={step}
        label="Step"
        description="Density of chart data. Step each 0.01"
        onChange={onChange("step")}
        step={0.01}
        min={0.01}
        precision={2}
        {...commonProps}
      />
    </div>
  )
}

export default ParamsController
