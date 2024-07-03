// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "https://github.com/aave/aave-v3-core/blob/master/contracts/interfaces/IPool.sol";
import "https://github.com/aave/aave-v3-core/blob/master/contracts/interfaces/IPoolAddressesProvider.sol";

contract AaveBorrow {
    address private constant AAVE_ADDRESSES_PROVIDER = 0xd449FeD49d9C443688d6816fE6872F21402e41de; // Replace with actual Aave v3 addresses provider on Base Sepolia
    address private constant AAVE_USDC = 0x036CbD53842c5426634e7929541eC2318f3dCF7e; // Replace with actual USDC token address on Base Sepolia

    IPoolAddressesProvider private provider = IPoolAddressesProvider(AAVE_ADDRESSES_PROVIDER);
    IPool private pool = IPool(provider.getPool());

    function borrowUSDC(uint256 amount) external {
        pool.borrow(AAVE_USDC, amount, 2, 0, msg.sender);
    }
}
