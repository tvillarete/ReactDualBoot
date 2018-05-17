import React, { Component } from 'react';
import JSON from 'circular-json';
import config from './windows/config';
import Desktop from './windows/desktop';

export default class Windows extends Component {
   state = {
      saveConfig: false,
      config: config
   }

   handleEvent = options => {
      switch (options.type) {
         case 'change-background':
            this.changeBackground(options);
            break;
         case 'update-app-config':
            this.updateAppConfig(options);
            break;
         default:
            this.props.onEvent(options);
            break;
      }
   };

   changeBackground(options) {
      let { config } = this.state;
      const { url } = options;
      config.desktop.background = url;

      this.updateConfig(config);
   }

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

   updateConfig(newConfig) {
      this.setState({ config: newConfig });
      localStorage.windows_config = JSON.stringify(newConfig);
   }

   getConfig() {
      if (!this.state.saveConfig) {
         localStorage.removeItem('windows_config');
      }
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
