// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./CollateralManager.sol";
import "./RepaymentManager.sol";
import "./AaveDeposit.sol";
import "./AaveBorrow.sol";
import "./AaveRepay.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InstaCash is Ownable {
    using SafeERC20 for IERC20;

    CollateralManager private collateralManager;
    RepaymentManager private repaymentManager;
    AaveDeposit private aaveDeposit;
    AaveBorrow private aaveBorrow;
    AaveRepay private aaveRepay;

    address private constant AAVE_USDC = 0x036CbD53842c5426634e7929541eC2318f3dCF7e; // Replace with actual USDC token address on Base Sepolia

    event CreditRequested(address indexed user, uint256 amount);
    event RepaymentMade(address indexed user, uint256 amount);

    constructor(
        address _collateralManager,
        address _repaymentManager,
        address _aaveDeposit,
        address _aaveBorrow,
        address _aaveRepay
    ) Ownable(msg.sender) {
        collateralManager = CollateralManager(_collateralManager);
        repaymentManager = RepaymentManager(_repaymentManager);
        aaveDeposit = AaveDeposit(_aaveDeposit);
        aaveBorrow = AaveBorrow(_aaveBorrow);
        aaveRepay = AaveRepay(_aaveRepay);
    }

    function depositCollateral() external payable {
        collateralManager.depositCollateral{value: msg.value}();
    }

    function requestCredit(address to) external {
        uint256 creditLine = collateralManager.getUserCreditLine(msg.sender);
        require(creditLine > 0, "No available credit line");

        aaveBorrow.borrowUSDC(creditLine);
        repaymentManager.createRepaymentPlan(msg.sender, creditLine);

        IERC20(AAVE_USDC).safeTransfer(to, creditLine);

        emit CreditRequested(msg.sender, creditLine);
    }

    function makeRepayment(uint256 amount) external {
        repaymentManager.makeRepayment(amount);
        aaveRepay.repayUSDC(amount);

        emit RepaymentMade(msg.sender, amount);
    }

    function withdrawCollateral() external {
        require(repaymentManager.getPendingRepayments(msg.sender) == 0, "All repayments not made");
        collateralManager.withdrawCollateral(msg.sender);
    }
     /**
     * @dev Allows the owner to withdraw all ETH from the contract.
     * This also resets all credit lines and collaterals.
     */
    function ownerWithdrawAll() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No ETH to withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }
}