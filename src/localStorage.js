const categories = [
  {
    'name': '饮食费',
    'iconName': 'yinshi',
    'id': '1',
    'type': 'outcome'
  },
  {
    'name': '购物',
    'iconName': 'gouwu',
    'id': '2',
    'type': 'outcome'
  },
  {
    'name': '房费',
    'iconName': 'zhusu',
    'id': '3',
    'type': 'outcome'
  },
  {
    'name': '医疗费',
    'iconName': 'yiliao',
    'id': '4',
    'type': 'outcome'
  },
  {
    'name': '水电费',
    'iconName': 'shuidian',
    'id': '5',
    'type': 'outcome'
  },
  {
    'name': '话费',
    'iconName': 'shouji',
    'id': '6',
    'type': 'outcome'
  },
  {
    'name': '应酬',
    'iconName': 'jiubei',
    'id': '7',
    'type': 'outcome'
  },
  {
    'name': '美容费',
    'iconName': 'meirong',
    'id': '8',
    'type': 'outcome'
  },
  {
    'name': '教育费',
    'iconName': 'baoji',
    'id': '9',
    'type': 'outcome'
  },
  {
    'name': '衣服',
    'iconName': 'cloth',
    'id': '10',
    'type': 'outcome'
  },
  {
    'name': '其他',
    'iconName': 'qita',
    'id': '1000',
    'type': 'outcome'
  },
  {
    'name': '编辑',
    'iconName': 'you',
    'id': '999',
    'type': 'outcome'
  },
  {
    'name': '工资',
    'iconName': 'qianbao',
    'id': '11',
    'type': 'income'
  },
  {
    'name': '兼职',
    'iconName': 'jiangjin',
    'id': '12',
    'type': 'income'
  },
  {
    'name': '投资',
    'iconName': 'touzi',
    'id': '13',
    'type': 'income'
  },
  {
    'name': '礼金',
    'iconName': 'linghuaqian',
    'id': '14',
    'type': 'income'
  },
  {
    'name': '其他',
    'iconName': 'qita',
    'id': '1001',
    'type': 'income'
  },
  {
    'name': '编辑',
    'iconName': 'you',
    'id': '999',
    'type': 'income'
  },
  {
    'name': '奶茶',
    'id': '_70y74tgxl',
    'type': 'outcome',
    'iconName': 'naicha'
  },
  {
    'name': '游戏卖号',
    'id': '_jgb7nxifg',
    'type': 'income',
    'iconName': 'youxi'
  }]
