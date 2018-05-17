import React, { Component } from 'react';
import styled from 'styled-components';
import config from './config.json';

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

const SectionHeader = styled.h3`
   margin: 16px 0;
   font-weight: normal;
   font-size: 16px;
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
   padding: 8px;
   background: black;
`;

const StartMenuIcons = styled.img`

`;

const SectionContainer = styled.div`

`;

const WallpaperIcon = styled.img`
   max-height: 5em;
   max-width: 5em;
   margin: 0 4px;
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

const WallpaperSelector = ({ onEvent }) => {
   const { wallpapers } = config;

   const setWallpaper = (name) => {
      const url = `images/wallpapers/${name}`;
      onEvent({
         type: 'change-background',
         url
      });
   }

   const getWallpapers = () => {
      const wallpaperIcons = [];

      for (let name in wallpapers) {
         const url = `images/wallpapers/icons/${wallpapers[name]}`;
         wallpaperIcons.push(
            <WallpaperIcon key={name} src={url} onClick={() => setWallpaper(wallpapers[name])}/>
         );
      }
      return wallpaperIcons;
   }

   return (
      <SectionContainer>
         {getWallpapers()}
      </SectionContainer>
   );
}

export default class Background extends Component {
   handleEvent = options => {
      switch(options) {
         default:
            this.props.onEvent(options);
            break;
      }
   }

   render() {
      return (
         <Container>
            <Header>Background</Header>
            <DesktopPreview accent="dodgerblue"/>
            <SectionHeader>Choose your picture</SectionHeader>
            <WallpaperSelector onEvent={this.handleEvent}/>
         </Container>
      );
   }
}
