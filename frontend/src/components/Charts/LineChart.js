import React, { useEffect, useState, useMemo } from 'react'
import { LineChart as D3LineChart } from 'react-d3-components'
import { find, flattenDeep, get, maxBy, minBy, values } from 'lodash'
import moment from 'moment'
import * as d3 from 'd3'
import Tooltip from './Tooltip'
import { STATES } from 'config/constants'

const LineChart = ({ trips }) => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleResize() {
    const wrapper = document.querySelector('.linechart')

    if (!wrapper) {
      return
    }

    const { width, height } = wrapper.getBoundingClientRect()

    setViewport({ width, height })
  }

  const data = useMemo(() => {
    if (trips.length === 0) {
      return null
    }

    const res = trips.reduce((acc, elem) => {
      const { home_state, trip_date, trip_count } = elem

      if (!acc[home_state]) {
        acc[home_state] = {
          key: home_state,
          values: {},
        }
      }

      if (!acc[home_state]['values'][trip_date]) {
        const date = Date.parse(trip_date)

        acc[home_state]['values'][trip_date] = {
          state: get(find(STATES, { abbr: home_state }), 'name'),
          x: date,
          y: 0,
        }
      }

      acc[home_state]['values'][trip_date]['y'] += trip_count

      return acc
    }, {})

    const lines = values(res).map(elem => ({
      ...elem,
      values: values(elem.values),
    }))

    const allPoints = flattenDeep(lines.map(line => line.values))
    const minDate = minBy(allPoints, 'x').x
    const maxDate = maxBy(allPoints, 'x').x

    return { lines, minDate, maxDate }
  }, [trips])

  const margin = { top: 30, bottom: 80, left: 50, right: 30 }

  function renderChart() {
    if (!data) {
      return null
    }

    const { lines, minDate, maxDate } = data

    const xScale = d3.time.scale().domain([minDate, maxDate]).range([0, 400])
    const xInterval = Math.round(
      moment(maxDate).diff(moment(minDate), 'days') / 5,
    )

    return (
      <D3LineChart
        data={lines}
        width={viewport.width}
        height={viewport.height}
        margin={margin}
        tooltipHtml={(_, props) => <Tooltip {...props} />}
        xAxis={{
          tickValues: xScale.ticks(d3.time.day, xInterval),
          tickFormat: d3.time.format('%b %e'),
          tickPadding: 20,
          innerTickSize: 5,
          orient: 'right',
        }}
        yAxis={{
          tickFormat: d3.format('s'),
          tickPadding: 20,
          innerTickSize: 5,
        }}
        shapeColor="red"
        stroke="red"
        label={line => line.key}
        colorScale={abbr => get(find(STATES, { abbr }), 'color')}
      />
    )
  }

  return <div className="linechart">{renderChart()}</div>
}

export default LineChart
