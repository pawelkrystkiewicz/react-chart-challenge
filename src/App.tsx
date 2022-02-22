import { useEffect, useState } from 'react'
import './App.css'
import { Chart } from './components/chart'
import { DrawFunctionQueryParams } from './models/server'
import { AllowedChartNames as ChartNames } from './models/system'
import { useLazyGetChartDataQuery } from './store/services/chart-data-api'

const getStateShape = (names: string[]) => {
  let computedNames: ChartNames = {}
  names.forEach((name: string) => {
    computedNames[name] = true
  })
  return computedNames
}

function App() {
  const [allowedNames, setChartNames] = useState<ChartNames>({})
  const [params, setParams] = useState<DrawFunctionQueryParams>({ from: 2, to: 2, step: 0.1 })
  const [query, { data, error, isLoading }] = useLazyGetChartDataQuery()

  useEffect(() => {
    if (data) {
      let computedNames = getStateShape(data.names)
      setChartNames(computedNames)
    }
  }, [data])

  useEffect(() => {
    if (!isLoading) {
      query(params)
    }
  }, [])

  const toggleChartByName = (name: string) => {
    setChartNames(prev => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div className="container">
      {Object.keys(allowedNames).map(name => (
        <div key={name}>
          <button onClick={() => toggleChartByName(name)}>
            {name}:{String(allowedNames[name])}
          </button>
        </div>
      ))}
      {data && <Chart data={data.data} names={allowedNames} />}
      {error && <div>{error}</div>}
    </div>
  )
}

export default App
