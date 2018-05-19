import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   max-width: 15em;
   padding-left: 3.5em;
`;

const alphabet = [
   '#', 'a', 'b','c','d','e','f','g','h','i','j','k','l',
   'm','n','o','p','q','r','s','t','u','v','w','x','y','z'
];

const AppButtonContainer = styled.div`
   display: flex;
   flex-direction: column;
`;

const AppButton = styled.div`
   display: flex;
   align-items: center;
   width: 100%;
   margin: 8px 0;

   &:hover {
      outline: 2px solid white;
   }
`;

const Icon = styled.img`
   height: 2em;
   width: 2em;
   padding: 8px;
   margin-right: 8px;
   background: ${props => props.accent};
   user-select: none;
`;

const AppText = styled.h3`
   font-family: sans-serif;
   color: white;
   font-size: 16px;
   font-weight: normal;
   margin: 8px 0;
   user-select: none;
   cursor: default;
`;

export default class AppList extends Component {
   state = {
      list: null
   }

   openApp = appConfig => {
      this.props.onEvent({
         type: 'open-app',
         appConfig
      });
      this.props.onEvent({
         type: 'close-start-menu'
      });
   }

   sortApps() {
      const { apps } = this.props;
      const list = {
         '#':{}, 'a':{}, 'b':{}, 'c':{}, 'd':{}, 'e':{}, 'f':{}, 'g':{},
         'h':{}, 'i':{}, 'j':{}, 'k':{}, 'l':{}, 'm':{}, 'n':{}, 'o':{},
         'p':{}, 'q':{}, 'r':{}, 's':{}, 't':{}, 'u':{}, 'v':{}, 'w':{},
         'x':{}, 'y':{}, 'z':{}
      };

      for (let index in apps) {
         const appConfig = apps[index];
         const firstLetter = appConfig.name[0].toLowerCase();
         if (appConfig.isWindowed) {
            if (Number.isInteger(firstLetter)) {
               list['#'][appConfig.name] = appConfig;
            } else {
               list[firstLetter][appConfig.name] = appConfig;
            }
         }
      }
      this.setState({ list });
   }

   getLetterGroup = letter => {
      const { list } = this.state;
      const group = list[letter];
      const { accent } = this.props;
      const appButtons = [];

      for (let app in group) {
         const config = group[app];
         appButtons.push(
            <AppButton key={app} onClick={() => this.openApp(config)}>
               <Icon accent={config.app.accent || accent} src={`images/icons/windows/${config.icon}`} draggable="false"/>
               <AppText>{app}</AppText>
            </AppButton>
         );
      }
      return (
         <AppButtonContainer key={letter}>
            <AppText>{letter.toUpperCase()}</AppText>
            {appButtons}
         </AppButtonContainer>
      );
   }

   componentDidMount() {
      this.sortApps();
   }

   render() {
      const { list } = this.state;

      return (
         <Container>
            {alphabet.map(letter => {
               if (list === null || (Object.keys(list[letter]).length === 0 &&
                  list[letter].constructor === Object)) {
                  return null;
               }
               return this.getLetterGroup(letter);
            })}
         </Container>
      );
   }
}
