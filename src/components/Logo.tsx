import React from 'react';
import {styled} from '@mui/system';


const StyledLogo = styled('div')`
	text-decoration: none;
	font-weight: 500;
	display: flex;
	flex-direction: row;
	align-items: center;

	i {
		width: 19px;
		height: 24px;
		color: ${({theme: {palette: {mode}}}) => mode === 'light' ? '#fff' : 'rgb(27, 22, 66)'};
		background: ${({theme: {palette: {mode}}}) => mode === 'light' ? 'rgb(27, 22, 66)' : '#fff'};
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 8px 0 8px 0;
		margin-right: 8px;
		font-size: 18px;

	}

	span {
		color: ${({theme: {palette: {mode}}}) => mode === 'light' ? 'rgb(27, 22, 66)' : '#fff'};
		text-decoration: none !important;
		font-weight: 600;
		font-size: 18px;
		word-spacing: 10px;
	}
`;


export const Logo = (): JSX.Element => {
  return <StyledLogo>
    <i>B</i>
    <span>
      OVB
    </span>
  </StyledLogo>;
};
