import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "../App"
import { rest } from "msw"
import { setupServer } from "msw/node"
import data from "./fakes/data-input.json"

describe("App Component", () => {
  const handlers = [
    rest.get("http://d148j.mocklab.io/points", (req, res, ctx) => {
      return res(ctx.json(data), ctx.delay(150))
    }),
  ]

  const server = setupServer(...handlers)
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("should render all main components", () => {
    render(<App />)
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
  })

  describe("should change value of query params", () => {
    ;[
      {
        description: "should change [from] input",
        label: /From/,
        payload: { initial: "2", changed: 1 },
        expected: "1",
      },
      {
        description: "should change [to] input",
        label: /To/,
        payload: { initial: "2", changed: 1 },
        expected: "1",
      },
      {
        description: "should change [step] input",
        label: /Step/,
        payload: { initial: "0.10", changed: 0.5 },
        expected: "0.50",
      },
    ].forEach(({ description, label, payload, expected }) => {
      it(description, () => {
        const { getByLabelText } = render(<App />)
        const input = getByLabelText(label) as HTMLInputElement

        expect(input.value).toBe(payload.initial)
        fireEvent.change(input, { target: { value: payload.changed } })
        expect(input.value).toBe(expected)
      })
    })
  })
})
