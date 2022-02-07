import './App.scss';
import {Main, Game, Options, Results, Rules} from './components';

function App() {
  return (
    <div className="App">
      <Main>
        <Game label="New Game" />
        <Options label="Options" />
        <Rules label="Rules" />
      </Main>
    </div>
  );
}

export default App;
