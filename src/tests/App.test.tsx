import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import App from "../App"

describe("App Component", () => {
  test("renders all main components", async () => {
    const { container } = render(<App />)
    const title = screen.getByText(/chart function/i)
    const queryParamsController = screen.getByText(/query parameters/i)
    const chartNamesController = screen.getByText(/enabled charts/i)
    const chartLoadingOverlay = screen.getByTestId(/loading-overlay/i)
    const footer = screen.getByText(/©/i)

    expect(title).toBeInTheDocument()
    expect(queryParamsController).toBeInTheDocument()
    expect(chartNamesController).toBeInTheDocument()
    expect(chartLoadingOverlay).toBeInTheDocument()
    expect(footer).toBeInTheDocument()

    await waitFor(() => {
      expect(
        container.getElementsByClassName("recharts-responsive-container").length
      ).toEqual(1)
    })
  })
})
