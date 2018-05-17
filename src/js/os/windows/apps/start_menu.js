import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Sidebar from './start_menu/sidebar';
import Tile from './start_menu/tile';
import AppList from './start_menu/app_list';

const duration = '0.3s';
const InvisibleContainer = styled.div`
   z-index: 100;
   position: fixed;
   height: 30em;
   width: 50em;
   bottom: 3rem;
   left: 0;
   overflow: hidden;
`;

const Container = styled.div`
   position: relative;
   height: 100%;
   width: 100%;
   display: flex;

   background: rgba(0,0,0, 1);
   backdrop-filter: blur(10px);
   animation: ${props => (props.isClosing ? 'closeDrawer' : 'openDrawer')}
      ${duration};

   @supports(backdrop-filter: blur(15px)) {
      backdrop-filter: blur(10px);
      background: rgba(20,20,20,0.85);
   }

   @keyframes openDrawer {
      from {
         transform: translateY(100%);
      }
   }

   @keyframes closeDrawer {
      to {
         transform: translateY(100%);
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
         <InvisibleContainer>
            <Container isClosing={isClosing}>
               <Sidebar onEvent={this.handleEvent} />
               <AppList apps={apps} onEvent={this.handleEvent}/>
               <TileContainer>
                  {apps.map((app, index) => {
                     if (app.inStartMenu) {
                        return (
                           <Tile
                              key={index}
                              accent={accent}
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
