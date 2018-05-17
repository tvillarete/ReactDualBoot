import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 7em;
   width: 7em;
   background: dodgerblue;

   &:hover {
      outline: 3px solid white;
   }
`;

const IconContainer = styled.div`
   display: flex;
   justify-content: center;
   flex: 1;
`;

const Icon = styled.img`
   height: 100%;
   width: auto;
`;

const TileTitle = styled.h3`
   font-size: 16px;
   color: white;
   font-family: sans-serif;
   font-weight: normal;
   margin: 8px;
`;

export default class Tile extends Component {
   openApp = () => {
      this.props.onEvent({
         type: 'open-app',
         appConfig: this.props.appConfig
      });
      this.props.onEvent({
         type: 'close-start-menu'
      });
   }

   render() {
      const { appConfig } = this.props;
      return (
         <Container onClick={this.openApp}>
            <IconContainer>
               <Icon src={`images/icons/windows/${appConfig.icon}`}/>
            </IconContainer>
            <TileTitle>{appConfig.name}</TileTitle>
         </Container>
      );
   }
}
