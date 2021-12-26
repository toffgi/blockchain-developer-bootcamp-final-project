import styled from 'styled-components';

const StyledBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
  border: 1px solid papayawhip;
  padding: 40px;
  border-radius: 10px;
  width: fit-content;
  height: fit-content;
`;

const StyledBtn = styled.button`
  background: transparent;
  color: papayawhip;
  border-radius: 5px;
  margin-left: 10px;
  &:hover {
    background-color: papayawhip; 
    color: #282c34;
    cursor: pointer;
  };
`;

const StyledForm = styled.form`
  display: block;
  justify-content: center;
  align-items: center;
  margin: 1% auto;
  padding: 20px;
  width: fit-content;
  height: fit-content;
`;

const StyledLbl = styled.label`
	margin: 0.5px;
	display: block;
`;

const StyledInputTxt = styled.input.attrs({ 
  type: 'text',
})`
  font-size: 18px;
  font-weight: bold;
	padding: 0.5em;
	color: darkslategray;
	background: papayawhip;
	border: none;
	border-radius: 3px;
	width: 100%;
	margin-bottom: 0.5em;
`;

const StyledInputFile = styled.input.attrs({ 
  type: 'file',
})`
  font-size: 18px;
	padding: 0.5em;
	color: darkslategray;
	background: papayawhip;
	border: none;
	border-radius: 3px;
	width: 100%;
	margin-bottom: 0.5em;
`;

const getColor = (p) => {
  // @ts-ignore
  if (p.color) return p.color;
  // return 'black';
};

const StyledBlock = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: ${getColor};
  padding: 20px;
  width: fit-content;
  height: fit-content;
`;

export {
  StyledBox,
  StyledBtn,
  StyledForm,
  StyledLbl,
  StyledInputTxt,
  StyledInputFile,
  StyledBlock
}