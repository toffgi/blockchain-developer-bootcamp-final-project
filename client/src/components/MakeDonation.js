import React from 'react';
import Text from "./Text";
import { 
  StyledLbl, 
  StyledBtn, 
  StyledInputTxt, 
  StyledBlock} 
from "./StyledHelpers";
import { LoadingOutlined }from '@ant-design/icons';

class MakeDonation extends React.Component {
  constructor(props) {
    super(props);

    this.handleDonateClick = this.handleDonateClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleDonateClick(e) {
    this.props.onDonateClick(e.target.value);
  }

  handleInputChange(e) {
  this.props.onInputChange(e);
  }

  render() {
    const donating = this.props.donating;
    const donateAmount = this.props.donateAmount;

    return(
    <StyledBlock>
          <StyledLbl><Text color="papayawhip" t5>
            Make a <Text color="yellow"> 2 gwei </Text> 
            donation to the project by clicking on the button below. 
            <p> (if you would like to donate more <span role="img" aria-label="beers">🍻</span>  
              modify the amount before clicking) </p>
          </Text></StyledLbl>
          <StyledInputTxt name="donateAmount" type="text" value={donateAmount} min="2" onChange={this.handleInputChange}/>
          {donating ? 
            <StyledBlock>
              <LoadingOutlined style={{color: "papayawhip"}}/>
              <Text uppercase color="papayawhip" t4>
                Donation in progress...
              </Text></StyledBlock> 
              : 
              <StyledBtn onClick={this.handleDonateClick}>
                <Text uppercase color="282c34" t3> 
                  Make Donation :) 
                </Text>
              </StyledBtn>}
    </StyledBlock>
    )
  }
}

export default MakeDonation;