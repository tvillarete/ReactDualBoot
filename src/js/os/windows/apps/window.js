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
   animation: ${props => (props.isClosing ? closeWindow : openWindow)}
      ${duration};
   transition: all 0.3s ease;
   border: 1px solid ${props => props.accent || 'transparent'};
   box-sizing: border-box;
   overflow: hidden;

   ${props =>
      props.isMinimized &&
      `
      opacity: 0;
      transform: translate(-50%, ${window.innerHeight}px) scale(0.5);
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
      const { windowContents, appConfig } = this.props;
      const props = {
         appConfig,
         onEvent: this.handleEvent
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
