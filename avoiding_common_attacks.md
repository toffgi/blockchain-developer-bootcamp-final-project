# Avoiding Common Attacks

## Using Specific Compiler Pragma (SWC-103)
Specific compiler: `0.8.2`

## Proper use of `.call` and `.delegateCall` (SWC-104)
The `withdrawDonations()` function, based on OpenZeppelin's `withdraw()`, uses `.call` for withdrawals.

## Unprotected Ether Withdrawal (SWC 105)
Only the contract owner can trigger the `withdrawalDonations()` function.

## Use Modifiers Only for Validation 
Modifiers `_minimumDonation()` and `_onlyOwner()` are used only for validation (of `msg.value` and `msg.sender`)

## Checks-Effects-Interactions (Avoiding state changes after external calls) (SWC-107)
OpenZeppelin's minting function updates `tokenId` state before creating the token via the `_safeMint()` function.

## State Variable Default Visibility (SWC 108)
All the contract's variables and functions visibility is specified.

## Authorization through `tx.origin` (SWC-115)
OpenZeppelin's Ownable.sol uses `msg.sender` (not `tx.origin`) to identify the owner.
