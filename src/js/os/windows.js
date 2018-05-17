import React, { Component } from 'react';
import config from './windows/config';
import Desktop from './windows/desktop';

export default class Windows extends Component {
   state = {
      config: config
   }

   handleEvent = options => {
      switch (options.type) {
         case 'update-app-config':
            this.updateAppConfig(options);
            break;
         default:
            this.props.onEvent(options);
            break;
      }
   };

   updateAppConfig(options) {
      const { appConfig } = options;
      let { config } = this.state;

      for (let i in config.apps) {
         if (config.apps[i].name === appConfig.name) {
            config.apps[i] = appConfig;
            this.setState({ config });
         }
      }
   }

   getConfig() {
      const lsConfig = localStorage.windows_config;
      if (!lsConfig) {
         return;
      }

      this.setState({
         config: JSON.parse(lsConfig)
      });
   }

   componentDidMount() {
      this.getConfig();
   }

   render() {
      return (
         <div className="windows">
            <Desktop config={this.state.config} onEvent={this.handleEvent} />
         </div>
      );
   }
}
