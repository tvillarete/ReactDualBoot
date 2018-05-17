import React, { Component } from 'react';
import styled from 'styled-components';
import AppManager from './apps/app_manager';

const DesktopContainer = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: url(${props => props.background}) no-repeat center center fixed;
   background-size: cover;
   transition: background 1s;
`;

export default class Desktop extends Component {
   handleEvent = options => {
      switch (options.type) {
         default:
            this.props.onEvent(options);
            break;
      }
   };

   render() {
      const { config } = this.props;
      const { desktop } = config;

      return (
         <DesktopContainer background={desktop.background}>
            <AppManager config={config} onEvent={this.handleEvent} />
         </DesktopContainer>
      );
   }
}
