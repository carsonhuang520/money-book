import React, {Component} from 'react'
import echarts from 'echarts'

import withContext from '../withContext'

class PieChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart: null,
      option: null
    }
  }

  componentDidMount() {
    let myChart = echarts.init(document.getElementById('pie-chart'))
    let option = {
      color: ['rgb(254,67,101)', 'rgb(252,157,154)',
        'rgb(249,205,173)', 'rgb(200,200,169)',
        'rgb(131,175,155)'],
      title: {
        text: '',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: [],
      },
      series: [
        {
          name: '支出',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    myChart.setOption(option)
    this.setState({
      myChart,
      option
    })
  }

  changeData = (data, myChart, option) => {
    const legendData = data.map(item => item.name)
    let temp = JSON.parse(JSON.stringify(option))
    temp.legend.data = legendData
    temp.series[0].data = data
    myChart.setOption(temp, true)
  }

  render() {
    const {myChart, option} = this.state
    const {chartData} = this.props
    if (myChart !== null && option !== null) {
      this.changeData(chartData, myChart, option)
    }
    return (
      <div
        id={'pie-chart'}
        style={{
          width: '100%',
          height: '400px',
          margin: '10px auto 0'
        }}
      />
    )
  }
}

export default withContext(PieChart)