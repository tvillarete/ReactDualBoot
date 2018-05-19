import React, { Component } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/sidebar';
import Background from './personalization/background';
import Colors from './personalization/colors';

const Container = styled.div`
   display: flex;
   height: 100%;
   width: 100%;
   animation: ${props => props.enteringOldView ? 'scaleBig' : 'scale'} 0.7s;
   animation-timing-function: cubic-bezier(0,.99,0,.99);

   @keyframes scale {
      0% {
         transform: scale(0.85);
      }
   }

   @keyframes scaleBig {
      0% {
         transform: scale(1.15);
      }
   }

`;

const ContentContainer = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   flex: 1;
   background: white;
   padding-top: 4.5em;
`;

const InnerContainer = styled.div`
   position: absolute;
   top: 7.5em;
   bottom: 0;
   left: 0;
   right: 0;
   overflow: auto;
`;

const Header = styled.h3`
   margin: 0 0 16px 24px;
   font-weight: 300;
   font-size: 24px;
   font-family: sans-serif;
`;

const views = {
   Background: <Background />,
   Colors: <Colors />
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
         ...this.props,
         onEvent: this.handleEvent
      }

      try {
         return React.cloneElement(view, props);
      } catch(e) {
         console.error("Unable to get current section");
      }
   }

   componentDidMount() {
      console.log(this.props);
      this.setState({ enteringOldView: this.props.enteringOldView });
   }

   render() {
      const { section, enteringOldView } = this.state;
      const { desktop } = this.props;

      return (
         <Container enteringOldView={enteringOldView}>
            <Sidebar view="Personalization" desktop={desktop} section={section} onEvent={this.handleEvent} />
            <ContentContainer>
               <Header>{section}</Header>
               <InnerContainer>
                  {this.getCurrentSection()}
               </InnerContainer>
            </ContentContainer>
         </Container>
      );
   }
}
