import styled from 'styled-components';

export const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px 15px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const BoxSearch = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px 15px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Search = styled.div`
  text-align: center;
`;

export const Label = styled.label`

`;

export const Input = styled.input`
  width: 50%;
  padding: 9px;
  margin: 8px 0;
  border-radius: 10px;
  border: 0.1px solid #1a1c06;
`;

export const Button = styled.button`
  background-color: #e5d7b7;
  transition-duration: 0.4s;
  border: none;
  color: black;
  padding: 10px 16px;
  margin-left: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  border: 0.1px solid #271207;
  border-radius: 10px;

  &:hover {
    background-color: #b8b98d;
  }
  &:active {
    background-color: #797974;
  }
`;