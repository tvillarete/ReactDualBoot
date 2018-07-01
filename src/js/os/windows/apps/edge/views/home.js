import React, { Component } from 'react';
import styled from 'styled-components';
import config from '../config.json';
import SpriteSheet from './home/sprites';

const Container = styled.div`
   position: relative;
   margin-top: 2.5em;
   display: flex;
   flex-direction: column;
   flex: 1;
   background: white;
`;

const WebContainer = styled.div`
   position: relative;
   height: 100%;
`;

const Iframe = styled.iframe`
   animation: fadeIn 1s;

   @keyframes fadeIn {
      0% {
         opacity: 0;
      }
   }
`;

export default class HomeView extends Component {
   constructor(props) {
      super(props);
      this.state = {
         tabs: props.tabs,
         currentTab: props.currentTab
      }
   }

   static getDerivedStateFromProps(nextProps) {
      const { tabs, currentTab } = nextProps;

      return {
         tabs,
         currentTab
      }
   }

   changeView = (view) => {
      this.props.onEvent({
         type: 'new-view',
         view
      });
   }

   render() {
      const { enteringOldView, desktop } = this.props;
      const {tabs, currentTab} = this.state;
      const { accent } = desktop

      return (
         <Container enteringOldView={enteringOldView}>
         <WebContainer>
         <Iframe src={tabs[currentTab].url} height="100%" width="100%" />
         </WebContainer>
         </Container>
      );
   }
}
