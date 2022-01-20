import './App.scss';
import Card from './components/Card/Card';

function App() {
  return (
    <div className="App">
        <Card color="red" shape="diamond" fill="shaded" number={2}/>
       <Card color="violet" shape="stadium" fill="filled" number={2}/>
      <Card color="violet" shape="stadium" fill="blank" number={3}/>
      <Card color="green" shape="squiggle" fill="filled" number={2}/>
      <Card color="red" shape="diamond" fill="filled" number={1}/>
      <Card color="violet" shape="diamond" fill="shaded" number={1}/>


    </div>
  );
}

export default App;
