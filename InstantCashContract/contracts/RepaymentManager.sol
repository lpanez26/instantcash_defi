// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./AaveRepay.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RepaymentManager is Ownable {
    using SafeERC20 for IERC20;

    AaveRepay private aaveRepay;
    address private constant AAVE_USDC = 0x036CbD53842c5426634e7929541eC2318f3dCF7e; // Replace with actual USDC token address on Base Sepolia

    struct RepaymentPlan {
        uint256 totalAmount;
        uint256 monthlyPayment;
        uint256 paymentsMade;
        uint256 lastPaymentTime;
    }

    mapping(address => RepaymentPlan) public repaymentPlans;

    event RepaymentMade(address indexed user, uint256 amount);

    constructor(address _aaveRepay) Ownable(msg.sender) {
        aaveRepay = AaveRepay(_aaveRepay);
    }

    function createRepaymentPlan(address user, uint256 borrowAmount) external onlyOwner {
        uint256 totalAmount = borrowAmount + (borrowAmount / 100);
        uint256 monthlyPayment = totalAmount / 4;

        repaymentPlans[user] = RepaymentPlan({
            totalAmount: totalAmount,
            monthlyPayment: monthlyPayment,
            paymentsMade: 0,
            lastPaymentTime: block.timestamp
        });
    }

    function makeRepayment(uint256 amount) external {
        RepaymentPlan storage plan = repaymentPlans[msg.sender];
        require(plan.paymentsMade < 4, "All repayments already made");
        require(amount == plan.monthlyPayment, "Incorrect repayment amount");

        plan.paymentsMade += 1;
        plan.lastPaymentTime = block.timestamp;

        IERC20(AAVE_USDC).safeTransferFrom(msg.sender, address(this), amount);

        uint256 repaymentToAave = (amount * 60) / 100;
        aaveRepay.repayUSDC(repaymentToAave);

        emit RepaymentMade(msg.sender, amount);
    }

    function getPendingRepayments(address user) external view returns (uint256) {
        RepaymentPlan memory plan = repaymentPlans[user];
        return 4 - plan.paymentsMade;
    }
}
