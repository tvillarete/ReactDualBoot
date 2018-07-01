import React, { Component } from 'react';
import styled from 'styled-components';
import HomeView from './edge/views/home';
import TabBar from './edge/components/tab_bar';

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
      tabs: [
         {
            title: 'Bing',
            url: 'http://www.bing.com',
         },
      ],
      currentTab: 0,
   };

   handleEvent = options => {
      switch (options.type) {
         case 'new-view':
            this.newView(options);
            break;
         case 'new-tab':
            this.newTab();
            break;
         case 'set-current-tab':
            this.setCurrentTab(options.index);
            break;
         case 'close-tab':
            this.closeTab(options.index);
            break;
         case 'back':
            this.back();
            break;
         default:
            this.props.onEvent(options);
            break;
      }
   };

   setCurrentTab(index) {
      this.setState({ currentTab: index });
   }

   newTab = () => {
      this.setState(state => {
         state.tabs.push({
            title: 'Bing',
            url: 'https://www.bing.com'
         });
         state.currentTab = state.tabs.length-1;
         return state;
      });
   }

   closeTab(index) {
      const {appConfig} = this.props;

      if (this.state.tabs.length === 1) {
         this.props.onEvent({
            type: 'close-window',
            appConfig
         });
         return;
      }

      this.setState(state => {
         state.tabs.splice(index, 1);
         state.curentTab = state.tabs[state.tabs.length-1].index;
         return state;
      })
   }

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
      const { tabs, currentTab } = this.state;

      let item = viewStack[viewStack.length - 1];
      item.props = {
         ...this.props,
         enteringOldView: this.props.appConfig.enteringOldView,
         tabs,
         currentTab,
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
      const { tabs, currentTab } = this.state;

      return (
         <ViewContainer changingView={this.state.changingView}>
            <TabBar
               tabs={tabs}
               currentTab={currentTab}
               onEvent={this.handleEvent}
            />
            {this.getCurrentView()}
         </ViewContainer>
      );
   }
}
