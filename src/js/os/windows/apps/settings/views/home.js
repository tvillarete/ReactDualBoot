import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   height: 100%;
   width: 100%;
   background: white;
   padding-top: 2.5em;
`;

export default class HomeView extends Component {
   changeView = () => {
      this.props.onEvent({
         type: 'new-view',
         view: 'personalization'
      });
   }

   render() {
      return (
         <Container>
            <h3 onClick={this.changeView}>Home</h3>
         </Container>
      );
   }
}
