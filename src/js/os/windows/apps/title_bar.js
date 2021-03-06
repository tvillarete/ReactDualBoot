import React, { Component } from 'react';
import styled from 'styled-components';

const OuterContainer = styled.div`
   z-index: ${props => props.onlyActionButtons ? 0 : 10};
   position: absolute;
   top: 0;
   height: 2.5em;
   width: 100%;
   right: ${props => props.onlyActionButtons && '0'};
   display: flex;
   flex: 1;
   backdrop-filter: ${props => (props.hasBlur ? 'blur(10px)' : null)};
   background: ${props => (props.hasBlur ? 'rgba(230,230,230,0.75)' : null)};
`;

const Text = styled.h4`
   font-family: sans-serif;
   font-weight: normal;
   margin: 0 8px;
   user-select: none;
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
   width: 3.5em;
   text-align: center;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: default;

   h3 {
      margin: 0;
      font-weight: normal;
      user-select: none;
   }

   &:hover {
      background: ${props => props.color || 'rgb(240,240,240)'};

      img {
         filter: invert(${props => (props.color === 'red' ? 1 : 0)})
            brightness(200%);
      }
   }
`;

const Icon = styled.img`
   max-height: 1em;
   max-width: 1em;
   user-select: none;
`;

const ActionButtonContainer = styled.div`
   display: flex;
   height: 100%;
`;

const ActionButtons = ({ onEvent }) => {
   return (
      <ActionButtonContainer>
         <ActionButton onClick={() => onEvent({ type: 'minimize' })}>
            <Icon src={'images/icons/windows/minimize.svg'} />
         </ActionButton>
         <ActionButton onClick={() => onEvent({ type: 'maximize' })}>
            <Icon src={'images/icons/windows/maximize.svg'} />
         </ActionButton>
         <ActionButton color="red" onClick={() => onEvent({ type: 'close' })}>
            <Icon src={'images/icons/windows/close.svg'} />
         </ActionButton>
      </ActionButtonContainer>
   );
};

const BackButtonContainer = styled.div`
   height: 100%;
   width: 47px;
   display: flex;
   justify-content: center;
   align-items: center;

   &:hover {
      background: ${props => props.accent};

      img {
         filter: invert(1) brightness(150%);
      }
   }
`;

const BackButton = ({ accent, onEvent }) => {
   return (
      <BackButtonContainer
         accent={accent}
         onClick={() => onEvent({ type: 'back' })}>
         <Icon src={'images/icons/windows/back_arrow.svg'} />
      </BackButtonContainer>
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
         case 'back':
            this.back();
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

   back = () => {
      let { appConfig } = this.props;
      let { viewStack } = appConfig.app;

      if (viewStack.length >= 1) {
         viewStack = viewStack.pop();

         appConfig.enteringOldView = true;

         setTimeout(() => {
            this.props.onEvent({
               type: 'update-app-config',
               appConfig,
            });
         }, 300);
      }

      appConfig.viewStack = viewStack;

      this.props.onEvent({
         type: 'update-app-config',
         appConfig,
      });
   };

   getComponent = (property, index) => {
      const { appConfig, desktop } = this.props;
      const { accent } = desktop;
      const { viewStack } = appConfig.app;

      switch (property) {
         case 'title':
            return <Text key={index}>{appConfig.name}</Text>;
         case 'actionButtons':
            return <ActionButtons key={index} onEvent={this.handleEvent} />;
         case 'back':
            return (
               viewStack.length > 1 && (
                  <BackButton
                     key={index}
                     accent={accent}
                     onEvent={this.handleEvent}
                  />
               )
            );
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
      const { appConfig } = this.props;
      const { titleBar } = appConfig;
      const { hasBlur, onlyActionButtons } = titleBar;
      console.log(appConfig);

      return (
         <OuterContainer
            hasBlur={hasBlur}
            onlyActionButtons={onlyActionButtons}
            accent={this.props.accent}>
            <LeftContainer>{this.getContents('left')}</LeftContainer>
            <MiddleContainer>{this.getContents('middle')}</MiddleContainer>
            <RightContainer>{this.getContents('right')}</RightContainer>
         </OuterContainer>
      );
   }
}