const items = [
  {
    'name': '再次更新标题',
    'price': 2000,
    'date': '2020-09-15',
    'monthCategory': '2020-09',
    'id': '_qmatbbwq0',
    'cid': '6',
    'timestamp': 1536969600000
  },
  {
    'name': '请别人喝茶',
    'price': 300,
    'date': '2020-11-15',
    'monthCategory': '2020-11',
    'id': '_qryggm533',
    'cid': '2',
    'timestamp': 1605398400000
  },
  {
    'name': '饭局',
    'price': 200,
    'date': '2020-11-10',
    'monthCategory': '2020-11',
    'id': '_qmatbbw12',
    'cid': '6',
    'timestamp': 1544400000000
  },
  {
    'name': '饭局第二个',
    'price': 300,
    'date': '2020-11-10',
    'monthCategory': '2020-11',
    'id': '_qmatbbw22',
    'cid': '6',
    'timestamp': 1544400000000
  },
  {
    'name': '兼职收入',
    'price': 500,
    'date': '2020-11-05',
    'monthCategory': '2020-11',
    'timestamp': 1543968000000,
    'id': '_2cdxkbtzi',
    'cid': '11'
  },
  {
    'name': '收入',
    'price': 100,
    'date': '2020-11-05',
    'monthCategory': '2020-11',
    'timestamp': 1543968000000,
    'id': '_znmwyaciy',
    'cid': '11'
  },
  {
    'name': '汽车保养',
    'price': 500,
    'date': '2020-11-09',
    'monthCategory': '2020-11',
    'timestamp': 1544313600000,
    'id': '_2c96vz8d7',
    'cid': '7'
  },
  {
    'name': '宠物美容',
    'price': 200,
    'date': '2020-11-07',
    'monthCategory': '2020-11',
    'timestamp': 1544140800000,
    'id': '_dgqbpp4z8',
    'cid': '9'
  },
  {
    'name': '超市购物',
    'price': 125,
    'date': '2020-11-04',
    'monthCategory': '2020-11',
    'timestamp': 1543881600000,
    'id': '_j0z9no9jk',
    'cid': '3'
  },
  {
    'name': '购买 iphone XR',
    'price': 6000,
    'date': '2020-11-03',
    'monthCategory': '2020-11',
    'timestamp': 1543795200000,
    'id': '_yiwdttati',
    'cid': '4'
  },
  {
    'name': '入账工资',
    'price': 25000,
    'date': '2020-11-08',
    'monthCategory': '2020-11',
    'timestamp': 1544227200000,
    'id': '_dotug7vnn',
    'cid': '10'
  },
  {
    'name': '修改shopping',
    'price': 300,
    'date': '2020-11-29',
    'monthCategory': '2020-11',
    'timestamp': 1606608000000,
    'id': '_s0d8mh296',
    'cid': '11'
  },
  {
    'name': '保养',
    'price': 2000,
    'date': '2020-10-15',
    'monthCategory': '2020-10',
    'timestamp': 1602720000000,
    'id': '_593739op9',
    'cid': '7'
  },
  {
    'name': '兼职',
    'price': 500,
    'date': '2020-11-29',
    'monthCategory': '2020-11',
    'timestamp': 1606608000000,
    'id': '_ymu6zzf73',
    'cid': '14'
  },
  {
    'date': '2020-12-05',
    'name': '看牙齿',
    'price': 600,
    'monthCategory': '2020-12',
    'timestamp': 1607126400000,
    'id': '_sqxc7pxad',
    'cid': '4'
  },
  {
    'name': '买鞋子',
    'date': '2020-12-05',
    'price': 2000,
    'id': '_xmpd4gr3f',
    'timestamp': 1607126400000,
    'monthCategory': '2020-12',
    'cid': '2'
  },
  {
    'name': '发工资啦',
    'date': '2020-12-05',
    'price': 12000,
    'id': '_qrep7eq2l',
    'timestamp': 1607126400000,
    'monthCategory': '2020-12',
    'cid': '11'
  },
  {
    'name': '充话费',
    'date': '2020-12-05',
    'price': 100,
    'id': '_oubymieqj',
    'timestamp': 1607126400000,
    'monthCategory': '2020-12',
    'cid': '6'
  },
  {
    'name': '房租',
    'date': '2020-12-05',
    'price': 1500,
    'id': '_7evwbfxzg',
    'timestamp': 1607126400000,
    'monthCategory': '2020-12',
    'cid': '3'
  },
  {
    'name': '应酬',
    'date': '2020-12-05',
    'price': 2000,
    'id': '_6pxnnr38w',
    'timestamp': 1607126400000,
    'monthCategory': '2020-12',
    'cid': '7'
  },
  {
    'name': '四六级报名',
    'date': '2020-12-05',
    'price': 30,
    'id': '_txe42819k',
    'timestamp': 1607126400000,
    'monthCategory': '2020-12',
    'cid': '9'
  },
  {
    'name': '买衣服',
    'date': '2020-12-05',
    'price': 300,
    'id': '_4cogjymaj',
    'timestamp': 1607126400000,
    'monthCategory': '2020-12',
    'cid': '10'
  },
  {
    'name': '交水费',
    'date': '2020-12-05',
    'price': 24,
    'id': '_wf2akak5x',
    'timestamp': 1607126400000,
    'monthCategory': '2020-12',
    'cid': '5'
  },
  {
    'name': '吃饭',
    'date': '2020-12-04',
    'price': 200,
    'id': '_bxwa6nl7d',
    'timestamp': 1607040000000,
    'monthCategory': '2020-12',
    'cid': '1'
  },
  {
    'name': '买书',
    'date': '2020-12-06',
    'price': 120,
    'id': '_4mxjunwaa',
    'timestamp': 1607212800000,
    'monthCategory': '2020-12',
    'cid': '9'
  },
  {
    'name': '理财',
    'date': '2020-12-06',
    'price': 100,
    'id': '_7ila18s8u',
    'timestamp': 1607212800000,
    'monthCategory': '2020-12',
    'cid': '14'
  },
  {
    'name': '其他',
    'date': '2020-12-06',
    'price': 12,
    'id': '_kysehaxx6',
    'timestamp': 1607212800000,
    'monthCategory': '2020-12',
    'cid': '1000'
  },
  {
    'name': '测试其他',
    'date': '2020-12-06',
    'price': 22,
    'id': '_o8369pktd',
    'timestamp': 1607212800000,
    'monthCategory': '2020-12',
    'cid': '1000'
  },
  {
    'name': '再次测试',
    'date': '2020-12-06',
    'price': 2,
    'id': '_6uxd1gzop',
    'timestamp': 1607212800000,
    'monthCategory': '2020-12',
    'cid': '1000'
  },
  {
    'name': '三次测试',
    'date': '2020-12-06',
    'price': 22,
    'id': '_qjxffl0fb',
    'timestamp': 1607212800000,
    'monthCategory': '2020-12',
    'cid': '1001'
  }]
