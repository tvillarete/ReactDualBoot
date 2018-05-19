import React, { Component } from 'react';
import styled from 'styled-components';
import Taskbar from './taskbar';
import StartMenu from './start_menu';
import Settings from './settings';
import AppWindow from './window';

const appList = {
   Taskbar: <Taskbar key="Taskbar" />,
   'Start Menu': <StartMenu key="Start Menu" />,
   Settings: <Settings key="Settings App" />,
};

const AppsContainer = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
`;

export default class AppManager extends Component {
   handleEvent = options => {
      switch (options.type) {
         case 'toggle-special-app':
            this.toggleSpecialApp(options);
            break;
         case 'toggle-windowed-app':
            this.toggleWindowedApp(options);
            break;
         case 'open-app':
            this.openApp(options);
            break;
         case 'close-window':
            this.closeWindow(options);
            break;
         case 'minimize-window':
            this.minimizeWindow(options);
            break;
         default:
            this.props.onEvent(options);
            break;
      }
   };

   openApp(options) {
      let { appConfig } = options;

      if (appConfig.isActive && !appConfig.isMinimized) {
         return;
      }
      appConfig.isMinimized = false;
      appConfig.isActive = true;

      this.props.onEvent({
         type: 'update-app-config',
         appConfig,
      });
   }

   toggleSpecialApp(options) {
      let { appConfig } = options;

      if (appConfig.isActive) {
         appConfig.isClosing = true;
         this.props.onEvent({
            type: 'update-app-config',
            appConfig,
         });

         setTimeout(() => {
            appConfig.isClosing = false;
            appConfig.isActive = false;

            this.props.onEvent({
               type: 'update-app-config',
               appConfig,
            });
         }, 190);
      } else {
         appConfig.isActive = true;
         this.props.onEvent({
            type: 'update-app-config',
            appConfig,
         });
      }
   }

   toggleWindowedApp(options) {
      let { appConfig } = options;

      if (!appConfig.isActive) {
         appConfig.isActive = true;
      } else {
         appConfig.isMinimized = !options.appConfig.isMinimized;
      }

      if (options.value === 'close') {
         appConfig.isMinimized = false;
         appConfig.isActive = false;
      }

      this.props.onEvent({
         type: 'update-app-config',
         appConfig,
      });
   }

   closeWindow = options => {
      let { appConfig } = options;

      appConfig.isClosing = true;
      this.props.onEvent({
         type: 'update-app-config',
         appConfig
      });
      setTimeout(() => {
         appConfig.isClosing = false;
         appConfig.isActive = false;
         appConfig.enteringOldView = false;

         this.props.onEvent({
            type: 'update-app-config',
            appConfig
         });
      }, 240);
   }

   minimizeWindow = options => {
      let { appConfig } = options;

      appConfig.isMinimized = true;
      this.props.onEvent({
         type: 'update-app-config',
         appConfig
      });
   }

   getWindowedApp = (app, props) => {
      return (
         <AppWindow
            key={`${app.name}-window`}
            {...props}
            windowContents={app}
            onEvent={this.handleEvent}
         />
      );
   };

   render() {
      const { config } = this.props;
      const { apps, desktop } = config;

      return (
         <AppsContainer>
            {apps.map((app, index) => {
               if (app.isActive) {
                  if (app.isWindowed) {
                     return this.getWindowedApp(appList[app.name], {
                        apps,
                        desktop,
                        appConfig: app,
                        onEvent: this.handleEvent,
                     });
                  }
                  return React.cloneElement(appList[app.name], {
                     apps,
                     desktop,
                     appConfig: app,
                     onEvent: this.handleEvent,
                  });
               }
               return null;
            })}
         </AppsContainer>
      );
   }
}
