import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { formattedNum } from '../../utils'
import styled from 'styled-components'
import { Play } from 'react-feather'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import { IconWrapper } from '..'

dayjs.extend(utc)
export const CHART_TYPES = {
  BAR: 'BAR',
  AREA: 'AREA'
}

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)
ChartJS.register(zoomPlugin)

const Wrapper = styled.div`
  position: relative;
`

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 8px;
`

const TitleBlock = styled.div``

const ValueBlock = styled.div`
  font-weight: 700;
  font-size: 20px;
`

const ChartWrapper = styled.div``

const TradingViewChart = ({ type = 'BAR', data, base, baseChange, field, title, width, useWeekly = false }) => {
  // parse and format input data
  const _rawFormatted = (data || []).map(entry => {
    const value = parseFloat(entry[field])
    return {
      time: dayjs
        .unix(entry.date)
        .utc()
        .format('YYYY-MM-DD'),
      value: Number.isFinite(value) ? value : NaN
    }
  })

  let formattedData = _rawFormatted.filter(d => Number.isFinite(d.value))
  if ((!formattedData || formattedData.length === 0) && _rawFormatted.length > 0) {
    formattedData = _rawFormatted.map(d => ({ time: d.time, value: Number.isFinite(d.value) ? d.value : 0 }))
  }

  const labels = formattedData.map(d => d.time)
  const values = formattedData.map(d => d.value)

        // full dataset (all points) — we'll show only the last 30 by default using category index min/max
  const fullLabels = labels
  const fullValues = values
  const totalPoints = fullLabels.length
        const defaultWindow = 30
  const startIndex = Math.max(0, totalPoints - defaultWindow)

  // color bars by up/down compared to previous value
  const backgroundColors = values.map((v, i) => {
    const prev = i > 0 ? values[i - 1] : v
          // brighter green and red for more contrast
          return v >= prev ? '#00C853' : '#FF3B30'
  })

  // simple hex adjuster: darken or lighten by percent (0-1). For dark mode we lighten borders, otherwise darken.
  function adjustHex(hex, percent, lighten = false) {
    // strip '#'
    const h = hex.replace('#', '')
    const bigint = parseInt(h, 16)
    let r = (bigint >> 16) & 255
    let g = (bigint >> 8) & 255
    let b = bigint & 255
    if (lighten) {
      r = Math.min(255, Math.round(r + (255 - r) * percent))
      g = Math.min(255, Math.round(g + (255 - g) * percent))
      b = Math.min(255, Math.round(b + (255 - b) * percent))
    } else {
      r = Math.max(0, Math.round(r * (1 - percent)))
      g = Math.max(0, Math.round(g * (1 - percent)))
      b = Math.max(0, Math.round(b * (1 - percent)))
    }
    const rr = r.toString(16).padStart(2, '0')
    const gg = g.toString(16).padStart(2, '0')
    const bb = b.toString(16).padStart(2, '0')
    return `#${rr}${gg}${bb}`
  }

  const [darkMode] = useDarkModeManager()
  const textColor = darkMode ? '#FFFFFF' : '#111827'
  // increase border contrast a bit more for clarity
  const borderColors = backgroundColors.map(c => adjustHex(c, 0.35, !!darkMode))

  // Chart.js dataset (provide full data but limit visible range with x.min/x.max)
  const chartData = {
    labels: fullLabels,
    datasets: [
      {
        label: title || 'Data',
        data: fullValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        borderRadius: 4,
        // make bars wider: set barThickness and category/bar percentages (default 5-10x wider)
        maxBarThickness: 240,
        barThickness: 56,
        borderSkipped: false
      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: context => formattedNum(context.parsed.y ?? 0, true)
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: 'ctrl'
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'x'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { display: false },
        // increase categoryPercentage/barPercentage to widen bars relative to category (max width)
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        // show only the last `defaultWindow` points by index by default; zoom/pan will reveal others
        min: startIndex,
        max: Math.max(0, totalPoints - 1)
      },
      y: {
        ticks: { color: textColor },
        grid: { color: 'rgba(0,0,0,0.06)' }
      }
    }
  }

  const displayValue = formattedNum(base ?? 0, true)
  const pct = typeof baseChange === 'number' ? baseChange.toFixed(2) : '0.00'
  const pctText = (pct > 0 ? '+' : '') + pct + '%'
  const pctColor = parseFloat(pct) >= 0 ? '#10B981' : '#EF4444'

  const height = 300

  return (
    <Wrapper>
      <Header>
        <TitleBlock>
          <div style={{ fontSize: 14, color: textColor }}>{title}</div>
        </TitleBlock>
        <ValueBlock>
          <span style={{ marginRight: 8, color: textColor }}>{displayValue}</span>
          <span style={{ color: pctColor, fontSize: 14 }}>{pctText}</span>
        </ValueBlock>
      </Header>
      <ChartWrapper>
        <div style={{ width: width || '100%', height }}>
          <Bar data={chartData} options={options} width={width || 600} height={height} />
        </div>
      </ChartWrapper>
      <IconWrapper>
        <Play
          onClick={() => {
            // no-op for Chart.js; placeholder to match previous UI affordance
          }}
        />
      </IconWrapper>
    </Wrapper>
  )
}

export default TradingViewChart
