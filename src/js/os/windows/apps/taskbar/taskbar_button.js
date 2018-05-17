import React, { Component } from 'react';
import styled from 'styled-components';

const duration = '0.15s';
const ButtonContainer = styled.div`
   position: relative;
   height: 100%;
   width: 3.5rem;
   display: flex;
   background: ${props =>
      props.isActive && !props.isClosing && !props.isMinimized
         ? 'rgb(60,60,60)'
         : 'transparent'};
   box-shadow: ${props =>
      props.isActive && !props.isClosing ? 'inset 0 -3px 0 0 white' : 'none'};
   opacity: ${props => props.isClosing ? 0 : 1};
   transition: box-shadow ${duration} ease, opacity ${duration} ease;
   animation: appear ${duration};

   &:hover {
      background: rgba(100, 100, 100, 0.7);
   }

   @keyframes appear {
      from {
         opacity: 0;
      }
   }
`;

const Icon = styled.img`
   max-height: 50%;
   margin: auto;
`;

export default class TaskbarButton extends Component {
   handleEvent = () => {
      const { appConfig } = this.props;

      this.props.onEvent({
         type: appConfig.isWindowed
            ? 'toggle-windowed-app'
            : 'toggle-special-app',
         appConfig,
         isActive: appConfig.isActive,
      });
   };

   render() {
      const { appConfig } = this.props;
      const { isActive, isClosing, isMinimized } = appConfig;
      const props = {
         isActive,
         isClosing,
         isMinimized
      }

      return (
         <ButtonContainer
            {...(appConfig.noStyles ? null : props)}
            onClick={this.handleEvent}>
            <Icon src={`images/icons/windows/${appConfig.icon}`} />
         </ButtonContainer>
      );
   }
}
