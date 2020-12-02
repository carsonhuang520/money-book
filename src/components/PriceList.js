import React, {Component} from 'react'
import PriceItem from './PriceItem'

const list = {
  '2020-09-15': [{
    'name': '兼职',
    'price': 200,
    'date': '2020-09-15',
    'monthCategory': '2020-9',
    'id': '_qmatbbwq0',
    'type': 'income',
    'timestamp': 1536969600000
  },
    {
      'name': '买手机',
      'price': 2000,
      'date': '2020-09-15',
      'monthCategory': '2020-9',
      'id': '_qmatbbwq09',
      'type': 'outcome',
      'timestamp': 1536969600000
    }],
  '2020-09-10': [{
    'name': '发工资',
    'price': 1300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_qryggm2533',
    'type': 'income',
    'timestamp': 1605398400000
  }, {
    'name': '请别人喝茶',
    'price': 300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_qryggm5323',
    'type': 'outcome',
    'timestamp': 1605398400000
  }, {
    'name': '请别人喝茶',
    'price': 300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_qrygg1m533',
    'type': 'outcome',
    'timestamp': 1605398400000
  }],
  '2020-09-07': [{
    'name': '发工资',
    'price': 1300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_2qryggm2533',
    'type': 'income',
    'timestamp': 1605398400000
  }, {
    'name': '请别人喝茶',
    'price': 300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_2qryggm5323',
    'type': 'outcome',
    'timestamp': 1605398400000
  }, {
    'name': '请别人喝茶',
    'price': 300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_2qrygg1m533',
    'type': 'outcome',
    'timestamp': 1605398400000
  }],
  '2020-09-05': [{
    'name': '发工资',
    'price': 1300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_21qryggm2533',
    'type': 'income',
    'timestamp': 1605398400000
  }, {
    'name': '请别人喝茶',
    'price': 300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_21qryggm5323',
    'type': 'outcome',
    'timestamp': 1605398400000
  }, {
    'name': '请别人喝茶',
    'price': 300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_21qrygg1m533',
    'type': 'outcome',
    'timestamp': 1605398400000
  }, {
    'name': '请别人喝茶',
    'price': 300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_211qrygg1m533',
    'type': 'outcome',
    'timestamp': 1605398400000
  }, {
    'name': '请别人喝茶',
    'price': 300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_211qrygg1m533',
    'type': 'outcome',
    'timestamp': 1605398400000
  }, {
    'name': '请别人喝茶',
    'price': 300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_211qrygg1m533',
    'type': 'outcome',
    'timestamp': 1605398400000
  }]
}

class PriceList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={'priceList-wrapper'}>
        {
          Object.keys(list).map(item => {
            return <PriceItem key={item} time={item} list={list[item]}/>
          })
        }
      </div>
    )
  }
}

export default PriceList