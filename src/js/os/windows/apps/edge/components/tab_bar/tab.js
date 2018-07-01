import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   z-index: 10;
   display: flex;
   justify-content: space-between;
   height: 100%;
   width: 12em;
   padding: 0 6px;
   background: ${props =>
      props.isActive ? 'rgb(242, 242, 242)' : 'rgba(242,242,242,0.5)'};
   border-right: 1px solid #696c70;
   box-sizing: border-box;
   animation: slideUp 0.15s ease;

   &:first-of-type {
      animation: none;
   }

   @keyframes slideUp {
      0% {
         transform: translateY(100%);
         margin-right: -90%;
      }
   }
`;

const InfoContainer = styled.div`
   display: flex;
   align-items: center;
   height: 100%;
`;

const Title = styled.h3`
   font-weight: normal;
   font-size: 1em;
   margin: 0;
`;

const Icon = styled.img`
   max-height: 0.9em;
   max-width: 0.9em;
   margin: auto 0;
   padding: 3px

   &:hover {
      background: rgba(0,0,0,0.2);
   }
`;

export default class Tab extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isActive: props.isActive,
      };
   }

   static getDerivedStateFromProps(nextProps) {
      const { isActive, index } = nextProps;

      return {
         index,
         isActive,
      };
   }

   setCurrentTab = () => {
      const { index } = this.props;
      this.props.onEvent({
         type: 'set-current-tab',
         index
      });
   }

   closeTab = () => {
      const { index } = this.props;
      this.props.onEvent({
         type: 'close-tab',
         index
      });
   }

   render() {
      const { title, isActive } = this.props;

      return (
         <Container isActive={isActive} onClick={this.setCurrentTab}>
            <InfoContainer>
               <Title>{title}</Title>
            </InfoContainer>
            <Icon src="images/icons/windows/close.svg" onClick={this.closeTab}/>
         </Container>
      );
   }
}
