import { NFTStorage } from 'nft.storage';
import { NFT_STORAGE_KEY } from './constants';

export const storeMetadata = async(title, description, file) => {

  const apiKey = NFT_STORAGE_KEY
  const client = new NFTStorage({ token: apiKey })

  const metadata = await client.store({
    name: title,
    description: description,
    image: file
  })
  
  // the returned metadata.url has the IPFS URI we want to add.
  // our smart contract already prefixes URIs with "ipfs://", 
  // so we remove it before calling the `mintToken` function
  const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");
  return metadataURI;
}
