import React from 'react'
import Icon1 from '../images/svg-4.svg'
import Icon2 from '../images/svg-5.svg'
import Icon3 from '../images/svg-6.svg'
import Icon4 from '../images/svg-4.svg'
import Icon5 from '../images/svg-5.svg'
import Icon6 from '../images/svg-6.svg'
import { 
    ServicesContainer, 
    ServicesH1, 
    ServicesWrapper, 
    ServicesCard,
    ServicesIcon, 
    ServicesH2, 
    ServicesP 
} from './Styles/servicesElementsStyle'
const Services = () => {
    return (
        <ServicesContainer id="services">
        <ServicesH1>Services</ServicesH1>
        <ServicesWrapper>
            <ServicesCard>
                <ServicesIcon src={Icon1} />
                <ServicesH2>Home Type</ServicesH2>
                <ServicesP>It is a long established fact that a reader will be distracted by content.</ServicesP>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon2} />
                <ServicesH2>Home Type</ServicesH2>
                <ServicesP>It is a long established fact that a reader will be distracted by content.</ServicesP>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon3} />
                <ServicesH2>Home Type</ServicesH2>
                <ServicesP>It is a long established fact that a reader will be distracted by content.</ServicesP>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon4} />
                <ServicesH2>Home Type</ServicesH2>
                <ServicesP>It is a long established fact that a reader will be distracted by ontent.</ServicesP>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon5} />
                <ServicesH2>Home Type</ServicesH2>
                <ServicesP>It is a long established fact that a reader will be distracted by content.</ServicesP>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon6} />
                <ServicesH2>Home Type</ServicesH2>
                <ServicesP>It is a long established fact that a reader will be distracted by content.</ServicesP>
            </ServicesCard>
        </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Services
