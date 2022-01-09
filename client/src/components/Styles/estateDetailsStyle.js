import styled from "styled-components";

export const DetailsBtnCard = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin: 5% auto;
border-radius: 1rem;
padding: 3rem;
box-shadow: 0 0.1rem 0.3rem rgba(0,0,0,0.2);
transition: all 0.2s ease-in-out;
`

export const ExpandedIconDetailsCard = styled.div`
margin: 5% auto;
min-width:100%;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr ;
grid-gap: 4rem;
transition: all 0.2s ease-in-out;
`