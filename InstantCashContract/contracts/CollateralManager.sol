// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./AaveDeposit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CollateralManager is Ownable {
    AaveDeposit private aaveDeposit;

    mapping(address => uint256) public collaterals;
    mapping(address => uint256) public creditLines;
    mapping(address => bool) public userExists;
    address[] public users;

    event CollateralDeposited(address indexed user, uint256 amount);
    event CollateralWithdrawn(address indexed user, uint256 amount);

    constructor(address _aaveDeposit) Ownable(msg.sender) {
        aaveDeposit = AaveDeposit(_aaveDeposit);
    }

    function depositCollateral() external payable {
        require(msg.value > 0, "Must deposit some ETH as collateral");

        if (!userExists[msg.sender]) {
            users.push(msg.sender);
            userExists[msg.sender] = true;
        }

        collaterals[msg.sender] += msg.value;
        creditLines[msg.sender] = collaterals[msg.sender] / 2;

        aaveDeposit.depositETH{value: msg.value}(msg.value);

        emit CollateralDeposited(msg.sender, msg.value);
    }

    function withdrawCollateral(address user) external onlyOwner {
        uint256 collateral = collaterals[user];
        require(collateral > 0, "No collateral to withdraw");

        collaterals[user] = 0;
        creditLines[user] = 0;

        aaveDeposit.withdrawETH(collateral);

        emit CollateralWithdrawn(user, collateral);
    }

    function getUserCollateral(address user) external view returns (uint256) {
        return collaterals[user];
    }

    function getUserCreditLine(address user) external view returns (uint256) {
        return creditLines[user];
    }
}
