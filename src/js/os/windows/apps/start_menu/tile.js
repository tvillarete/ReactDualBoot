import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 7em;
   width: 7em;
   background: ${props => props.color || 'dodgerblue'};
   border: 2px solid ${props => props.color || 'dodgerblue'};

   &:hover {
      border: 2px solid white;
   }
`;

const IconContainer = styled.div`
   display: flex;
   justify-content: center;
   flex: 1;
`;

const Icon = styled.img`
   height: 80%;
   width: auto;
   margin: auto;
`;

const TileTitle = styled.h3`
   font-size: 16px;
   color: white;
   font-family: sans-serif;
   font-weight: normal;
   margin: 8px;
   user-select: none;
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
      const { appConfig, accent } = this.props;
      return (
         <Container color={accent} onClick={this.openApp}>
            <IconContainer>
               <Icon src={`images/icons/windows/${appConfig.icon}`} draggable="false"/>
            </IconContainer>
            <TileTitle>{appConfig.name}</TileTitle>
         </Container>
      );
   }
}
