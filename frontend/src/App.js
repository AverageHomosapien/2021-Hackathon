import logo from './logo.svg';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './Header/header-index'
import './App.css';

function App() {
  return (
      <Router>
          <div className="App">
              <div>
                  <Route path="/" component={Header}/>
              </div>
              {/* <Route exact path="/home" component={HomeIndex}/> */}
          </div>
      </Router>
  )
}

export default App;
