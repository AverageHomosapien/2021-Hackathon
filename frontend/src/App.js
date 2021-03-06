import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Header/header-index'
import Profile from './Profile/profile-index'
import Home from './Home-Page/home-page-index'
import ChatUI from './Chat/chat-index'

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/" component={Header} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/chats/:id" component={ChatUI} />
            </div>
        </Router>
    )
}

export default App;
