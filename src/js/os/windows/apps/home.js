import React, { Component } from 'react';
import styled from 'styled-components';
import config from '../config.json';
import SpriteSheet from './home/sprites';

const Container = styled.div`
   position: relative;
   margin-top: 2.5em;
   display: flex;
   flex-direction: column;
   flex: 1;
   background: white;
`;

const Header = styled.h2`
   font-size: 24px;
   font-weight: normal;
   font-family: sans-serif;
   text-align: center;
`;

const Search = styled.input.attrs({
   type: 'text'
})`
   width: 100%;
   max-width: 18em;
   margin: 16px auto;
   margin-bottom: 48px;
   padding: 4px 16px;
   font-size: 16px;
   border: 2px solid rgb(150,150,150);
   appearance: none;
   outline: none;

   &:hover {
      border: 2px solid rgb(70,70,70);
   }

   &:focus {
      border: 2px solid ${props => props.accent};
   }
`;

const CategoriesContainer = styled.div`
	position: absolute;
	top: 10em;
	bottom: 0;
	left: 0;
	right: 0;
   background: white;
   display: flex;
   flex: 1;
   flex-wrap: wrap;
   justify-content: center;
   align-content: flex-start;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
`;

const Icon = styled.div`
   height: 40px;
   width: 40px;
   margin: 0 8px;
   overflow: hidden;

   svg {
      transform: scale(1.3)
      translate(${props => props.coords[0] + 'px, ' + props.coords[1] + 'px'});

      * {
         stroke: ${props => props.accent};
      }
   }
`;

const CategoryButtonInfo = styled.div`
   display: flex;
   flex-direction: column;
`;

const CategoryButton = styled.div`
   display: flex;
   align-items: center;
   flex: 1 0 auto;
   height: 4em;
   width: 12em;
   margin: 1em;
   cursor: default;
   user-select: none;

   &:hover {
      outline: 3px solid rgb(150,150,150);
   }

   &:active {
      transform: scale(0.9);
   }
`;

const CategoryTitle = styled.h3`
   font-family: sans-serif;
   font-size: 16px;
   font-weight: normal;
   margin: 0 0 8px 0;
`;

const CategoryDesc = styled.h4`
   font-family: sans-serif;
   font-weight: normal;
   font-size: 12px;
   margin: 0;
   color: rgb(70,70,70);
`;

const coords = {
   System: [25,23],
   Devices: [-43,19],
   Phone: [-103,18],
   'Network & Internet': [-165,18],
   Personalization: [26,-17],
   Apps: [-43,-20],
}

export default class HomeView extends Component {
   changeView = (view) => {
      this.props.onEvent({
         type: 'new-view',
         view
      });
   }

   render() {
      const { enteringOldView, desktop } = this.props;
      const { accent } = desktop

      return (
         <Container enteringOldView={enteringOldView}>
         </Container>
      );
   }
}
