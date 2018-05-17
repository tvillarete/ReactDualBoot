import React, { Component } from 'react';
import styled from 'styled-components';
import PersonalizationView from './settings/views/personalization';
import HomeView from './settings/views/home';

const ViewContainer = styled.div`
   display: flex;
   flex: 1;
   height: 100%;
`;

const views = {
   home: <HomeView />,
   personalization: <PersonalizationView />,
};

export default class Settings extends Component {
   handleEvent = options => {
      switch(options.type) {
         case 'new-view':
            this.newView(options);
            break;
         case 'back':
            this.back();
            break;
         default:
            this.props.onEvent(options);
            break;
      }
   }

   newView = options => {
      let { appConfig } = this.props;
      let { viewStack } = this.props.appConfig.app;

      viewStack.push({
         view: options.view,
         props: options.props || {}
      });

      appConfig.app.viewStack = viewStack;
      this.props.onEvent({
         type: 'update-app-config',
         appConfig
      });
   };

   back = () => {
      let { appConfig } = this.props;
      let { viewStack } = appConfig.app;

      if (viewStack.length > 1) {
         viewStack = viewStack.pop();
      }

      appConfig.viewStack = viewStack;

      this.props.onEvent({
         type: 'update-app-config',
         appConfig
      });
   }

   getCurrentView = () => {
      const { viewStack } = this.props.appConfig.app;
      let item = viewStack[viewStack.length-1];
      item.props = {};
      item.props.onEvent = this.handleEvent;
      item.props.viewStack = viewStack;

      return React.cloneElement(views[item.view], item.props);
   };

   render() {
      return <ViewContainer>{this.getCurrentView()}</ViewContainer>;
   }
}
