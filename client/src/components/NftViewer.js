import React from 'react';
import Text from "./Text";
import { StyledBlock } from "./StyledHelpers";
import { LoadingOutlined }from '@ant-design/icons';

class NftViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }

  render() {
    const nftView = this.props.nftView;
    const nftTitle = this.props.nftTitle;
    const nftDescription = this.props.nftDescription;

    return(
      <StyledBlock>
          <Text color="papayawhip" t1>
            <p>Here's your freshly minted NFT!</p>
          </Text>
            <StyledBlock color="papayawhip">
              {this.state.loaded ? null :
                <p><LoadingOutlined style={{color: "#282c34"}}/>
                <Text color="#282c34" t3 italic> Please wait while your NFT is loading ... </Text></p>
              }
              <img
                style={this.state.loaded ? {maxWidth: "500px"} : {display: 'none'}}
                src={nftView}
                alt="Freshly Minted NFT"
                onLoad={() => this.setState({loaded: true})}
              />
              <Text color="#282c34" t3>
                <p>Title: <Text color="#282c34" t3 italic>{nftTitle}</Text></p>
                <p>Description: <Text color="#282c34" t3 italic>{nftDescription}</Text></p>
              </Text>
            </StyledBlock>
      </StyledBlock>
  )}
}

export default NftViewer;