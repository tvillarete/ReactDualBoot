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
   height: 30em;
   width: 40em;
   background: ${props => props.color || 'white'};
   animation: ${props => props.isClosing ? closeWindow : openWindow} ${duration};
   transition: all 0.3s ease;
   border: 1px solid ${props => props.border || 'transparent'};
   box-sizing: border-box;

   ${props => props.isMinimized && `
      opacity: 0;
      transform: translate(-50%, ${window.innerHeight}px) scale(0.5);
      pointer-events: none;
   `};
`;

const ContentContainer = styled.div`

`;

export default class AppWindow extends Component {
   handleEvent = options => {
      switch (options.type) {
         default:
            this.props.onEvent(options);
            break;
      }
   };

   render() {
      const { appConfig } = this.props;
      const { options } = appConfig;
      const { isClosing, isMinimized } = appConfig;

      return (
         <WindowContainer isClosing={isClosing} isMinimized={isMinimized} {...options}>
            <TitleBar {...this.props} onEvent={this.handleEvent} />
            <ContentContainer>{this.props.windowContents}</ContentContainer>
         </WindowContainer>
      );
   }
}
