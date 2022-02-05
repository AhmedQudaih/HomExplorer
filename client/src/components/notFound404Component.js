import React from 'react';
import img from '../images/notFound404.svg';
import { ButtonR} from './Styles/buttonElementsStyle'
import {InfoContainer,InfoWrapper,InfoRow,Column1, Column2,TextWrapper,TopLine,Heading,Subtitle,BtnWrap,ImgWrap,Img} from './Styles/infoElementsStyle';
const NotFound404Component = () =>{
  return(
    <InfoContainer lightBg={true}>
        <InfoWrapper>
            <InfoRow imgStart={true}>
                <Column1>
                    <TextWrapper>
                        <TopLine>Code 404</TopLine>
                        <Heading lightText={false}>Page Not Found</Heading>
                        <Subtitle darkText={true}>Somthing went wrong code 404 we can't found this page. try again later </Subtitle>
                        <BtnWrap>
                            <ButtonR to='/'
                            duration={500}
                            exact="true"
                            offset={-80}
                            primary={1}
                            dark={1}
                            dark2={1}
                            > Back To Main </ButtonR>
                        </BtnWrap>
                    </TextWrapper>
                </Column1>
                <Column2>
                    <ImgWrap>
                        <Img src={img} alt={"alt"} />
                    </ImgWrap>
                </Column2>
            </InfoRow>
        </InfoWrapper>
    </InfoContainer>
  );
}

export default NotFound404Component;
