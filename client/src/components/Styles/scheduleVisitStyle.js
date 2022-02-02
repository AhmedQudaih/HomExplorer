import styled from "styled-components";
export const ScheduleCard = styled.div`
width: 80%;
margin: 5% auto;
border-radius: 1rem;
padding: 3rem;
box-shadow: 0 0.1rem 0.3rem rgba(0,0,0,0.2);
display: grid;
grid-template-columns: 1fr 0.5fr ;
grid-gap: 4rem;
transition: all 0.2s ease-in-out;
`

export const ScheduleCardHeader = styled.h1`
color: #000;
grid-column: 1 /-1;
font-size: 2rem;
text-align: start;

@media screen and (max-width: 48rem){
    font-size: 1.6rem;
}
`
