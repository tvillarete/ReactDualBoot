import React, { Component } from 'react';
import styled from 'styled-components';
import config from './config.json';
import DesktopPreview from './desktop_preview';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   padding: 0 24px;
   flex: 1;
`;

const SubHeader = styled.h3`
   margin: 16px 0;
   font-weight: 300;
   font-size: 20px;
   font-family: sans-serif;
`;

const SectionHeader = styled.h3`
   margin: 16px 0;
   font-weight: normal;
   font-size: 16px;
   font-family: sans-serif;
`;

const SectionContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   max-width: ${props => props.maxWidth || 'none'};
   animation: ${props => props.animate ? 'slideUp 0.7s' : 'none'};
   animation-timing-function: cubic-bezier(0,.99,0,.99);

   @keyframes slideUp {
      from {
         opacity: 0;
         transform: translateY(20%);
      }
   }
`;

const ColorIcon = styled.div`
   position: relative;
   height: 3em;
   width: 3em;
   background-color: ${props => props.color || 'dodgerblue'};
   margin: 0 2px 2px 0;
   border: 3px solid ${props => props.isActive ? 'black' : 'transparent'};

   &:hover {
      border: 3px solid black !important;
   }
`;

const CheckMark = styled.img`
   position: absolute;
   opacity: ${props => props.isActive ? 1 : 0}
   top: 0;
   right: 0;
   height: 1em;
   width: 1em;
   padding: 2px;
   background: black;
   transition: all 0.3s ease;
`;

const ColorSelector = ({ accent, onEvent }) => {
   const { colors } = config;

   const setColor = newAccent => {
      onEvent({
         type: 'change-accent',
         accent: newAccent,
      });
   };

   const getColors = () => {
      return colors.map(color => (
         <ColorIcon
            key={color}
            color={color}
            isActive={color === accent}
            onClick={() => setColor(color)}
            >
            <CheckMark isActive={color === accent} src="images/icons/windows/checkmark.svg" />
         </ColorIcon>
      ));
   };

   return <SectionContainer animate width="26em">{getColors()}</SectionContainer>;
};

export default class Colors extends Component {
   handleEvent = options => {
      switch(options) {
         default:
            this.props.onEvent(options);
            break;
      }
   }

   render() {
      const { desktop } = this.props;
      const { accent, background } = desktop;

      return (
         <Container>
            <DesktopPreview accent={accent} background={background} />
            <SubHeader>Choose your color</SubHeader>
            <SectionHeader>Windows colors</SectionHeader>
            <ColorSelector accent={accent} onEvent={this.handleEvent}/>
         </Container>
      );
   }
}
