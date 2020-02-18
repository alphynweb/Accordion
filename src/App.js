import React from 'react';
import AwAccordion from './components/AwAccordion/AwAccordion';

function App() {
  return (
    <>
      <AwAccordion
        duration="0.5"
        timing="ease-in-out"
        multiopen="true"
        toggleIgnoreClasses={["no-toggle", "toggle-free"]}
        toggleIgnoreIds={["noToggle"]}
        toggleIgnoreElements={["input", "label", "span"]}>

        <div className="section">
          <div className="section-header">
            <h1>Header 1</h1>
            <label htmlFor="awCheckbox">Don't toggle here or checkbox!</label>
            <input type="checkbox" id="awCheckbox" />
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
            <p className="toggle-free">Don't toggle here!"</p>
            <p className="no-toggle">Or here!</p>
            <p id="noToggle">Or here!</p>
          </div>

          <div className="section-panel">
            <p>This is panel 2 content</p>
            <p>This is panel 2 content</p>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h1>Header 3</h1>
            <span>Don't toggle here!</span>
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
