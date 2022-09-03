import React from 'react';
import { Link } from 'react-router-dom';
import { SectionProps } from '../../utils/types';
import { sectionContents } from '../../utils/constants';

export const Section = (props: SectionProps) => {
  const { index, title, path, note } = props;
  return (
    <section className='section'>
      <h4>{ index }. <Link to={ path }>{ title }</Link></h4>
      { note }
    </section>
  );
};

const Sections = () => {
  return (
  <main className='container'>
    {
      sectionContents.map((content) => {
        return <Section key={ content.index } { ...content } />;
      })
    }
  </main>
  );
};

export default Sections;
