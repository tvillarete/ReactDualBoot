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

const SectionHeader = styled.h3`
   margin: 16px 0;
   font-weight: normal;
   font-size: 16px;
   font-family: sans-serif;
`;

const SectionContainer = styled.div``;

const WallpaperIcon = styled.img`
   max-height: 5em;
   max-width: 5em;
   margin-right: 8px;
   animation: slideUp 0.7s;
   animation-timing-function: cubic-bezier(0,.99,0,.99);

   @keyframes slideUp {
      from {
         transform: translateY(100%);
         opacity: 0;
      }
   }
`;

const WallpaperSelector = ({ onEvent }) => {
   const { wallpapers } = config;

   const setWallpaper = name => {
      const url = `images/wallpapers/${name}`;
      onEvent({
         type: 'change-background',
         url,
      });
   };

   const getWallpapers = () => {
      const wallpaperIcons = [];

      for (let name in wallpapers) {
         const url = `images/wallpapers/icons/${wallpapers[name]}`;
         wallpaperIcons.push(
            <WallpaperIcon
               key={name}
               src={url}
               onClick={() => setWallpaper(wallpapers[name])}
            />,
         );
      }
      return wallpaperIcons;
   };

   return <SectionContainer>{getWallpapers()}</SectionContainer>;
};

export default class Background extends Component {
   handleEvent = options => {
      switch (options) {
         default:
            this.props.onEvent(options);
            break;
      }
   };

   render() {
      const { desktop } = this.props;
      const { accent, background } = desktop;

      return (
         <Container>
            <DesktopPreview accent={accent} background={background} />
            <SectionHeader>Choose your picture</SectionHeader>
            <WallpaperSelector onEvent={this.handleEvent} />
         </Container>
      );
   }
}
