import React, { Component } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import Background from './personalization/background';

const Container = styled.div`
   display: flex;
   height: 100%;
   width: 100%;
`;

const ContentContainer = styled.div`
   flex: 1;
   background: white;
   padding-top: 2.5em;
`;

const views = {
   Background: <Background />
}

export default class PersonalizationView extends Component {
   state = {
      section: 'Background',
   };

   handleEvent = options => {
      switch (options.type) {
         case 'change-section':
            this.changeSection(options);
            break;
         default:
            this.props.onEvent(options);
            break;
      }
   };

   changeSection(options) {
      const { section } = options;

      this.setState({ section });
   }

   getCurrentSection = () => {
      const { section } = this.state;
      const view = views[section];
      const props = {
         onEvent: this.handleEvent
      }

      try {
         return React.cloneElement(view, props);
      } catch(e) {
         console.error("Unable to get current section");
      }
   }

   render() {
      const { section } = this.state;
      return (
         <Container>
            <Sidebar view="Personalization" section={section} onEvent={this.handleEvent} />
            <ContentContainer>
               {this.getCurrentSection()}
            </ContentContainer>
         </Container>
      );
   }
}
