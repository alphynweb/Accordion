import React from 'react';
import AwAccordion from './components/AwAccordion/AwAccordion';

import './App.scss';

import sunset from './assets/images/sunset.jpg';

function App() {
  return (
    <div className="container">
      <AwAccordion
        duration="0.5"
        timing="ease-in-out"
        multiopen="true">

        <div className="section">
          <div className="section-header">
            <h2>Header 1</h2>
          </div>

          <div className="section-panel">
            <img src={sunset} alt="sunset" />
            <p>This is panel 1 content</p>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h2>Header 2</h2>
          </div>

          <div className="section-panel">
            <p>This is panel 2 content</p>
            <p>This is panel 2 content</p>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h2>Header 3</h2>
          </div>

          <div className="section-panel">
            <p>This is panel 3 content</p>
            <p>This is panel 3 content</p>
          </div>
        </div>
      </AwAccordion>
    </div>
  );
}

export default App;
