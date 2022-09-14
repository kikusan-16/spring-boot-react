import React from 'react';
import { SectionProps } from '../../utils/types';
import { sectionContents } from '../../utils/constants';

export const Section = (props: SectionProps) => {
  const { index, title, path, note } = props;
  return (
    <section className='section'>
      {/* aタグはサーバを経由するために使用 */}
      <h4>{ index }. <a href={ path }>{ title }</a></h4>
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
