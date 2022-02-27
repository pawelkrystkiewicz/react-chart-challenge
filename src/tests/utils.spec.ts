import { dataMapper } from "../utils/data-mapper"
import input from "./fakes/data-input.json"
import output from "./fakes/data-output.json"
import {
  getDarkerMantineShades as getDarkerMantineShades,
  getTextValue,
  getValueBasedColor,
} from "../utils/chart-color-functions"

describe.only("utils functions", () => {
  describe("dataMapper", () =>
    [
      {
        description: "should handle [undefined] input gracefully",
        input: undefined,
        expected: { chartData: [], enabledCharts: {} },
      },
      {
        description: "should handle [empty] input gracefully",
        input: [],
        expected: { chartData: [], enabledCharts: {} },
      },
      {
        description: "should handle optimistic scenario with known data shape",
        input: input,
        expected: output,
      },
    ].forEach(({ description, input, expected }) =>
      it(description, () => {
        expect(dataMapper(input as any)).toStrictEqual(expected)
      })
    ))
  describe("getDarkerMantineShades", () =>
    [
      {
        description: "should return last 4 elements of array",
        input: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        expected: ["7", "8", "9", "10"],
      },
    ].forEach(({ description, input, expected }) =>
      it(description, () => {
        expect(getDarkerMantineShades(input as any)).toStrictEqual(expected)
      })
    ))

  describe("getTextValue", () =>
    [
      {
        description: "should handle empty string",
        input: "",
        expected: 0,
      },
      {
        description: "should return unique value of text [a]",
        input: "a",
        expected: 1,
      },
      {
        description: "should return unique value of text [hello]",
        input: "hello",
        expected: 52,
      },
    ].forEach(({ description, input, expected }) =>
      it(description, () => {
        expect(getTextValue(input)).toEqual(expected)
      })
    ))

  describe("getValueBasedColor", () =>
    [
      {
        description: "should handle empty string value [0]",
        input: 0,
        expected: "#ff0000",
      },
      {
        description: "should handle value of single letter [a]",
        input: 1,
        expected: "#ffa500",
      },
      {
        description:
          "should handle value bigger then size of colors array [hello = 52]",
        input: 52,
        expected: "#008000",
      },
    ].forEach(({ description, input, expected }) =>
      it(description, () => {
        const colors = [
          "#ff0000",
          "#ffa500",
          "#ffff00",
          "#008000",
          "#0000ff",
          "#4b0082",
          "#ee82ee",
        ]
        const getColor = getValueBasedColor(colors)
        expect(getColor(input as any)).toEqual(expected)
      })
    ))
})
