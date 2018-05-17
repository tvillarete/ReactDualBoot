import React, { Component } from 'react';
import styled from 'styled-components';

const OuterContainer = styled.div`
   height: 2.5em;
   width: 100%;
   display: flex;
   font-family: sans-serif;
   background: ${props => props.color || 'white'};
   border-bottom: 1px solid rgba(0, 0, 0, 0.12);

   h3 {
      font-weight: normal;
   }
`;

const LeftContainer = styled.div`
   display: flex;
   align-items: center;
   flex: 1;
`;

const MiddleContainer = styled.div`
   display: flex;
   align-items: center;
   flex: 1;
   justify-content: center;
`;

const RightContainer = styled.div`
   display: flex;
   align-items: center;
   flex: 1;
   justify-content: flex-end;
`;

const ActionButton = styled.div`
   height: 100%;
   width: 3em;
   text-align: center;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: default;

   h3 {
      margin: 0;
      font-weight: normal;
   }

   &:hover {
      background: ${props => props.color || 'rgb(235,235,235)'};

      img {
         fill-color: white;
      }
   }
`;

const ActionIcon = styled.img`
   max-height: 1em;
   max-width: 1em;
`;

const ActionButtonContainer = styled.div`
   display: flex;
   height: 100%;
`;

const ActionButtons = ({ onEvent }) => {
   return (
      <ActionButtonContainer>
         <ActionButton onClick={() => onEvent({ type: 'minimize' })}>
            <ActionIcon src={'images/icons/windows/minimize.svg'}/>
         </ActionButton>
         <ActionButton onClick={() => onEvent({ type: 'maximize' })}>
            <ActionIcon src={'images/icons/windows/maximize.svg'}/>
         </ActionButton>
         <ActionButton color="red" onClick={() => onEvent({ type: 'close' })}>
            <ActionIcon src={'images/icons/windows/close.svg'}/>
         </ActionButton>
      </ActionButtonContainer>
   );
};

export default class TitleBar extends Component {
   handleEvent = options => {
      switch (options.type) {
         case 'minimize':
            this.minimizeWindow();
            break;
         case 'maximize':
            this.maximizeWindow();
            break;
         case 'close':
            this.closeWindow();
            break;
         default:
            this.props.onEvent(options);
            break;
      }
   };

   minimizeWindow = () => {
      this.props.onEvent({
         type: 'minimize-window',
         appConfig: this.props.appConfig,
      });
   };

   maximizeWindow = () => {
      this.props.onEvent({
         type: 'maximize-window',
         appConfig: this.props.appConfig,
      });
   };

   closeWindow = () => {
      this.props.onEvent({
         type: 'close-window',
         appConfig: this.props.appConfig,
      });
   };

   getComponent = (property, index) => {
      const { appConfig } = this.props;

      switch (property) {
         case 'title':
            return <h3 key={index}>{appConfig.name}</h3>;
         case 'actionButtons':
            return <ActionButtons key={index} onEvent={this.handleEvent} />;
         default:
            return <h3>Default</h3>;
      }
   };

   getContents = position => {
      const { appConfig } = this.props;
      const { titleBar } = appConfig;

      return titleBar[position].map((property, index) =>
         this.getComponent(property, index),
      );
   };

   render() {
      return (
         <OuterContainer color={this.props.color}>
            <LeftContainer>{this.getContents('left')}</LeftContainer>
            <MiddleContainer>{this.getContents('middle')}</MiddleContainer>
            <RightContainer>{this.getContents('right')}</RightContainer>
         </OuterContainer>
      );
   }
}
