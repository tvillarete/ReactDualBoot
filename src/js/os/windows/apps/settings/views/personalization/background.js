import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   padding: 0 24px;
`;

const Header = styled.h3`
   margin: 0 0 16px 0;
   font-weight: 300;
   font-size: 24px;
   font-family: sans-serif;
`;

const PreviewContainer = styled.div`
   position: relative;
   display: flex;
   width: ${props => 256/props.ratio + 'px'};
   height: ${props => 148/props.ratio + 'px'};
   background: url('images/wallpapers/cliffs.png');
   overflow: hidden;
`;

const StartMenu = styled.div`
   position: absolute;
   bottom: 0;
   height: 80%;
   padding: 8px;
   background: black;
`;

const StartMenuIcons = styled.svg`

`;

const DesktopPreview = () => {
   const aspectRatio = window.innerWidth/window.innerHeight;

   return (
      <PreviewContainer ratio={aspectRatio}>
      <StartMenu>
      <StartMenuIcons src="images/icons/windows/start_menu.svg"/>
      </StartMenu>
      </PreviewContainer>
   );
}

export default class Background extends Component {
   render() {
      return (
         <Container>
            <Header>Background</Header>
            <DesktopPreview accent="dodgerblue"/>
         </Container>
      );
   }
}
