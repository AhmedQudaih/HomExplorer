import styled from 'styled-components'
import {Link} from 'react-scroll'
export const Button = styled(Link)`
border-radius: 10rem;
background: ${({primary}) => (primary ? '#01BF71' : '#010606')};
white-space: nowrap;
padding: ${({big}) => (big ? '1.4rem 4.8rem' : '1.2rem 3rem') };
color: ${({dark}) => (dark ? '#010606' : '#fff' )};
font-size: ${({fontBig}) => (fontBig ? '2rem' : '1.6rem')};
outline: none;
border: none;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.2s ease-in-out;

&:hover{
    transition: all 0.2s ease-in-out;
    background: ${({primary}) => (primary ? '#fff' : '#01B71')};
}
`
