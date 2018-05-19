import React from 'react';
import styled from 'styled-components';

const PreviewContainer = styled.div`
   position: relative;
   display: flex;
   height: 9em;
   width: 16em;
   margin-bottom: 24px;
   background: url('${props => props.background}');
   background-size: cover;
   background-color: rgb(230,230,230);
   overflow: hidden;
`;

const StartMenu = styled.div`
   position: absolute;
   bottom: 0;
   padding: 8px;
   background: black;

	svg {
		rect {
			fill: ${props => props.accent || 'dodgerblue'};
		}
	}
`;


const DesktopPreview = ({ accent, background }) => {
   return (
      <PreviewContainer background={background}>
      <StartMenu accent={accent}>
         <svg width="144" height="92" viewBox="0 0 144 92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="49" height="50" transform="translate(70 6)" fill="#1E90FF"/>
            <rect width="24" height="25" transform="translate(120 6)" fill="#1E90FF"/>
            <rect width="24" height="24" transform="translate(120 32)" fill="#1E90FF"/>
            <rect width="49" height="25" transform="translate(95 57)" fill="#1E90FF"/>
            <rect width="12" height="12" transform="translate(70 57)" fill="#1E90FF"/>
            <rect width="11" height="12" transform="translate(83 57)" fill="#1E90FF"/>
            <rect width="11" height="12" transform="translate(83 70)" fill="#1E90FF"/>
            <rect width="12" height="12" transform="translate(70 70)" fill="#1E90FF"/>
            <rect width="49" height="9" transform="translate(70 83)" fill="#1E90FF"/>
            <rect width="24" height="9" transform="translate(120 83)" fill="#1E90FF"/>
            <rect width="10" height="10" transform="translate(0 82)" fill="#1E90FF"/>
            <rect width="10" height="10" transform="translate(0 71)" fill="#1E90FF"/>
            <rect width="10" height="10" transform="translate(0 60)" fill="#1E90FF"/>
            <rect width="10" height="10" transform="translate(0 49)" fill="#1E90FF"/>
            <rect width="10" height="10" transform="translate(0 38)" fill="#1E90FF"/>
            <rect width="10" height="10" transform="translate(0 27)" fill="#1E90FF"/>
            <rect width="10" height="10" transform="translate(0 16)" fill="#1E90FF"/>
            <rect width="10" height="10" transform="translate(0 5)" fill="#1E90FF"/>
            <rect width="17" height="2" transform="translate(12 9)" fill="#1E90FF"/>
            <rect width="17" height="2" transform="translate(12 20)" fill="#1E90FF"/>
            <rect width="17" height="2" transform="translate(12 31)" fill="#1E90FF"/>
            <rect width="17" height="2" transform="translate(12 42)" fill="#1E90FF"/>
            <rect width="17" height="2" transform="translate(12 53)" fill="#1E90FF"/>
            <rect width="17" height="2" transform="translate(12 64)" fill="#1E90FF"/>
            <rect width="10" height="2" transform="translate(12 75)" fill="#1E90FF"/>
            <rect width="18" height="2" transform="translate(12 86)" fill="#1E90FF"/>
            <rect width="30" height="2" fill="#1E90FF"/>
            <rect width="30" height="2" transform="translate(70)" fill="#1E90FF"/>
            <path d="M8.55176 13.6602H3.19043L1.98633 17H0.246094L5.13281 4.20312H6.60938L11.5049 17H9.77344L8.55176 13.6602ZM3.7002 12.2715H8.05078L5.87109 6.28613L3.7002 12.2715ZM18.8438 17C18.75 16.8125 18.6738 16.4785 18.6152 15.998C17.8594 16.7832 16.957 17.1758 15.9082 17.1758C14.9707 17.1758 14.2002 16.9121 13.5967 16.3848C12.999 15.8516 12.7002 15.1777 12.7002 14.3633C12.7002 13.373 13.0752 12.6055 13.8252 12.0605C14.5811 11.5098 15.6416 11.2344 17.0068 11.2344H18.5889V10.4873C18.5889 9.91895 18.4189 9.46777 18.0791 9.13379C17.7393 8.79395 17.2383 8.62402 16.5762 8.62402C15.9961 8.62402 15.5098 8.77051 15.1172 9.06348C14.7246 9.35645 14.5283 9.71094 14.5283 10.127H12.8936C12.8936 9.65234 13.0605 9.19531 13.3945 8.75586C13.7344 8.31055 14.1914 7.95898 14.7656 7.70117C15.3457 7.44336 15.9814 7.31445 16.6729 7.31445C17.7686 7.31445 18.627 7.58984 19.248 8.14062C19.8691 8.68555 20.1914 9.43848 20.2148 10.3994V14.7764C20.2148 15.6494 20.3262 16.3438 20.5488 16.8594V17H18.8438ZM16.1455 15.7607C16.6553 15.7607 17.1387 15.6289 17.5957 15.3652C18.0527 15.1016 18.3838 14.7588 18.5889 14.3369V12.3857H17.3145C15.3223 12.3857 14.3262 12.9688 14.3262 14.1348C14.3262 14.6445 14.4961 15.043 14.8359 15.3301C15.1758 15.6172 15.6123 15.7607 16.1455 15.7607Z" transform="translate(83 20)" fill="white"/>
         </svg>
      </StartMenu>
      </PreviewContainer>
   );
}

export default DesktopPreview;
