// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "https://github.com/aave/aave-v3-core/blob/master/contracts/interfaces/IPool.sol";
import "https://github.com/aave/aave-v3-core/blob/master/contracts/interfaces/IPoolAddressesProvider.sol";

contract AaveRepay {
    using SafeERC20 for IERC20;

    address private constant AAVE_ADDRESSES_PROVIDER = 0xd449FeD49d9C443688d6816fE6872F21402e41de; // Replace with actual Aave v3 addresses provider on Base Sepolia
    address private constant AAVE_USDC = 0x036CbD53842c5426634e7929541eC2318f3dCF7e; // Replace with actual USDC token address on Base Sepolia

    IPoolAddressesProvider private provider = IPoolAddressesProvider(AAVE_ADDRESSES_PROVIDER);
    IPool private pool = IPool(provider.getPool());

    function repayUSDC(uint256 amount) external {
        //IERC20(AAVE_USDC).safeApprove(address(pool), amount);
        pool.repay(AAVE_USDC, amount, 2, msg.sender);
    }
}
