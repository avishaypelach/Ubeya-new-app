import { createBrowserHistory } from 'history';
import Login from './Components/Login/Login';
import Feed from './Components/Feed/Feed';

const RouterMap: IUbeyaRoute[] = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/feed",
    component: Feed
  },
];

export const history = createBrowserHistory();

export default RouterMap;
