import styled from "styled-components";
import { HashLink } from 'react-router-hash-link';

export const FooterContainer = styled.div`
background-color: #101522;
`
export const FooterWrap = styled.div`
padding: 4.8rem 2.4rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 110rem;
margin: 0 auto;
`
export const FooterLinksContainer = styled.div`
display: flex;
justify-content: center;

@media screen and (max-width: 82rem){
    padding-top:3.2rem;
}
`
export const FooterLinksWrapper = styled.div`
display: flex;

@media screen and (max-width: 82rem){
    flex-direction: column;
}
`
export const FooterLinkItems = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin: 1.6rem;
text-align: left;
width: 16rem;
box-sizing: border-box;
color: #fff;

@media screen and (max-width: 42rem){
    margin: 0;
    padding: 1rem;
    width: 100%;
}
`
export const FooterLinkTitle = styled.h1`
font-size: 1.4rem;
margin-bottom: 1.6rem;
`
export const FooterLink = styled(HashLink)`
color: #fff;
text-decoration: none;
margin-bottom: 0.5rem;
font-size: 1.4rem;

&:hover {
    color: #01bf71;
    transition: 0.3s ease-out;
}
`
export const SocialMedia = styled.section`
max-width: 100rem;
width: 100%;
`
export const SocialMediaWrap = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
max-width: 110rem;
margin: 4rem auto 0 auto;

@media screen and (max-width: 82rem){
    flex-direction: column;
}
`
export const SocialLogo = styled(HashLink)`
color: #fff;
justify-self: start;
cursor: pointer;
text-decoration: none;
font-size: 1.5rem;
display: flex;
align-items: center;
margin-bottom: 1.6rem;
font-weight: bold;
`
export const WebsiteRights = styled.small`
color: #fff;
margin-bottom: 1.6rem;
`
export const SocialIcons = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 24rem;
`
export const SocialIconLink = styled.a`
color: #fff;
font-size: 2.4rem;
`
