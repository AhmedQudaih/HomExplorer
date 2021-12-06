import React, {useState} from 'react'
import { Button } from '../ButtonElements'
import Video from '../../videos/video.mp4'
import { MainContainer, MainBg, VideoBg, MainContent, MainH1,
MainP, MainBtnWrapper, ArrowForward, ArrowRight } from './MainElements'
const MainSection = () => {
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
                    <Button to="signup" onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary="true"
                    dark="true"
                    >
                        Get Started {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </MainBtnWrapper>
            </MainContent>
            
        </MainContainer>
    )
}

export default MainSection
