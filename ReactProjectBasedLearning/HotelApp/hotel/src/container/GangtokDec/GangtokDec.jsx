import React from 'react';

import { SubHeading } from '../../components';
import { images, data } from '../../constants';
import './GangtokDec.css';

const AwardCard = ({ award: { subtitle } }) => (
  <div className="app__laurels_awards-card">
    <div className="app__laurels_awards-card_content">
      <p className="p__opensansb">{subtitle}</p>
    </div>
  </div>
);

const GangtokDec = () => (
  <div className="app__header app__wrapper section__padding">
    <div className="app__wrapper_info">
      <SubHeading title="District Executive Committee Members" />
      <h1 className="headtext__cormorantb">Gangtok </h1>

      <div className="app__laurels_awards">
        {data.gangtok.map((dec) => <AwardCard award={dec} key={dec.title} />)}
      </div>
    </div>

    <div className="app__wrapper_img">
      <img src={images.gangtok} alt="laurels_img" />
    </div>
  </div>
);

export default GangtokDec;
