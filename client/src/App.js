import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import createCharacter from './components/CreateCharacter/CreateCharacter';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route exact path='/character' component={createCharacter} />
          <Route path='/character/:id' component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
