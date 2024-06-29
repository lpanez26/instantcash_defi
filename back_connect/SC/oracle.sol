// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {
    AggregatorV3Interface internal dataFeed;

    /**
     * Network: Sepolia
     * Aggregator: ETH/USD
     * Address sepolia: 0x694AA1769357215DE4FAC081bf1f309aDC325306
     * Address base-sepolia: 0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1
     */
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1
        );
    }

    function setData(address _data) public{
        dataFeed = AggregatorV3Interface(
            _data
        );
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}
