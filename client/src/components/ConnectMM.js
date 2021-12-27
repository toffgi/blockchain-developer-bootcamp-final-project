import React from 'react';
import styled from 'styled-components';
import MMLogo from '../style/metamask-logo.svg';
import Text from './Text';
import { StyledBox, StyledBtn } from './StyledHelpers';
import { shortenAddress } from '../utils/shortenAddress';

const MetamaskLogo = styled.img.attrs({
  src: MMLogo,
})`
  height: 40px;
`;

class ConnectMM extends React.Component {
  constructor(props) {
    super(props);

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick(e) {
    this.props.onLoginClick(e.target.value);
  }

  handleLogoutClick(e) {
    this.props.onLogoutClick(e.target.value);
  }

  render() {
    const minterAddress = this.props.minterAddress;

    if (!window.ethereum) {
      return (
        <div className="App-header">
          <StyledBox>
          <MetamaskLogo />
            <Text uppercase color="papayawhip" t3>  
            Looks like you don't have Metamask installed, you'll need it to use this app.
            </Text>
          </StyledBox>
        </div>
      
      )} else if (minterAddress) {
      return(
        <div className="App-header">
          <StyledBox>
          <MetamaskLogo />
            <Text uppercase color="papayawhip" t3>
              {shortenAddress(minterAddress)}
            </Text>
            <div>
            <StyledBtn onClick={this.handleLogoutClick}>
            <Text uppercase color="282c34" t3>
              Log Out
            </Text>
            </StyledBtn>
            </div>
          </StyledBox>
        </div> 
      )}

    return (
      <div className="App-header">
        <StyledBox>
        <MetamaskLogo />
          <StyledBtn onClick={this.handleLoginClick}>
          <Text uppercase color="282c34" t3>
            Connect
          </Text>
          </StyledBtn>
        </StyledBox>
      </div> 
    )
  }
}

export default ConnectMM;