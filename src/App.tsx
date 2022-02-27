import { Global, MantineProvider } from "@mantine/core"
import "./index.css"
import Setup from "./app/setup"
import { store } from "./store"
import { Provider } from "react-redux"

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