const newCategory = [
  {
    'id': 1,
    'name': 'caipiao',
    'type': 'outcome'
  },
  {
    'id': 2,
    'name': 'licai',
    'type': 'outcome'
  },
  {
    'id': 3,
    'name': 'xinyongqia',
    'type': 'outcome'
  },
  {
    'id': 4,
    'name': 'zuanshi',
    'type': 'outcome'
  },
  {
    'id': 5,
    'name': 'naicha',
    'type': 'outcome'
  },
  {
    'id': 6,
    'name': 'bitebi',
    'type': 'outcome'
  },
  {
    'id': 7,
    'name': 'youxi',
    'type': 'outcome'
  },
  {
    'id': 8,
    'name': 'mao',
    'type': 'outcome'
  },
  {
    'id': 9,
    'name': 'gou',
    'type': 'outcome'
  },
  {
    'id': 10,
    'name': 'huatong',
    'type': 'outcome'
  }]

export const setItems = (param) => {
  if (!param) {
    if (!localStorage.getItem('items')) {
      localStorage.setItem('items', JSON.stringify(items))
    }
  } else {
    localStorage.setItem('items', JSON.stringify(param))
  }
}

export const setCategories = (param) => {
  if (!param) {
    if (!localStorage.getItem('categories')) {
      localStorage.setItem('categories', JSON.stringify(categories))
    }
  } else {
    localStorage.setItem('categories', JSON.stringify(param))
  }
}

export const setNewCategory = (param) => {
  if (!param) {
    if (!localStorage.getItem('newCategory')) {
      localStorage.setItem('newCategory', JSON.stringify(newCategory))
    }
  } else {
    localStorage.setItem('newCategory', JSON.stringify(param))
  }
}

export const getItems = () => {
  return JSON.parse(localStorage.getItem('items'))
}

export const getCategories = () => {
  return JSON.parse(localStorage.getItem('categories'))
}

export const getNewCategory = () => {
  return JSON.parse(localStorage.getItem('newCategory'))
}

export const setAuthToken = (token) => {
  localStorage.setItem('Authorization', token)
}

export const getAuthToken = () => {
  return localStorage.getItem('Authorization')
}

export const deleteAuthToken = () => {
  localStorage.removeItem('Authorization')
}