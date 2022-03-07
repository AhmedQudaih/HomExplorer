import styled from "styled-components";
export const TopThree = styled.div`
display: flex;
flex-direction: row;
width: 80%;
justify-content: space-between;
margin: 5% auto;
border-radius: 1rem;
padding: 3rem;
box-shadow: 0 0.1rem 0.3rem rgba(0,0,0,0.2);
transition: all 0.2s ease-in-out;
@media screen and (max-width: 80rem){
  flex-direction: column;
  gap: 2rem;
}
`