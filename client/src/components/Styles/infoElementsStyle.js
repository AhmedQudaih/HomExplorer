import styled from 'styled-components'

export const InfoContainer = styled.div`
color: #fff;
background: ${({lightBg}) => (lightBg ? '#f9f9f9' : '#010606')};

@media screen and (max-width: 76.8rem) {
    padding: 10rem 0;
}
`
export const InfoWrapper = styled.div`
display: grid;
z-index: 1;
height: 86rem;
width: 100%;
max-width: 110rem;
margin-right: auto;
margin-left: auto;
padding: 0 2.4rem;
justify-content: center;
`
export const InfoRow = styled.div`
display: grid;
grid-auto-Columns: minmax(auto, 1fr);
align-items: center;
grid-template-areas: ${({imgStart}) => imgStart ? `'col2 col1'` : `'col1 col2'`};
@media screen and (max-width: 76.8rem) {
    grid-template-areas: ${({imgStart}) => imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`}
}
`
export const Column1 = styled.div`
margin-bottom: 1.5rem;
padding: 0 1.5rem;
grid-area: col1;
`
export const Column2 = styled.div`
margin-bottom: 1.5rem;
padding: 0 1.5rem;
grid-area: col2;
`
export const TextWrapper = styled.div`
max-width: 54rem;
padding-top: 0;
padding-bottom: 6rem;
`
export const TopLine = styled.p`
color: #01bf71;
font-size: 1.6rem;
line-height: 1.6rem;
font-weight: 70rem;
letter-spacing: 0.14rem;
text-transform: uppercase;
margin-bottom: 1.6rem;
`
export const Heading = styled.h1`
margin-bottom: 2.4rem;
font-size: 4.8rem;
line-height: 1.1;
font-weight: 600;
color: ${({lightText}) => (lightText ? '#f7f8fa' : '#010606')};
`
export const Subtitle = styled.p`
max-width: 44rem;
margin-bottom: 3.5rem;
font-size: 1.8rem;
line-height: 2.4rem;
color: ${({darkText}) => (darkText ? '#010606' : "#fff")};
`
export const BtnWrap = styled.div`
display: flex;
justify-content: flex-start;
`
 export const ImgWrap = styled.div`
 max-width: 55.5rem;
 height: 100%;
 `
 export const Img = styled.img`
 width: 100%;
 margin: 0 0 1rem 0;
 padding-right: 0;
 `
