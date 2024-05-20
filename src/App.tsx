import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import { TodoView } from './TodoView';
import { TobuyView } from './TobuyView';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>
          Moving App 
        </h1> 
        <nav>
          <NavLink to="/todo" className={({ isActive }) => (isActive ? 'active-todo' : '')}>todo</NavLink> | 
          <NavLink to="/tobuy" className={({ isActive }) => (isActive ? 'active-tobuy' : '')}>tobuy</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/todo" />} />
          <Route path="/todo" element={<TodoView />} />
          <Route path="/tobuy" element={<TobuyView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
