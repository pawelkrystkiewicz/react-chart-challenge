import { MantineProvider } from "@mantine/core"
import { Provider } from "react-redux"
import MainComponent from "./app/setup"
import "./index.css"
import { store } from "./store"

function App() {
  return (
    <Provider store={store}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ fontFamily: "Open Sans" }}
      >
        <MainComponent />
      </MantineProvider>
    </Provider>
  )
}

export default App
