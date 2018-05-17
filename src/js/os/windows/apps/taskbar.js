import React, { Component } from 'react';
import styled from 'styled-components';
import TaskbarButton from './taskbar/taskbar_button';

const TaskbarContainer = styled.div`
   position: fixed;
   z-index: 100;
   bottom: 0;
   left: 0;
   right: 0;
   height: 3rem;
   display: flex;
   background: black;

   @supports(backdrop-filter: blur(10px)) {
      backdrop-filter: blur(10px);
      background: rgba(0,0,0,0.85);
   }

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
      const { apps, appConfig, desktop } = this.props;

      return (
         <TaskbarContainer
            theme={appConfig.theme}>
            {apps.map(app => {
               return app.inTaskbar || (app.isActive && !app.forceHideTaskbar) ? (
                  <TaskbarButton
                     key={app.name}
                     inTaskbar={app.inTaskbar}
                     appConfig={app}
                     accent={desktop.accent}
                     onEvent={this.handleEvent}/>
               ) : null
            })}
         </TaskbarContainer>
      );
   }
}
