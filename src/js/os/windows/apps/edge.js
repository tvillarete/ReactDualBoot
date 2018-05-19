import React, { Component } from 'react';
import styled from 'styled-components';
import HomeView from './edge/views/home';

const ViewContainer = styled.div`
   display: flex;
   flex: 1;
   height: 100%;
   background: ${props => (props.changingView ? 'white' : 'transparent')};
   transition: ${props => (props.changingView ? 'none' : 'all 0.15s ease')};
`;

const views = {
   Home: <HomeView />,
};

export default class Edge extends Component {
   state = {
      changingView: false,
   };

   handleEvent = options => {
      switch (options.type) {
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
   };

   newView = options => {
      let { appConfig } = this.props;
      let { viewStack } = this.props.appConfig.app;

      this.setState({ changingView: true });

      setTimeout(() => {
         this.setState({ changingView: false });
      }, 300);

      viewStack.push({
         view: options.view,
         props: options.props || {},
      });

      appConfig.app.viewStack = viewStack;
      appConfig.enteringOldView = false;

      this.props.onEvent({
         type: 'update-app-config',
         appConfig,
      });
   };

   back = () => {
      let { appConfig } = this.props;
      let { viewStack } = appConfig.app;

      if (viewStack.length >= 1) {
         viewStack = viewStack.pop();
         console.log("HERE");

         this.setState({
            changingView: true,
         });
         appConfig.enteringOldView = true;

            console.log(appConfig);
         setTimeout(() => {
            this.setState({
               changingView: false,
            });
            this.props.onEvent({
               type: 'update-app-config',
               appConfig,
            });
         }, 300);
      }

      appConfig.viewStack = viewStack;

      this.props.onEvent({
         type: 'update-app-config',
         appConfig,
      });
   };

   getCurrentView = () => {
      const { viewStack } = this.props.appConfig.app;
      let item = viewStack[viewStack.length - 1];
      item.props = {
         ...this.props,
         enteringOldView: this.props.appConfig.enteringOldView,
         onEvent: this.handleEvent,
      };

      try {
         return React.cloneElement(views[item.view], item.props);
      } catch (e) {
         console.error('This is an empty view');
         return React.cloneElement(views.Home, item.props);
      }
   };

   render() {
      return (
         <ViewContainer changingView={this.state.changingView}>
            {this.getCurrentView()}
         </ViewContainer>
      );
   }
}
