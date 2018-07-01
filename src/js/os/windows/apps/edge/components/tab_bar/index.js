import React, { Component } from 'react';
import styled from 'styled-components';
import Tab from './tab';

const Container = styled.div`
   z-index: 10;
   position: absolute;
   top: 0;
   left: 0;
   right: 10.5em;
   display: flex;
   height: 2.5em;
   padding-left: 1em;
   cursor: default;
   overflow: hidden;
`;

const Icon = styled.img`
   width: 1.1em;
   height: 1.1em;
   margin: auto 8px;
`;

export default class TabBar extends Component {
   constructor(props) {
      super();
      this.state = {
         tabs: props.tabs,
         currentTab: props.currentTab,
      };
   }

   static getDerivedStateFromProps(nextProps) {
      const { tabs, currentTab } = nextProps;

      return {
         tabs,
         currentTab,
      };
   }

   handleEvent = options => {
      switch(options.type) {
         default:
            this.props.onEvent(options);
         break;
      }
   }

   newTab = () => {
      this.props.onEvent({
         type: 'new-tab'
      });
   }

   getTabs = () => {
      const { tabs, currentTab } = this.state;

      return tabs.map((tab, index) => {
        return ( <Tab
            key={`tab-${tab.title}-${index}`}
            index={index}
            title={tab.title}
            isActive={index === currentTab}
            onEvent={this.handleEvent}
         />)
      });
   };

   render() {
      return <Container>
         {this.getTabs()}
         <Icon src="images/icons/windows/plus.svg" onClick={this.newTab} />
      </Container>;
   }
}
