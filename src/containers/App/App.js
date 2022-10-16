import React from "react";
import {Route} from "react-router-dom";
import Layout from "../../components/Layout/Layout";

export default function App() {
  return (
    <div>
          <Route exact path="/" component={Layout} />
    </div>
  );
}
