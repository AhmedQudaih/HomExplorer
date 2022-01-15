import React, {useState} from 'react';
import { ButtonS } from './Styles/buttonElementsStyle';
import Video from '../videos/video.mp4';
import { MainContainer, MainBg, VideoBg, MainContent, MainH1,
MainP, MainBtnWrapper, MainBtnArrowStyle } from './Styles/mainElementsStyle';
import { ArrowForward, KeyboardArrowRight  } from '@material-ui/icons';
function Main() {
    const [hover, setHover] = useState(false)
    const onHover = () => {
        setHover(!hover)
    }
    return (
        <MainContainer>
            <MainBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
            </MainBg>
            <MainContent>
                <MainH1>Home Explorer</MainH1>
                <MainP>
                    Pick your home now!
                </MainP>
                <MainBtnWrapper>
                    <ButtonS to="signup" onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary="true"
                    dark="true"
                    >
                        Get Started {hover ? <ArrowForward  style={MainBtnArrowStyle} /> : <KeyboardArrowRight style={MainBtnArrowStyle}/>}
                    </ButtonS>
                </MainBtnWrapper>
            </MainContent>
        </MainContainer>
    )
}

export default Main
