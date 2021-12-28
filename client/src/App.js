import React, { Component } from "react";
import { ethers } from "ethers";
import SimpleNftContract from './contracts/SimpleNFT.json';
import { storeMetadata } from './utils/storeMetadata';
import ConnectMM from "./components/ConnectMM";
import Text from "./components/Text";
import { StyledBlock, StyledBtn } from "./components/StyledHelpers";
import MakeDonation from "./components/MakeDonation";
import NftViewer from "./components/NftViewer";
import NftForm from "./components/NftForm";
import OpenSeaLink from "./components/OpenSeaLink";
import "./style/App.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      minterAddress: null,
      contract: null, 
      nftTitle: '', 
      nftDescription: '',
      nftAsset: '',
      nftView: null,
      tokenId: null,
      minting: false,
      donating: false,
      donateAmount: "2"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  
  // Login/Logout functions
  loginMM = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const networkId = await provider.getNetwork();
      const chainId = networkId.chainId;
      if (chainId !== 1337 && chainId !== 4) {
        return (
          alert(
            `Please connect to rinkeby testnet to use this App`
          )
        );
      }
      const signer = provider.getSigner()
      const minterAddress = await signer.getAddress();

      const SimpleNftContractInstance = new ethers.Contract(
        SimpleNftContract.networks[networkId.chainId].address, 
        SimpleNftContract.abi, 
        signer
      );

      this.setState({
        provider: provider, 
        signer: signer, 
        minterAddress: minterAddress, 
        contract: SimpleNftContractInstance,
      });
    } catch(error) {
        alert(
        `Failed to load web3. Check console for details.`,
      );
      console.error(error);
    }
  };

  logoutMM = () => {
    window.location.reload();
  };

  formReset = () => {
    this.setState({tokenId: null, nftTitle: '', nftDescription: ''})
  };

  // Form-activated functions
  handleInputChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    // console.log(value);
    this.setState({
      [name]: value,
    })
  };

  handleSubmit = async(e) => { 
    if(!this.state.nftTitle || !this.state.nftDescription ||  !this.state.nftAsset){
      alert(
        'Please provide a title, a description and an image to proceed.'
      );
    } else {
      e.preventDefault();
      let data = new FormData(e.target)
      let nftAsset = data.get('nftAsset')
      let nftTitle = data.get('nftTitle')
      let nftDescription = data.get('nftDescription')
      // alert(
      //   `Selected file - ${this.fileInput.current.files[0].name}`
      // );      
      const metadataURI = await storeMetadata(nftTitle, nftDescription, nftAsset);
      this.mint(metadataURI);
    }
  };

  // mint token function (calls contract)
  mint = async(url) => {
    this.setState({minting: true});
    //call the safeMint function on the contract
    const tx = await this.state.contract.safeMint(this.state.minterAddress, url);
    console.log('Minting to blockchain...');

    // Wait for the transaction to be confirmed, then get the token ID out of the emitted Transfer event.
    const receipt = await tx.wait();
    // console.log(receipt);
    let tokenId = null;
    for (const event of receipt.events) {
      if (event.event !== 'Transfer') {
          continue
      }
      tokenId = event.args.tokenId.toString();
      break;
    }
    console.log(`Minted token #${tokenId}`);
    const MintedMetadataURI = await this.state.contract.tokenURI(tokenId);
    console.log('Minted token metadata uri: ', MintedMetadataURI);
    let MintedMetadata = await this.fetchIPFSJSON(MintedMetadataURI);
    console.log('Minted token metadata: ', MintedMetadata)
    let MintedMetadataImage = await this.makeGatewayURL(MintedMetadata.image);
    
    this.setState({tokenId: tokenId, nftView: MintedMetadataImage});
    console.log(this.state.tokenId);
    this.setState({minting: false});
    return (tokenId, MintedMetadataImage);
  };

  // rewrite ipfs:// uris to dweb.link gateway URLs
  makeGatewayURL = (ipfsURI) => {
    return ipfsURI.replace(/^ipfs:\/\//, "https://dweb.link/ipfs/");
  };
  fetchIPFSJSON = async(ipfsURI) => {
    const url = this.makeGatewayURL(ipfsURI);
    const resp = await fetch(url);
    return resp.json();
  };

  // makeDonation to contract function (calls contract)
  makeDonation = async() => {
    let overrides = {
      from: this.state.minterAddress,
      value: (ethers.utils.parseUnits(this.state.donateAmount, "gwei"))
    };
    this.setState({donating: true}); 
    
    const donation = await this.state.contract.Donate(this.state.minterAddress, overrides);
    await donation.wait();
    this.setState({donating: false}); 
    alert(
      'Thank you!'
    );
  };

render() {  
  if (window.ethereum) {    
    window.ethereum.on('chainChanged', () => window.location.reload());
  };
  const minterAddress = this.state.minterAddress;
  const minting = this.state.minting;
  const donating = this.state.donating;
  const donateAmount = this.state.donateAmount;
  const nftView = this.state.nftView;
  const nftTitle = this.state.nftTitle;
  const nftDescription = this.state.nftDescription;
  
  if (!minterAddress) {
    return(
      <div className="App">
        <ConnectMM 
          onLoginClick={this.loginMM} 
          onLogoutClick={this.logoutMM} 
          minterAddress={minterAddress}
        />
        <Text color="papayawhip" t2>  
          <p>Welcome!</p> 
           Please connect to a 
          <Text color="yellow"> rinkeby </Text> 
          wallet with MetaMask to use this NFT Minter 
        </Text>
      </div>
    );

  } else if (!this.state.tokenId) {
    return (
      <div className="App">
        <ConnectMM 
          onLoginClick={this.loginMM} 
          onLogoutClick={this.logoutMM} 
          minterAddress={minterAddress}
        />
        <Text color="papayawhip" t1>  
          Simple NFT minter
        </Text>
        <p><Text color="papayawhip" t2> 
          Mint your NFTs by uploading images!
        </Text></p>
        <NftForm 
          onFormSubmit = {this.handleSubmit}
          onInputChange = {this.handleInputChange}
          minting = {minting} 
          nftTitle = {nftTitle}
          nftDescription ={nftDescription} 
        />
        <OpenSeaLink/>
        <MakeDonation 
          onDonateClick={this.makeDonation} 
          onInputChange={this.handleInputChange} 
          donateAmount={donateAmount} 
          donating={donating}
        />
      </div>
      );

    } return (
      <div className="App">
        <ConnectMM 
          onLoginClick={this.loginMM} 
          onLogoutClick={this.logoutMM} 
          minterAddress={minterAddress}
        />
        <NftViewer 
          nftView={nftView} 
          nftTitle={nftTitle} 
          nftDescription={nftDescription}
        />
        <StyledBlock>
          <StyledBtn onClick={this.formReset}>
            <Text uppercase color="282c34" t3>
              Mint another NFT
            </Text>
          </StyledBtn>
        </StyledBlock>
        <OpenSeaLink/>
        <MakeDonation 
          onDonateClick={this.makeDonation} 
          onInputChange={this.handleInputChange} 
          donateAmount={donateAmount} 
          donating={donating}
        />    
      </div>
    )
  }
}

export default App;
