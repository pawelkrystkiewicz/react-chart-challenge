import { MantineProvider } from "@mantine/core"
import { Provider } from "react-redux"

import "./index.css"
import { store } from "./store"
import MainComponent from "./app/main"

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
