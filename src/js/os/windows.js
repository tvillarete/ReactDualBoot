import React, { Component } from 'react';
import JSON from 'circular-json';
import defaultConfig from './windows/config';
import Desktop from './windows/desktop';

export default class Windows extends Component {
   state = {
      saveConfig: false,
      config: defaultConfig,
   }

   handleEvent = options => {
      switch (options.type) {
         case 'change-background':
            this.changeBackground(options);
            break;
         case 'change-accent':
            this.changeAccent(options);
            break;
         case 'update-app-config':
            this.updateAppConfig(options);
            break;
         case 'update-desktop-config':
            this.updateDesktopConfig(options);
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
      this.saveConfig(config);
   }

   changeAccent(options) {
      let { config } = this.state;
      const { accent } = options;

      config.desktop.accent = accent;
      this.saveConfig(config);
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

   saveConfig(newConfig) {
      this.setState({ config: newConfig });
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
