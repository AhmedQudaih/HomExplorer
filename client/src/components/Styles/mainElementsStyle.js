import styled from "styled-components";
export const MainContainer = styled.div`
background: #0c0c0c;
display: flex;
justify-content: center;
align-items: center;
padding: 0 3rem;
height: 80rem;
position: relative;
z-index: 1;
:before {
    content: '';
    position: absolute;
    top= 0;
    left= 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%,
    rgba(0,0,0,0.6) 100%), linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
    z-index: 2;
}
`

export const MainBg = styled.div`
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
width: 100%;
height: 100%;
overflow: hidden;
`

export const MainBtnArrowStyle = {
marginLeft: "0.8rem",
fontSize: "2rem",
}

export const VideoBg = styled.video`
width: 100%;
height: 100%;
-o-object-fit: cover;
object-fit: cover;
background: #232a34;
`
export const ImgBg = styled.img`
width: 100%;
height: 100%;
-o-object-fit: cover;
object-fit: cover;
background: #232a34;
`
export const MainContent = styled.div`
z-index: 3;
max-width: 120rem;
position: absolute;
padding: 0.8rem 2.4rem;
display: flex;
flex-direction: column;
align-items: center;
`
export const MainH1 = styled.h1`
color: #fff;
font-size: 4.8rem;
text-align: center;

@media screen and (max-width: 76.8rem){
    font-size: 4rem;
}
@media screen and (max-width: 48rem){
    font-size: 3.2rem;
}
`
export const MainP = styled.p`
margin-top: 2.4rem;
color: #fff;
font-size: 2.4rem;
text-align: center;
max-width: 60rem;

@media screen and (max-width: 76.8rem){
    font-size: 2.4rem;
}

@media screen and (max-width: 48rem){
    font-size: 1.8rem;
}
`
export const MainBtnWrapper = styled.div`
margin-top: 3.2rem;
display: flex;
flex-direction: column;
align-items: center;
`
