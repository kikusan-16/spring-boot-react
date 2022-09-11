import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Main from '../Main/Main';
import Kanban from '../Cruds/Kanban';
import { sectionContents } from '../../utils/constants';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/crud' element={
          <Main section={ sectionContents[0] }>
            <Kanban />
          </Main>
        } />
        { sectionContents.map(section => {
          return (
            <Route key={section.index} path={section.path} element={
              <Main section={ section }>
                {section.content}
              </Main>
            } />
          );
        })}
        <Route path='*'
          element={
            <main className='container'>
              <p>There&apos;s nothing here!</p>
            </main>
          } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
