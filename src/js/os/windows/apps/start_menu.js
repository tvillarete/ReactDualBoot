import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import NavPane from '../components/nav_pane';
import Sidebar from './start_menu/sidebar';
import Tile from './start_menu/tile';
import AppList from './start_menu/app_list';
import config from './start_menu/config.json';

const duration = '0.6s';
const shortDuration = '0.2s';
const InvisibleContainer = styled.div`
   z-index: 100;
   position: fixed;
   height: 30em;
   width: 50em;
   bottom: 3rem;
   left: 0;
   overflow: hidden;
   animation: ${props => props.isClosing ? 'opacityZero' : 'opacity'} ${duration};

   @keyframes opacityZero {
      50% {
         opacity: 0;
      }
      100% {
      opacity: 0;
      }
   }
   @keyframes opacity {
      50% {
         opacity: 1;
      }
      100% {
      opacity: 1;
      }
   }

`;

const Container = styled.div`
   position: relative;
   height: 100%;
   width: 100%;
   display: flex;

   background: rgba(0, 0, 0, 1);
   backdrop-filter: ${props => props.isClosing ? 'none !important' : 'blur(10px)'};
   animation: ${props => (props.isClosing ? 'closeDrawer' : 'openDrawer')}
      ${props => props.isClosing ? shortDuration + ' ease' : duration + ' cubic-bezier(0,.99,0,.99)'};

   @supports (backdrop-filter: blur(15px)) {
      backdrop-filter: blur(10px);
      background: rgba(20, 20, 20, 0.85);
   }

   @keyframes openDrawer {
      from {
         opacity: 0;
         transform: translateY(30%);
      }
   }

   @keyframes closeDrawer {
      100% {
         transform: translateY(50%);
      }
   }
`;

const TileContainer = styled.div`
   display: flex;
   flex: 1;
   padding: 16px;
`;

export default class StartMenu extends Component {
   handleEvent = options => {
      switch (options.type) {
         case 'open-app':
            this.props.onEvent(options);
         case 'close-start-menu':
            this.closeStartMenu();
            break;
         default:
            this.props.onEvent(options);
            break;
      }
   };

   closeStartMenu() {
      const { appConfig } = this.props;

      this.props.onEvent({
         type: 'close-window',
         appConfig: appConfig,
      });
   }

   // Closes the dropdown if anywhere outside the dropdown is clicked.
   handleOutsideClick = event => {
      const domNode = ReactDOM.findDOMNode(this);

      if (!(domNode && domNode.contains(event.target))) {
         this.closeStartMenu();
      }
   };

   componentDidMount() {
      document.addEventListener('click', this.handleOutsideClick, true);
   }

   componentWillUnmount() {
      document.removeEventListener('click', this.handleOutsideClick, true);
   }

   render() {
      const { apps, appConfig, desktop } = this.props;
      const { isClosing } = appConfig;
      const { accent } = desktop;

      return (
         <InvisibleContainer isClosing={isClosing}>
            <Container isClosing={isClosing}>
               <NavPane buttons={config.navPane} onEvent={this.handleEvent}/>
               <Sidebar onEvent={this.handleEvent} />
               <AppList
                  apps={apps}
                  accent={accent}
                  onEvent={this.handleEvent}
               />
               <TileContainer>
                  {apps.map((app, index) => {
                     if (app.inStartMenu) {
                        return (
                           <Tile
                              key={index}
                              accent={app.app.accent || accent}
                              appConfig={app}
                              onEvent={this.handleEvent}
                           />
                        );
                     }
                     return null;
                  })}
               </TileContainer>
            </Container>
         </InvisibleContainer>
      );
   }
}
