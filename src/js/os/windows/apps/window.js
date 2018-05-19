import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import TitleBar from './title_bar';

const duration = '0.25s';
const closeWindow = keyframes`
   to {
      transform: scale(0.95);
      opacity: 0;
   }
`;

const openWindow = keyframes`
   from {
      transform: scale(0.95);
      opacity: 0;
   }
`;

const WindowContainer = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   height: ${props => props.dimensions ? props.dimensions.height + 'px' : '800px'};
   width: ${props => props.dimensions ? props.dimensions.width + 'px' : '800px'};
   max-width: 100%;
   max-height: 100%;
   border: 1px solid ${props => props.accent || 'transparent'};
   box-sizing: border-box;
   overflow: hidden;
   transition: all 0.2s;
   animation: ${props => (props.isClosing ? closeWindow : openWindow)}
      ${duration};

   ${props =>
      props.isMinimized &&
      `
      opacity: 0;
      transform: translate(-${window.innerWidth/100}%, 50%) scale(0.5);
      pointer-events: none;

      div {
         backdrop-filter: none !important;
      }
   `};
`;

const ContentContainer = styled.div`
   flex: 1;
`;

export default class AppWindow extends Component {
   handleEvent = options => {
      switch (options.type) {
         default:
            this.props.onEvent(options);
            break;
      }
   };

   getWindowContents = () => {
      const { windowContents, appConfig, desktop } = this.props;
      const props = {
         appConfig,
         onEvent: this.handleEvent,
         desktop
      }

      return React.cloneElement(windowContents, props);
   }

   render() {
      const { appConfig, desktop } = this.props;
      const { app, isClosing, isMinimized } = appConfig;
      const { accent } = desktop;

      return (
         <WindowContainer
            isClosing={isClosing}
            isMinimized={isMinimized}
            accent={accent}
            {...app}>
            <TitleBar {...this.props} onEvent={this.handleEvent} />
            <ContentContainer>{this.getWindowContents()}</ContentContainer>
         </WindowContainer>
      );
   }
}
