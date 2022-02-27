import styled from "@emotion/styled"

const UNREMOVABLE_CHART_LEFT_OFFSET = 40

const TABLET = 768
const DESKTOP = 1440

export const Container = styled.main`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 0.3fr 2.2fr 40px;
  gap: 25px 0px;
  grid-template-areas:
    "title"
    "toolbar"
    "chart"
    "footer";
  padding-left: ${UNREMOVABLE_CHART_LEFT_OFFSET};

  @media (min-width: ${TABLET}px) {
    grid-template-rows: 0.3fr 0.5fr 2.2fr 40px;
  }

  @media (min-width: ${DESKTOP}px) {
    padding: 0;
    display: grid;
    grid-template-columns: auto 300px;
    grid-template-rows: 0.5fr 1.5fr 40px;
    gap: 0px 0px;
    grid-template-areas:
      "title ."
      "chart toolbar"
      "footer footer";
  }
`
export const Title = styled.h1`
  grid-area: title;
  align-self: center;
  justify-self: center;

  display: flex;
  align-items: center;

  @media (min-width: ${DESKTOP}px) {
    justify-self: start;
    padding-left: ${UNREMOVABLE_CHART_LEFT_OFFSET}px;
  }
`
export const Toolbar = styled.div`
  grid-area: toolbar;
  display: flex;
  padding: 0 ${UNREMOVABLE_CHART_LEFT_OFFSET}px;

  @media (min-width: ${TABLET}px) {
    gap: 40px;
  }

  @media (min-width: ${DESKTOP}px) {
    flex-direction: column;
    padding: 0;
  }
`
export const Chart = styled.div`
  grid-area: chart;
  padding-right: ${UNREMOVABLE_CHART_LEFT_OFFSET}px;
`
export const Footer = styled.footer`
  grid-area: footer;
  font-size: 12px;

  text-align: center;
  margin-left: auto;
  margin-right: auto;
`

export const AppLogo = styled.img`
  width: 30px;
  height: 100%;
  margin-right: 10px;
  @media (min-width: ${DESKTOP}px) {
    width: 50px;
  }
`
