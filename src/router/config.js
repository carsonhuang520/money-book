import Login from '../pages/Login'
import Register from '../pages/Register'
import Report from '../pages/Report'
import CreateAccount from '../pages/CreateAccount'
import CreateCategory from '../pages/CreateCategory'
import AccountList from '../pages/AccountList'
import EditCategory from '../pages/EditCategory'

const RouterConfig = [
  {
    path: '/',
    component: CreateAccount,
    auth: true
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/list',
    component: AccountList,
    auth: true
  },
  {
    path: '/report',
    component: Report,
    auth: true
  },
  {
    path: '/editCategory',
    component: EditCategory,
    auth: true
  },
  {
    path: '/addCategory',
    component: CreateCategory,
    auth: true
  }
]

export default RouterConfig