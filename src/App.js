import React from 'react';
import AwAccordion from './components/AwAccordion/AwAccordion';

function App() {
  return (
    <>
      <AwAccordion
        duration="1"
        timing="ease-in-out"
        multiopen="true">

        <div className="section">
          <div className="section-header">
            <h1>Header 1</h1>
          </div>

          <div className="section-panel">
            <p>This is panel 1 content</p>
            <p>This is panel 1 content</p>
            <p>This is panel 1 content</p>
            <p>This is panel 1 content</p>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h1>Header 2</h1>
          </div>

          <div className="section-panel">
            <p>This is panel 2 content</p>
            <p>This is panel 2 content</p>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h1>Header 3</h1>
          </div>

          <div className="section-panel">
            <p>This is panel 3 content</p>
            <p>This is panel 3 content</p>
          </div>
        </div>

      </AwAccordion>
    </>
  );
}

export default App;
