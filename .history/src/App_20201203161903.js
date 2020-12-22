import './App.css';
import Alert from './Alert';
import Alert from './Alert';

function App() {
  const alertHandle = () => {
    console.log('点击了弹出提示框按钮！');
    console.log('Alert', Alert);
  };

  return (
    <div className="App">
      <p>开始了</p>
      <button onClick={alertHandle}>弹出提示框</button>
    </div>
  );
}

export default App;
