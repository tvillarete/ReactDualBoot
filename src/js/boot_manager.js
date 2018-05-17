import React, { Component } from 'react';
import Windows from './os/windows';

const osList = {
   windows: <Windows />,
};

export default class BootManager extends Component {
   state = {
      selectedOS: 'windows',
   };

   handleEvent = options => {
      console.log("Empty event: Reached boot manager:", options);
   }

   loadSelectedOS = () => {
      const { selectedOS } = this.state;

      if (!selectedOS) {
         return;
      }

      const os = osList[selectedOS];

      let props = { onEvent: this.handleEvent };

      try {
         return React.cloneElement(os, props);
      } catch (e) {
         console.error("Couldn't load OS:", selectedOS);
         console.error(e);
      }
   };

   render() {
      const { selectedOS } = this.state;

      return (
         <div className="boot-manager">
            {selectedOS ? this.loadSelectedOS() : <h3>No OS Selected</h3>}
         </div>
      );
   }
}
