// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract TokenTribe {
    using SafeMath for uint256;

    // Varibales
    // ---------

    address public userAddress;
    AggregatorV3Interface public priceFeedMatic;
    uint256 minimumTokenPurchase;
    uint256 usdToInr;
    address public owner;

    // Schemas
    // -------

    struct User {
        uint256 id;
        string name;
        uint256 tokens;
        bool admin;
        uint256 subscribedBounties;
    }

    struct Bounty {
        string name;
        uint256 prize;
        string description;
        bool status;
        address closedBy;
    }

    // Constructor
    // -----------

    constructor(uint256 _minimumTokenPurchase, uint256 _usdToInr) {
        owner = msg.sender;
        userAddress = msg.sender;
        minimumTokenPurchase = _minimumTokenPurchase;
        usdToInr = _usdToInr;
        priceFeedMatic = AggregatorV3Interface(
            0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
        );
    }

    // Mappings
    // --------

    mapping(address => uint256) public TokensOwned;
    mapping(address => User) public Users;
    mapping(address => bool) public Admins;
    mapping(address => bool) public Subscribed;
    mapping(address => uint256) public SubscribedBounties;
    mapping(address => mapping(uint256 => Bounty)) public Bounties;
    mapping(address => uint256) public BountiesCreated;
    mapping(address => uint256) public Lockedtokens;
    mapping(address => uint256) public BountiesCompleted;

    // Modifiers
    // ---------

    modifier onlyAdmin() {
        require(
            Admins[userAddress],
            "You need to be admin to access this function"
        );
        _;
    }
    modifier onlySubscribed() {
        require(
            Subscribed[userAddress],
            "You need to subscribe first to get this functionality"
        );
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed to withdraw");
        _;
    }

    // Events
    // ------

    // Functions
    // ---------

    // To set the user as admin
    function setUserAsAdmin() public {
        Admins[msg.sender] = true;
        Users[msg.sender].admin = true;
    }

    // To get the latest realtime matic price
    function getMaticPrice() public view returns (uint256) {
        (, int256 answer, , , ) = priceFeedMatic.latestRoundData();
        return uint256(answer * 10000000000);
    }

    // Getting the conversion rate of matic in USD
    function getConversionRate(uint256 _amount) public view returns (uint256) {
        uint256 Price = getMaticPrice();
        uint256 AmountInUsd = (Price * _amount) / 1000000000000000000;
        return AmountInUsd;
    }

    // Getting the conversion rate of matic in INR
    function getInrPrice(uint256 _amount) public view returns (uint256) {
        uint256 PriceUSD = getConversionRate(_amount);
        uint256 PriceINR = PriceUSD * usdToInr;
        return PriceINR;
    }

    // Function to buy tokens
    function buyTokens(uint256 _amount) public payable onlyAdmin {
        require(
            _amount >= minimumTokenPurchase,
            "You need to buy atleast 10 tokens"
        );
        uint256 amountToPurchase = _amount.mul(12).div(10);
        uint256 comparision = getMaticPrice() * usdToInr;
        uint256 finalReq = amountToPurchase / comparision;
        require(msg.value >= finalReq, "Insufficient funds");
        TokensOwned[msg.sender] += _amount;
        Users[msg.sender].tokens += _amount;
    }

    // Function to subscribe
    function SubscribeToBounties() public payable onlyAdmin {
        uint256 amountToPurchase = (1000 * 12) / 10;
        uint256 comparision = getMaticPrice() * usdToInr;
        uint256 finalReq = amountToPurchase / comparision;
        require(
            msg.value >= finalReq,
            "To subscribe you need to spend Rs. 1000 worth of matic tokens"
        );
        Subscribed[msg.sender] = true;
        Users[msg.sender].subscribedBounties += 12;
        TokensOwned[msg.sender] += 1000;
        Users[msg.sender].tokens += 1000;
        SubscribedBounties[msg.sender] += 12;
    }

    // Function to Add Bounty
    function AddBounty(
        string memory _name,
        uint256 _prize,
        string memory _description
    ) public onlyAdmin {
        require(
            TokensOwned[msg.sender] >= _prize + 50,
            "Decrease the prize you don't have enough funds"
        );
        if (SubscribedBounties[msg.sender] >= 1) {
            Bounties[msg.sender][BountiesCreated[msg.sender]].name = _name;
            Bounties[msg.sender][BountiesCreated[msg.sender]].prize = _prize;
            Bounties[msg.sender][BountiesCreated[msg.sender]]
                .description = _description;
            Bounties[msg.sender][BountiesCreated[msg.sender]].status = false;
            SubscribedBounties[msg.sender]--;
            Users[msg.sender].subscribedBounties--;
            Lockedtokens[msg.sender] += _prize;
            TokensOwned[msg.sender] -= _prize;
        } else {
            require(
                TokensOwned[msg.sender] >= 50,
                "You don't have sufficient funds to add a bounty"
            );
            Bounties[msg.sender][BountiesCreated[msg.sender]].name = _name;
            Bounties[msg.sender][BountiesCreated[msg.sender]].prize = _prize;
            Bounties[msg.sender][BountiesCreated[msg.sender]]
                .description = _description;
            Bounties[msg.sender][BountiesCreated[msg.sender]].status = false;
            TokensOwned[msg.sender] -= _prize + 50;
            Users[msg.sender].tokens -= 50;
            Lockedtokens[msg.sender] += _prize;
        }
    }

    // Function to close the bounty
    function CloseBounty(address _winner, uint256 _bountyNumber)
        public
        onlyAdmin
    {
        Bounties[msg.sender][_bountyNumber].status = true;
        Bounties[msg.sender][_bountyNumber].closedBy = _winner;
        uint256 reward = Bounties[msg.sender][_bountyNumber].prize;
        Lockedtokens[msg.sender] -= reward;
        TokensOwned[_winner] += reward;
        Users[_winner].tokens += reward;
        BountiesCompleted[_winner] += 1;
    }

    // Function to withdraw the funds
    function withdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}

// Author : w3Ts0ck3T_eth
// ----------------------
