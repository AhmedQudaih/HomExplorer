import styled from "styled-components";
export const SearchMainContainer = styled.div`
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
export const SearchMainContent = styled.div`
z-index: 3;
max-width: 120rem;
width:80%;
background:#FAF9F6;
border-radius: 3rem;
position: absolute;
padding: 4rem 2.4rem;
margin: 0 auto;
display: grid;
grid-template-columns: 2fr 1fr 1fr 0.5fr ;
grid-template-rows: 1fr 1fr ;
grid-row:2/3
align-items: center;
grid-gap: 1.6rem;
@media screen and (max-width: 48rem){
  grid-template-columns: 1fr ;
  grid-template-rows: 1fr ;
}
`




export const CollapseDiv = styled.div`
grid-column: 1 /-1;
display: grid;
grid-template-columns: 2fr 1fr 1fr 0.5fr ;
grid-template-rows: 1fr 1fr ;
grid-gap: 1.6rem;
animation: fadeInUp;
animation-duration: 0.5s;
@media screen and (max-width: 48rem){
  grid-template-columns: 1fr ;
}

`


export const CollapseBtn = {
gridColumn: "1 /-1",
}



export const ProductMainH1 = styled.h1`
color: #000;
grid-column: 1 /-1;
font-size: 4rem;
text-align: center;

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
