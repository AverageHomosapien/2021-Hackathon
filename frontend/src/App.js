import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Header/header-index'
import Profile from './Profile/profile-index'
import Home from './Home-Page/home-page-index'
import Footer from './Footer/footer-index'
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <div>
                    <Route path="/" component={Header} />
                </div>
                <Route exact path="/home" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <div>
                    <Route path="/" component={Footer} />
                </div>
            </div>
        </Router>
    )
}

export default App;
