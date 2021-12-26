// test/SimpleNFT.test.js

// Load artifacts
const SimpleNFT = artifacts.require("./SimpleNFT.sol");

// Create error object
const getErrorObj = (obj = {}) => {
  const txHash = Object.keys(obj)[0];
  return obj[txHash];
};

const ERR_EXACT_AMOUNT = "Donation should be at least 2 gwei.";
const ERR_NOT_OWNER = "Ownable: caller is not the owner";

// Start test block
contract("SimpleNFT", function (accounts) {
  const [owner, minter] = accounts;

  beforeEach(async () => {
    // Deploy a new contract for each test
    instance = await SimpleNFT.new({ from: owner });
  });

  /**
   * Checks that the contract has the correct name and symbol
   */
  it('should have a name', async () => {
    assert.strictEqual(await instance.name(), 'SimpleNFT');
  });

  it('should have a symbol', async () => {
    assert.strictEqual(await instance.symbol(), 'SNFT');
  });

  /**
   * Checks that the contract inherits OpenZeppelin Ownable by using owner()
   */
  it("should add first account as owner using OpenZeppelin Ownable", async () => {
    assert.strictEqual(await instance.owner(), owner);
  });  

  /**
  * Attempt to withdraw from someone who is not the owner (verify ownable usage in function).
  */
  it("should fail if the withdrawer is not the owner", async () => {
    try {
      await instance.withdrawDonations( { from: minter });
      } catch (e) {
      const { error, reason } = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, ERR_NOT_OWNER);
    }
  });

  /**
  *  Donate function should require ether
  */
  it("should require ether to make a donation", async () => {
    try {
      await instance.Donate(minter, { from: minter })
    } catch (e) {
      const { error, reason } = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, ERR_EXACT_AMOUNT);
    }
  });

  /**
  *  Donate function requires at least 2 gwei
  */
  it("should require at least 2 gwei to make a donation", async () => {
    try {
      await instance.Donate(minter, { 
        from: minter, 
        value: web3.utils.toWei("1", "gwei")
      });
    } catch (e) {
      const { error, reason } = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, ERR_EXACT_AMOUNT);
    }
  });

  /**
  * Donate function should add patron to patronRole
  */
  it("should add patron to patronRole", async () => {
    await instance.Donate(minter, {
      from: minter,
      value: web3.utils.toWei("2", "gwei")
    });
    const patronRole = await instance.getPatronRole(minter);
    assert.strictEqual(patronRole, true);
  });

  /**
  * Minter should not have patronRole = true by default
  */
  it("should not have patronRole = true by default", async () => {
    assert.strictEqual(await instance.getPatronRole(minter), false);
  });
});
