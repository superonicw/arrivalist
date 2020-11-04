import React, { useState, useMemo, memo } from 'react'
import ReactTooltip from 'react-tooltip'
import { geoCentroid } from 'd3-geo'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from 'react-simple-maps'
import numeral from 'numeral'
import { find } from 'lodash'
import mapData from 'config/mapData'
import { STATES } from 'config/constants'

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
}

const MapChart = ({ trips }) => {
  const [tooltipContent, setTooltipContent] = useState('')

  const data = useMemo(() => {
    return trips.reduce((acc, elem) => {
      const { home_state, trip_count } = elem

      if (!acc[home_state]) {
        acc[home_state] = 0
      }

      acc[home_state] += trip_count
      return acc
    }, {})
  }, [trips])

  const tooltipEnabled = useMemo(() => {
    return trips.length > 0
  }, [trips])

  return (
    <div>
      <ComposableMap data-tip="" projection="geoAlbersUsa">
        <Geographies geography={mapData}>
          {({ geographies }) => (
            <>
              {geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill="#DDD"
                  onMouseEnter={() => {
                    const state = find(STATES, { id: geo.id })

                    tooltipEnabled &&
                      state &&
                      setTooltipContent(
                        `${geo.properties.name}: ${numeral(
                          data[state.abbr] || 0,
                        ).format('0,0')}`,
                      )
                  }}
                  onMouseLeave={() => {
                    tooltipEnabled && setTooltipContent('')
                  }}
                  style={{
                    default: {
                      fill: '#D6D6DA',
                      outline: 'none',
                    },
                    hover: {
                      fill: '#F53',
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                />
              ))}
              {geographies.map(geo => {
                const centroid = geoCentroid(geo)
                const state = find(STATES, { id: geo.id })

                return (
                  <g key={geo.rsmKey + '-name'}>
                    {state &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(state.abbr) === -1 ? (
                        <Marker coordinates={centroid}>
                          <text y="2" fontSize={14} textAnchor="middle">
                            {state.abbr}
                          </text>
                        </Marker>
                      ) : (
                        <Annotation
                          subject={centroid}
                          dx={offsets[state.abbr][0]}
                          dy={offsets[state.abbr][1]}
                        >
                          <text x={4} fontSize={14} alignmentBaseline="middle">
                            {state.abbr}
                          </text>
                        </Annotation>
                      ))}
                  </g>
                )
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </div>
  )
}

export default memo(MapChart)
