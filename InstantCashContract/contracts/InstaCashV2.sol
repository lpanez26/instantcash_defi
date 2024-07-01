// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

/**
 * @title InstaCash
 * @dev This contract allows users to deposit ETH as collateral and get a credit line equivalent to half the value of the deposited ETH.
 */
contract InstaCash {
    // Mapping to store the collateral amount deposited by each user
    mapping(address => uint256) public collaterals;
    // Mapping to store the credit line available for each user
    mapping(address => uint256) public creditLines;
    // Array to store all users
    address[] public users;
    // Mapping to check if the user exists
    mapping(address => bool) public userExists;

    // Address of the contract owner
    address public owner;

    /**
     * @dev Event emitted when a user deposits ETH as collateral.
     * @param user The address of the user.
     * @param amount The amount of ETH deposited.
     */
    event CollateralDeposited(address indexed user, uint256 amount);

    /**
     * @dev Event emitted when a user sends ETH from their credit line.
     * @param user The address of the user.
     * @param to The address to which the ETH is sent.
     * @param amount The amount of ETH sent.
     */
    event CreditLineUsed(address indexed user, address indexed to, uint256 amount);

    /**
     * @dev Event emitted when a user withdraws their collateral.
     * @param user The address of the user.
     * @param amount The amount of ETH withdrawn.
     */
    event CollateralWithdrawn(address indexed user, uint256 amount);

    /**
     * @dev Event emitted when the owner is changed.
     * @param previousOwner The address of the previous owner.
     * @param newOwner The address of the new owner.
     */
    event OwnerChanged(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Modifier to check if the caller is the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    /**
     * @dev Constructor to set the initial owner of the contract to the address that deploys the contract.
     */
    constructor() {
        owner = msg.sender;
        emit OwnerChanged(address(0), msg.sender);
    }

    /**
     * @dev Allows the current owner to transfer ownership to a new owner.
     * @param newOwner The address of the new owner.
     */
    function changeOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnerChanged(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Allows a user to deposit ETH as collateral.
     * The credit line enabled is half the value of the deposited ETH.
     */
    function depositCollateral() external payable {
        require(msg.value > 0, "Must deposit some ETH as collateral");

        if (!userExists[msg.sender]) {
            users.push(msg.sender);
            userExists[msg.sender] = true;
        }

        collaterals[msg.sender] += msg.value;
        creditLines[msg.sender] = collaterals[msg.sender] / 2;

        emit CollateralDeposited(msg.sender, msg.value);
    }

    /**
     * @dev Allows a user to withdraw their collateral if they haven't used the credit line.
     */
    function withdrawCollateral() external {
        uint256 collateral = collaterals[msg.sender];
        require(collateral > 0, "No collateral to withdraw");
        require(creditLines[msg.sender] == collateral / 2, "Credit line already used");

        collaterals[msg.sender] = 0;
        creditLines[msg.sender] = 0;
        payable(msg.sender).transfer(collateral);

        emit CollateralWithdrawn(msg.sender, collateral);
    }

    /**
     * @dev Returns the available credit line for the user.
     * @param user The address of the user.
     * @return The credit line available for the user.
     */
    function getCreditLine(address user) external view returns (uint256) {
        return creditLines[user];
    }

    /**
     * @dev Allows a user to send the full amount of their available credit line to a specified address.
     * @param to The address to which the ETH is sent.
     */
    function sendFullCreditLine(address payable to) external {
        uint256 amount = creditLines[msg.sender];
        require(amount > 0, "No available credit line");

        creditLines[msg.sender] = 0;
        to.transfer(amount);

        emit CreditLineUsed(msg.sender, to, amount);
    }

    /**
     * @dev Allows the owner to withdraw all ETH from the contract.
     * This also resets all credit lines and collaterals.
     */
    function ownerWithdrawAll() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No ETH to withdraw");

        // Reset all collaterals and credit lines
        for (uint i = 0; i < users.length; i++) {
            address user = users[i];
            collaterals[user] = 0;
            creditLines[user] = 0;
        }

        payable(owner).transfer(contractBalance);
    }

    /**
     * @dev Fallback function to prevent sending ETH directly to the contract.
     */
    receive() external payable {
        revert("Use depositCollateral function to deposit ETH");
    }
}
