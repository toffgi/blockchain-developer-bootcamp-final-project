# Final Project Design Patterns

## Inheritance and Interfaces: 
Inheriting OpenZeppelin ERC721, ERC721URIStorage and Ownable.

## Inter-Contract Execution (Calling functions in external contracts):
Using OpenZeppelin Counters for Counters.Counter.

## Access Control Design Patterns (Restricting access to certain functions using things like Ownable, Role-based Control):
Using Ownable.sol `onlyOwner()` to restrict the access to the `withdrawDonations()` function.
