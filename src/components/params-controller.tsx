import { Button, MantineNumberSize, NumberInput } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { DrawFunctionQueryParams } from "../models/server"
import { useLazyGetChartDataQuery } from "../store/services/chart-data-api"
import { selectQueryParams, setQueryParam } from "../store/slices/query-params"

interface ParamsControllerProps {
  query: (params: DrawFunctionQueryParams) => void
  loading: boolean
}

const ParamsController: React.FC<ParamsControllerProps> = ({
  query,
  loading,
}) => {
  const dispatch = useAppDispatch()
  const { from, to, step } = useAppSelector(selectQueryParams)
  const onChange = (target: keyof DrawFunctionQueryParams) => (value: number) =>
    dispatch(setQueryParam({ target, value }))

  const queryAPI = () => query({ from, to, step })

  const onKeyPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      queryAPI()
    }
  }

  const commonProps = {
    radius: "md" as MantineNumberSize,
    required: true,
    stepHoldDelay: 500,
    stepHoldInterval: 100,
    onKeyPress: onKeyPressEnter,
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
      <Button
        mt={20}
        variant={"outline"}
        fullWidth
        size="sm"
        radius={commonProps.radius}
        onClick={queryAPI}
        disabled={loading}
        loading={loading}
      >
        Confirm
      </Button>
    </div>
  )
}

export default ParamsController
