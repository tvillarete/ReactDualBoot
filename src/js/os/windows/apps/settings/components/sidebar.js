import React, { Component } from 'react';
import styled from 'styled-components';
import config from '../config.json';

const Container = styled.div`
   flex: 1;
   background: white;
   max-width: 20em;
   padding-top: 2.5em;

   @supports (backdrop-filter: blur(10px)) {
      backdrop-filter: blur(15px);
      background: rgba(240, 240, 240, 0.85);
   }
`;

const SectionHeader = styled.h4`
   font-family: sans-serif;
   user-select: none;
   padding-left: 16px;
`;

const ButtonContainer = styled.div`
   display: flex;
   align-items: center;
   height: 2em;
   width: 100%;
   border-left: 4px solid ${props => props.isActive ? 'dodgerblue' : 'transparent'};
   box-sizing: border-box;

   &:hover {
      background: rgba(130, 130, 130, 0.5);
   }
`;

const ButtonText = styled.h4`
   margin: 0 12px;
   font-family: sans-serif;
   font-weight: normal;
   user-select: none;
`;

export default class Sidebar extends Component {
   back = () => {
      this.props.onEvent({
         type: 'back',
      });
   };

   changeSection = section => {
      this.props.onEvent({
         type: 'change-section',
         section: section.name,
      });
   };

   getSectionButtons = () => {
      const { view } = this.props;
      const sections = config.views[view].sections;

      return sections.map((section, index) => (
         <ButtonContainer
            key={index}
            isActive={section.name === this.props.section}
            onClick={() => this.changeSection(section)}>
            <ButtonText>{section.name}</ButtonText>
         </ButtonContainer>
      ));
   };

   render() {
      return (
         <Container>
            <ButtonContainer onClick={this.back}>
               <ButtonText>Home</ButtonText>
            </ButtonContainer>
            <SectionHeader>{this.props.view}</SectionHeader>
            {this.getSectionButtons()}
         </Container>
      );
   }
}
