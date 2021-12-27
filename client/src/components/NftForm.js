import React from 'react';
import Text from "./Text";
import { 
  StyledLbl, 
  StyledBtn,
  StyledForm, 
  StyledInputTxt,
  StyledInputFile, 
  StyledBlock} 
from "./StyledHelpers";
import { LoadingOutlined }from '@ant-design/icons';

class NftForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileInput = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit(e);
  }

  handleInputChange(e) {
    this.props.onInputChange(e)
  }

  render() {
    const minting = this.props.minting;
    const fileInput = this.fileInput;
    const nftTitle = this.props.nftTitle;
    const nftDescription = this.props.nftDescription;

    return(
    <StyledForm onSubmit={this.handleSubmit}>
    <StyledLbl><Text color="papayawhip" t3> 
      Insert a title for your NFT:
      <StyledInputTxt name="nftTitle" type="text" value={nftTitle} onChange={this.handleInputChange} />
    </Text></StyledLbl>
    <StyledLbl><Text color="papayawhip" t3> 
      Insert a description for your NFT:
      <StyledInputTxt name="nftDescription" type="text" value={nftDescription} onChange={this.handleInputChange} />
    </Text></StyledLbl>
    <StyledLbl><Text color="papayawhip" t3>
      Upload file:
      {<StyledInputFile name="nftAsset" type="file" accept="image/*" ref={fileInput} onChange={this.handleInputChange} />}
    </Text></StyledLbl>
    <br />
    {minting ? 
        <StyledBlock>
          <p><LoadingOutlined style={{color: "papayawhip"}}/></p>
          <Text uppercase color="papayawhip" t5>
            Minting to blockchain...
          </Text>
        </StyledBlock> 
          : 
        <StyledBtn type="submit">
          <Text uppercase color="282c34" t3>
            Mint!
          </Text>
        </StyledBtn>}
    </StyledForm>
    )
  }
}

export default NftForm;