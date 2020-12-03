import React, {Component} from 'react'
import echarts from 'echarts'

let outcomeData = [{name: '吃饭', value: 200}, {name: '购物', value: 124},
  {name: '电影', value: 20}, {name: '车票', value: 20}, {name: '娱乐', value: 200},
  {name: '唱歌', value: 30}]

let incomeData = [{name: '工资', value: 2000}, {name: '兼职', value: 300}, {name: '理财', value: 500}]

class PieChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myChart: null,
      option: null
    }
  }

  componentDidMount() {
    const {type} = this.props
    let myChart = echarts.init(document.getElementById('pie-chart'))
    let seriesData = type === 'outcome' ? outcomeData : incomeData
    let legendData = seriesData.map(item => item.name)
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
        data: legendData,
      },
      series: [
        {
          name: '支出',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          data: seriesData,
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

  changeData() {
    const {type} = this.props
    const {myChart, option} = this.state
    let seriesData = type === 'outcome' ? outcomeData : incomeData
    let legendData = seriesData.map(item => item.name)
    let temp = JSON.parse(JSON.stringify(option))
    temp.legend.data = legendData
    temp.series[0].data = seriesData
    myChart.setOption(temp, true)
    // this.setState({
    //   option: temp
    // })
  }

  render() {
    const {myChart, option} = this.state
    if (myChart !== null && option !== null) {
      this.changeData()
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

export default PieChart