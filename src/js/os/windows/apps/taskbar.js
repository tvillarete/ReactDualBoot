import React, { Component } from 'react';
import styled from 'styled-components';
import TaskbarButton from './taskbar/taskbar_button';

const TaskbarContainer = styled.div`
   position: fixed;
   z-index: 100;
   bottom: 0;
   left: 0;
   right: 0;
   height: 3.5rem;
   display: flex;
   background: black;

   ${props => props.theme === 'dark' && `
   `}
`;


export default class Taskbar extends Component {
   handleEvent = options => {
      switch(options.type) {
         default:
            this.props.onEvent(options);
            break;
      }
   }

   render() {
      const { apps, appConfig } = this.props;

      return (
         <TaskbarContainer
            theme={appConfig.theme}>
            {apps.map(app => {
               return app.inTaskbar || (app.isActive && !app.forceHideTaskbar) ? (
                  <TaskbarButton
                     key={app.name}
                     appConfig={app}
                     onEvent={this.handleEvent}/>
               ) : null
            })}
         </TaskbarContainer>
      );
   }
}
