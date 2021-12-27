import React from 'react';
import styled from 'styled-components';
import OSLogo from '../style/opensea-logo.svg';
import Text from './Text';
import { StyledA, StyledBlock, StyledBox } from './StyledHelpers';

const OpenSeaLogo = styled.img.attrs({
  src: OSLogo,
})`
  height: 40px;
`;

class OpenSeaLink extends React.Component {
  render() {
    return (
      <div className="App-header">
        <StyledBlock>
          <StyledBox>
            <StyledA href="https://testnets.opensea.io/collection/simplenft-blockchaindevbootcprj">
              <OpenSeaLogo />
              <Text uppercase color="282c34" t4>
                Check the collection @OpenSea
              </Text>
            </StyledA>
          </StyledBox>
        </StyledBlock>
      </div> 
    )
  }
}

export default OpenSeaLink;