import { MantineColorSet } from "../models/system"

export const getTextValue = (text: string): number => {
  let value = 0
  const characters = text.split("")

  for (let i in characters) {
    value += characters[i].toUpperCase().charCodeAt(0) - 64
  }

  return value
}

export const getDarkerMantineShades = (colorSet: MantineColorSet): string[] =>
  colorSet.slice(-4)

export const getValueBasedColor =
  (colors: string[]) =>
  (value: number): string => {
    const length = colors.length
    const idx = Math.abs(value % length)
    return colors[idx]
  }
