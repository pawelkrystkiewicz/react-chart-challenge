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

function Setup() {
  const enabledCharts = useAppSelector(selectEnabledCharts)
  const params = useAppSelector(selectQueryParams)
  const dispatch = useAppDispatch()
  const [query, { data, error, isLoading }] = useLazyGetChartDataQuery()

  useEffect(() => {
    if (data) {
      dispatch(setCharts(data.enabledCharts))
    }
  }, [data])

  useEffect(() => {
    if (!isLoading) {
      query(params)
    }
  }, [params, isLoading, query])
  const isTablet = useMediaQuery("(max-width: 767px)")
  return (
    <AppUI.Container>
      <AppUI.Title>
        <AppUI.AppLogo src={"logo192.png"} alt="application logo" /> Chart
        Function
      </AppUI.Title>
      <AppUI.Toolbar>
        {isTablet ? (
          <>
            <PopoverWrapper variant="params">
              <ParamsController />
            </PopoverWrapper>
            <PopoverWrapper variant="names">
              <ChartController />
            </PopoverWrapper>
          </>
        ) : (
          <>
            <ParamsController /> <ChartController />
          </>
        )}
      </AppUI.Toolbar>
      <AppUI.Chart>
        <LoadingOverlay visible={isLoading} data-testid='loading-overlay'/>
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

export default Setup
