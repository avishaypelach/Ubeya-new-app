import React from 'react';
import './App.css';
import { Route, Router } from "react-router-dom";
import Routes, { history } from "./Router";

function App() {
  const _router = React.createRef<Router>();
  const _renderRoutes = (UbeyaRoute: IUbeyaRoute, idx: number) => <Route key={idx} {...UbeyaRoute} />;

  return (
    <Router history={history} ref={_router}>
      <div className="App">
        <button className="logout" onClick={() => history.push("/login")}>Logout</button>
        {Routes.map(_renderRoutes)}
      </div>
    </Router>
  );
}

export default App;
