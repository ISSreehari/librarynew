import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Table from './components/Table';
import AddBook from './components/AddBook';
import DeleteBook from './components/DeleteBook';

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col p-10 bg-black text-white">
        <header className="flex justify-end mb-5">
          <Link to="/add" className="bg-violet-500 px-4 py-2 rounded-md mr-2">ADD</Link>
          <Link to="/delete" className="bg-violet-500 px-4 py-2 rounded-md">DELETE</Link>
        </header>
        <Switch>
          <Route exact path="/" component={Table} />
          <Route path="/add" component={AddBook} />
          <Route path="/delete" component={DeleteBook} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;