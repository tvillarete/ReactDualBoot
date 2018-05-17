import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Tile from './start_menu/tile';

const duration = '0.3s';
const Container = styled.div`
   position: fixed;
   display: flex;
   bottom: 3.5rem;
   left: 0;
   height: 30em;
   width: 50em;
   background: rgba(0,0,0, 1);
   backdrop-filter: blur(10px);
   animation: ${props => (props.isClosing ? 'closeDrawer' : 'openDrawer')}
      ${duration};

   @supports(backdrop-filter: blur(10px)) {
      backdrop-filter: blur(10px);
      background: rgba(0,0,0,0.8);
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

const SidebarContainer = styled.div`
   flex: 1;
   max-width: 15em;
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
      const { apps, appConfig } = this.props;
      const { isClosing } = appConfig;

      return (
         <Container isClosing={isClosing}>
            <SidebarContainer />
            <TileContainer>
               {apps.map((app, index) => {
                  if (app.inStartMenu) {
                     return (
                        <Tile
                           key={index}
                           appConfig={app}
                           onEvent={this.handleEvent}
                        />
                     );
                  }
                  return null;
               })}
            </TileContainer>
         </Container>
      );
   }
}
