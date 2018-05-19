import React, { Component } from 'react';
import styled from 'styled-components';
import config from '../config.json';

const spriteSheet = 'images/icons/windows/sidebar_sprites.svg';
const coords = {
   Home: [4, 2],
   Background: [-20, 2],
   Colors: [-49, 0],
   'Lock screen': [-77, 3],
   Themes: [0, 0],
   Fonts: [0, 0],
   Start: [0, 0],
   Taskbar: [0, 0],
};

const Container = styled.div`
   flex: 1;
   background: white;
   max-width: 20em;
   padding-top: 4em;

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
   padding: 12px 0;
   width: 100%;
   border-left: 4px solid
      ${props => (props.isActive ? props.accent : 'transparent')};
   box-sizing: border-box;
   padding-left: 8px;

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

const Icon = styled.div`
   height: 20px;
   width: 20px;
   background: url('${props => props.src}') no-repeat;
   background-position: ${props => props.coords[0] + 'px ' + props.coords[1] + 'px'};
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
      const { view, desktop } = this.props;
      const { accent } = desktop;
      const sections = config.views[view].sections;

      return sections.map((section, index) => (
         <ButtonContainer
            key={index}
            accent={accent}
            isActive={section.name === this.props.section}
            onClick={() => this.changeSection(section)}>
            <Icon src={spriteSheet} coords={coords[section.name]}/>
            <ButtonText>{section.name}</ButtonText>
         </ButtonContainer>
      ));
   };

   render() {
      return (
         <Container>
            <ButtonContainer onClick={this.back}>
               <Icon src={spriteSheet} coords={coords.Home}/>
               <ButtonText>Home</ButtonText>
            </ButtonContainer>
            <SectionHeader>{this.props.view}</SectionHeader>
            {this.getSectionButtons()}
         </Container>
      );
   }
}
