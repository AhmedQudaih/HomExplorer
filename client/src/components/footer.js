import React from 'react'
import { animateScroll as scroll } from 'react-scroll'
import {Instagram ,Facebook ,Twitter ,LinkedIn} from "@mui/icons-material";
import {
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink
} from './Styles/footerElementsStyle'
function Footer(){
    const toggleHome = () => {
        scroll.scrollToTop()
      }
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us</FooterLinkTitle>
                                <FooterLink to='/#'>How it works</FooterLink>
                                <FooterLink to='/#'>Testimonials</FooterLink>
                                <FooterLink to='/#'>Careers</FooterLink>
                                <FooterLink to='/#'>Investors</FooterLink>
                                <FooterLink to='/#'>Terms of Service</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Contact Us</FooterLinkTitle>
                                <FooterLink to='/#'>Contact</FooterLink>
                                <FooterLink to='/#'>Support</FooterLink>
                                <FooterLink to='/#'>Destinations</FooterLink>
                                <FooterLink to='/#'>Sponsorships</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Videos</FooterLinkTitle>
                                <FooterLink to='/#'>Submit Video</FooterLink>
                                <FooterLink to='/#'>Ambassadors</FooterLink>
                                <FooterLink to='/#'>Agency</FooterLink>
                                <FooterLink to='/#'>Influencer</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>Social Media</FooterLinkTitle>
                                <FooterLink to='/#'>Facebook</FooterLink>
                                <FooterLink to='/#'>Instagram</FooterLink>
                                <FooterLink to='/#'>Twitter</FooterLink>
                                <FooterLink to='/#'>Linkedin</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/#' onClick={toggleHome}>
                            HomExplorer
                        </SocialLogo>
                        <WebsiteRights>HomExplorer © {new Date().getFullYear()} All rights reserved.</WebsiteRights>
                        <SocialIcons>
                            <SocialIconLink href="/#" target="_blank"
                            aria-label="Facebook">
                                <Facebook />
                            </SocialIconLink>
                            <SocialIconLink href="/#" target="_blank"
                            aria-label="Instagram">
                                <Instagram />
                            </SocialIconLink>
                            <SocialIconLink href="/#" target="_blank"
                            aria-label="Twitter">
                                <Twitter />
                            </SocialIconLink>
                            <SocialIconLink href="/#" target="_blank"
                            aria-label="Linkedin">
                                <LinkedIn />
                            </SocialIconLink>
                        </SocialIcons>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer
