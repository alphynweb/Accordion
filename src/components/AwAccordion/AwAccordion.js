import React, { Component } from 'react';
import './AwAccordion.scss';

class AwAccordion extends Component {
    constructor(props) {
        super(props);

        this.isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? true : false;

        // First check that supplied markup is correct
        this.error = this.checkMarkup(this.props.children);

        if (!this.error) {
            this.initialSetup();
        };

        this.state = {
            sections: this.sections,
            error: this.error,
            loaded: false
        };

        window.addEventListener("load", this.handleLoad);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.error) return;

        if (!prevState.loaded) {
            const sections = this.props.children;

            // Loop through section containers and set the initial panel container  inline style heights - if they start open it gives a smooth closing transition
            React.Children.forEach(sections, (section, index) => {
                const panelContainer = this.panelContainerRefs[index].current;

                const height = this.calculateHeight(panelContainer);

                // Set height of panelContainer to height or zero depending on whether open or closed in state.
                panelContainer.style.height = this.state.sections[index].open ? height + "px" : 0;
            });
        };
    };

    handleLoad = () => {
        this.setState({
            loaded: true
        });
    };

    componentDidMount() {
        if (this.state.error) {
            return;
        };
    };

    isNumeric(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    };

    isTimingFunction(str) {
        const timingFunctions = [
            "ease",
            "ease-in",
            "ease-out",
            "ease-in-out"
        ];

        return timingFunctions.includes(str);
    };

    isBool(val) {
        return (typeof val === "boolean");
    };

    checkMarkup = (sections) => {
        let error = false;

        React.Children.forEach(sections, (section) => {
            if (section.props.className !== "section") {
                if (this.isDev) {
                    console.error("Please check the markup of HTML supplied to awAccordion - Accordion should have sections with classNames 'section'");
                };
                error = true;
            };

            // Check for section header and section panel
            const children = section.props.children;

            // Check for correct amount of children (2 - section header and section panel)
            if (children.length !== 2) {
                if (this.isDev) {
                    console.error("Please check the markup of HTML supplied to awAccordion - Each section should have only two children - 'section-header' and 'section-panel'");
                };
                error = true;
            };

            // Check for header
            if (children[0].props.className !== "section-header") {
                if (this.isDev) {
                    console.error("Please check the markup of HTML supplied to awAccordion - Accordion should have section headers with classNames 'section-header'");
                };
                error = true;
            };

            // Check for panel
            if (children[1].props.className !== "section-panel") {
                if (this.isDev) {
                    console.error("Please check the markup of HTML supplied to awAccordion - Accordion should have section panels with classNames 'section-panel'");
                };
                error = true;
            };
        });

        return error;
    };

    initialSetup() {
        this.accordionKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.sections = [];
        this.panelRefs = [];
        this.panelContainerRefs = [];
        this.accordionClone = null;
        this.transitionDuration = null;
        this.transitionTiming = "linear";
        this.multiOpen = true;
        this.canRender = true; // Whether or not accordion can render (All markup has to be correct)

        // Set transition settings if included in props - set to default if not
        if (this.props.duration) {
            this.transitionDuration = this.isNumeric(this.props.duration) ? this.props.duration + "s" : null;
        };

        if (this.props.timing) {
            this.transitionTiming = this.isTimingFunction(this.props.timing) ? this.props.timing : "linear";
        };

        this.multiOpen = this.props.multiopen === "true" ? true : false;

        const sections = this.props.children;

        // Looop through sections and create a reference for each panel
        React.Children.forEach(sections, (section, index) => {
            // Create reference for panel container
            this.panelContainerRefs[index] = React.createRef();

            const isOpen = section.props.open ? true : false;

            const children = section.props.children;

            // Loop through children and make refs
            children.forEach(child => {
                // Check for header or panel
                if (child.props.className === "section-panel") {
                    this.panelRefs[index] = React.createRef();

                    this.sections.push({
                        height: "auto",
                        open: isOpen
                    });
                };
            });
        });
    };

    calculateHeight = (el) => {
        if (el) {
            return el.getBoundingClientRect().height;
        };

        return false;
    };

    toggleSection = (event, index) => {
        let canToggle = true;

        const classArray = Array.from(event.target.classList);

        if (this.props.toggleIgnoreClasses) {
            this.props.toggleIgnoreClasses.forEach(classIgnore => {
                if(classArray.includes(classIgnore)) canToggle = false;
            });
        };

        if (this.props.toggleIgnoreIds) {
            this.props.toggleIgnoreIds.forEach(idIgnore => {
                if(event.target.id.toLowerCase() === idIgnore.toLowerCase()) canToggle = false;
            });
        };

        if(this.props.toggleIgnoreElements) {
            this.props.toggleIgnoreElements.forEach(elementIgnore => {
                if(event.target.nodeName.toLowerCase() === elementIgnore.toLowerCase()) canToggle = false;
            });
        };

        event.preventDefault();

        if(!canToggle) return;

        const sectionsCopy = [...this.state.sections];
        const isOpen = sectionsCopy[index].open;

        const height = this.calculateHeight(this.panelRefs[index].current);

        const newSection = {
            height: height,
            open: !isOpen
        };

        sectionsCopy[index] = newSection;

        // If multiOpen props is set to false, then close the other sections
        if (!this.multiOpen) {
            sectionsCopy.forEach((section, sectionIndex) => {
                if (sectionIndex !== index) {
                    section.height = 0;
                    section.open = false;
                };
            });
        }

        this.setState({
            sections: sectionsCopy
        });
    };

    // Build a clone of the accordion
    buildAccordionClone = () => {
        const sectionClones = this.buildSectionClones(this.props.children);
        this.accordionClone = React.createElement("div", {}, sectionClones);
    };

    // Build section clones
    buildSectionClones = (sections) => {
        const clonedSections = [];
        const transitionSettings = " " + this.transitionDuration + " " + this.transitionTiming;

        React.Children.forEach(sections, (section, index) => {

            const sectionHeader = this.extractHeader(section);
            const sectionPanel = this.extractPanel(section);

            // Find out height of section panel
            const isOpen = this.state.sections[index].open;
            const panelHeight = isOpen ? this.state.sections[index].height : 0;
            const sectionClassName = isOpen ? "section" : "section closed";

            // Clone header
            const sectionHeaderClone = sectionHeader ? React.cloneElement(sectionHeader, {
                onClick: (event) => this.toggleSection(event, index),
                key: this.accordionKey + "section_header_" + index
            }) : null;

            // Create new section panel content div with contents of section panel clone inside
            const sectionPanelContent = React.createElement("div", {
                className: "section-panel-content",
                key: this.accordionKey + "secion_panel_content_" + index
            }, sectionPanel.props.children);

            const sectionPanelClone = React.createElement("div", {
                style: {
                    // transition: "transform 0.2s ease-in-out"
                    transition: "transform" + transitionSettings
                },
                className: "section-panel",
                ref: this.panelRefs[index],
                key: this.accordionKey + "section_panel_" + index
            }, sectionPanelContent);

            // Make panel container 
            const sectionPanelContainer = React.createElement("div", {
                style: {
                    height: panelHeight !== "auto" ? panelHeight + "px" : "auto",
                    // transition: "height 0.2s ease-in-out"
                    transition: "height " + transitionSettings
                },
                className: "section-panel-container",
                ref: this.panelContainerRefs[index],
                key: this.accordionKey + "section_panel_container_" + index
            }, sectionPanelClone);

            // Assuming we got the header and the panel successfully, clone the whole section
            const sectionElements = [
                sectionHeaderClone,
                sectionPanelContainer
            ];

            const sectionClone = React.cloneElement(section, {
                key: this.accordionKey + "section_" + index,
                className: sectionClassName
            }, sectionElements);

            clonedSections.push(sectionClone);
        });

        return clonedSections;
    };

    // Extract header from original section
    extractHeader = (section) => {
        const children = section.props.children;

        let header = null;

        children.forEach(child => {
            if (child.props.className === "section-header") {
                header = child;
            };
        });

        return header;
    };

    // Extract panel from original section
    extractPanel = (section) => {
        const children = section.props.children;

        let panel = null;

        children.forEach(child => {
            if (child.props.className === "section-panel") {
                panel = child;
            };
        });

        return panel;
    };

    render() {
        if (this.state.error) {
            return this.props.children;
        };

        this.buildAccordionClone();

        return (
            <div className="aw-accordion">
                {this.accordionClone}
            </div>
        );
    };
};

export default AwAccordion;