import { MantineProvider } from "@mantine/core"
import { Provider } from "react-redux"
import Setup from "./app/setup"
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
        <Setup />
      </MantineProvider>
    </Provider>
  )
}

export default App
