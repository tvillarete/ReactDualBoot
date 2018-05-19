import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Container = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   width: ${props => (props.expanded ? '16em' : '3em')};
   display: flex;
   flex-direction: column;
   transition: all 0.2s ease;
   background: ${props => (props.expanded ? 'rgb(30,30,30)' : 'transparent')};
   cursor: default;
   user-select: none;
`;

const MainButtonContainer = styled.div`
   display: flex;
   flex-direction: column-reverse;
   flex: 1;
`;

const ButtonContainer = styled.div`
   display: flex;
   align-items: center;
   height: 3em;
   padding-left: 1em;
   overflow: hidden;

   &:hover {
      background: rgb(70, 70, 70);
   }

   &:active {
      background: rgb(100, 100, 100);
   }
`;

const Icon = styled.img``;

const ButtonText = styled.h3`
   font-family: sans-serif;
   font-weight: normal;
   padding-left: 1em;
   color: white;
`;

export default class NavPane extends Component {
   state = {
      expanded: false,
   };

   handleEvent = options => {
      switch (options.type) {
         default:
            this.props.onEvent(options);
            break;
      }
   };

   toggle = value => {
      this.setState({ expanded: !this.state.expanded });
   };

   handleOutsideClick = event => {
      if (!this.state.expanded) return;

      const domNode = ReactDOM.findDOMNode(this);

      if (!(domNode && domNode.contains(event.target))) {
         this.toggle(false);
      }
   };

   getButtons = () => {
      const { buttons } = this.props;

      return buttons.map(button => (
         <ButtonContainer
            key={button.text}
            onClick={() => this.handleEvent(button.action)}>
            <Icon src={`images/icons/windows/${button.icon}`} />
            <ButtonText>{button.text}</ButtonText>
         </ButtonContainer>
      ));
   };

   componentDidMount() {
      document.addEventListener('click', this.handleOutsideClick, true);
   }

   componentWillUnmount() {
      document.removeEventListener('click', this.handleOutsideClick, true);
   }

   render() {
      const { expanded } = this.state;

      return (
         <Container expanded={expanded}>
            <ButtonContainer onClick={this.toggle}>
               <Icon src="images/icons/windows/menu.svg" />
               <ButtonText>Start</ButtonText>
            </ButtonContainer>
            <MainButtonContainer>{this.getButtons()}</MainButtonContainer>
         </Container>
      );
   }
}
