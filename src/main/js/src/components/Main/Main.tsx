import React from 'react';
import { MainProps } from '../../utils/types';
import { Section } from '../Sections/Sections';

const Main = (props: MainProps) => {
  const { section, children } = props;

  return (
  <main className='container'>
    <Section { ...section } />
    { children }
  </main>
  );
};

export default Main;
