import { useEffect, useState } from 'react'
import './App.css'
import { Chart } from './components/chart'
import jsonData from './temp.json'
import { dataMapper } from './utils/data-mapper'
import { AllowedChartNames } from './models/system'

const { data, names } = dataMapper(jsonData)

function App() {
  const [allowedNames, setAllowedNames] = useState<AllowedChartNames>({})

  useEffect(() => {
    let initiallyAllowed: AllowedChartNames = {}
    names.forEach(name => {
      initiallyAllowed[name] = true
    })
    setAllowedNames(initiallyAllowed)
  }, [])

  const toggleChartByName = (name: string) => {
    setAllowedNames(prev => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div className="container">
      {Object.keys(allowedNames).map(name => (
        <div>
          <button onClick={() => toggleChartByName(name)}>
            {name}:{String(allowedNames[name])}
          </button>
        </div>
      ))}
      <Chart data={data} names={allowedNames} />
    </div>
  )
}

export default App
