import { LoadingOverlay } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { useEffect } from "react"
import { Chart } from "../components/chart"
import ChartController from "../components/chart-controller/chart-controller"
import ErrorInfo from "../components/error-alert"
import ParamsController from "../components/params-controller"
import PopoverWrapper from "../components/popover-wrapper"
import * as AppUI from "../components/styled"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { useLazyGetChartDataQuery } from "../store/services/chart-data-api"
import { selectEnabledCharts, setCharts } from "../store/slices/enabled-charts"
import { selectQueryParams } from "../store/slices/query-params"

function MainComponent() {
  const enabledCharts = useAppSelector(selectEnabledCharts)
  const dispatch = useAppDispatch()
  const [query, { data, error, isLoading }] = useLazyGetChartDataQuery()

  useEffect(() => {
    if (data) {
      dispatch(setCharts(data.enabledCharts))
    }
  }, [data, dispatch])

  const isTablet = useMediaQuery("(max-width: 767px)")

  const Params = <ParamsController query={query} loading={isLoading} />
  const ChartCtrl = <ChartController />

  return (
    <AppUI.Container>
      <AppUI.Title>
        <AppUI.AppLogo src={"logo192.png"} alt="application logo" /> Chart
        Function
      </AppUI.Title>
      <AppUI.Toolbar>
        {isTablet ? (
          <>
            <PopoverWrapper variant="params">{Params}</PopoverWrapper>
            <PopoverWrapper variant="names">{ChartCtrl}</PopoverWrapper>
          </>
        ) : (
          <>
            {Params} {ChartCtrl}
          </>
        )}
      </AppUI.Toolbar>
      <AppUI.Chart>
        <LoadingOverlay visible={isLoading} data-testid="loading-overlay" />
        {data && !error && (
          <Chart data={data.chartData} names={enabledCharts} />
        )}
        {error && (
          <ErrorInfo
            message={
              "There was an error with yor query. Please try again with different parameters"
            }
            details={JSON.stringify(error)}
          />
        )}
      </AppUI.Chart>
      <AppUI.Footer>
        Paweł Krystkiewicz &copy; {new Date().getFullYear()}
      </AppUI.Footer>
    </AppUI.Container>
  )
}

export default MainComponent
