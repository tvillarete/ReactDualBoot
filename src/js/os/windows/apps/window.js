import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
   position: absolute;
   display: flex;
   flex-direction: column;
   height: ${props => props.dimensions ? props.dimensions.height + 'px' : '800px'};
   width: ${props => props.dimensions ? props.dimensions.width + 'px' : '800px'};
   max-width: 100%;
   max-height: 100%;
   border: 1px solid ${props => props.isFocused ? props.accent : 'transparent'};
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
         isFocused: appConfig.isFocused,
         onEvent: this.handleEvent,
         desktop
      }

      return React.cloneElement(windowContents, props);
   }

   blur() {
      const { appConfig } = this.props;

      this.props.onEvent({
         type: 'blur-app',
         appConfig
      });
   }

   focus() {
      const { appConfig } = this.props;

      this.props.onEvent({
         type: 'focus-app',
         appConfig
      });

   }

   // Closes the dropdown if anywhere outside the dropdown is clicked.
   handleOutsideClick = event => {
      const domNode = ReactDOM.findDOMNode(this);

      if (!(domNode && domNode.contains(event.target))) {
         this.blur();
      } else {
         this.focus();
      }
   };

   componentDidMount() {
      document.addEventListener('click', this.handleOutsideClick, true);
   }

   componentWillUnmount() {
      document.removeEventListener('click', this.handleOutsideClick, true);
   }

   render() {
      const { appConfig, desktop } = this.props;
      const { app, isClosing, isMinimized, isFocused } = appConfig;
      const { accent } = desktop;

      return (
         <WindowContainer
            isClosing={isClosing}
            isMinimized={isMinimized}
            isFocused={isFocused}
            accent={accent}
            {...app}>
            <TitleBar {...this.props} onEvent={this.handleEvent} />
            <ContentContainer>{this.getWindowContents()}</ContentContainer>
         </WindowContainer>
      );
   }
}
