import styled from "styled-components";
export const MainContent = styled.div`
z-index: 3;
max-width: 120rem;
background:#FAF9F6;
border-radius: 3rem;
position: absolute;
padding: 4rem 2.4rem;
margin: 0 auto;
display: grid;
grid-template-columns: 1fr  ;
align-items: center;
grid-gap: 1.6rem;
`
export const SearchAndExpand = styled.div`
display: grid;
grid-template-columns: 1fr;
align-items: center;
`

export const MainBtnArrowStyle = {
marginLeft: "0.8rem",
fontSize: "2rem",
}


export const ProductMainH1 = styled.h1`
color: #000;
font-size: 4.8rem;
text-align: center;

@media screen and (max-width: 76.8rem){
    font-size: 4rem;
}
@media screen and (max-width: 48rem){
    font-size: 3.2rem;
}
`
export const ProductMainP = styled.p`
margin-top: 2.4rem;
color: #000;
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
