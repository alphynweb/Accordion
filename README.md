# AwAccordion

This is an HOC component to wrap around markup in order to acheive a sliding accordion.

## Please use the following format of markup inside the AwAccordion Tags

```
<div className="section">
  <div className="section-header">
    // Section header content goes here
  </div>
  <div className="section-panel">
    // Section panel content goes here
  </div>
  
  <div className="section-header">
    // Section header content goes here
  </div>
  <div className="section-panel">
    // Section panel content goes here
  </div>
</div>
```
## To convert to sliding accordion, wrap with AwAccordion component

```
<AwAccordion>
  <div className="section">
    <div className="section-header">
      // Section header content goes here
    </div>
    <div className="section-panel">
      // Section panel content goes here
    </div>

    <div className="section-header">
      // Section header content goes here
    </div>
    <div className="section-panel">
      // Section panel content goes here
    </div>
  </div>
</AwAccordion>
```


### Props can be added to the AwAccordion HOC 
#### duration - In seconds. Speed at which the panels open and close
#### timing - Transition timing function - "ease", "ease-in", "ease-out", and "ease-in-out"
#### multiopen - "true" or "false" (default = "true") - determines whether more than one panel can be simultaneously open
#### toggleIgnoreClasses (Array) - Class names of elements that do not trigger opening and closing of panels
#### toggleIgnoreIds (Array) - Id's of elements that do not trigger opening and closing of panels
#### toggleIgnoreElements (Array) - Node names of elements that do not trigger opening and closing of panels

#### Example :

```
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
