// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "https://github.com/aave/aave-v3-core/blob/master/contracts/interfaces/IPool.sol";
import "https://github.com/aave/aave-v3-core/blob/master/contracts/interfaces/IPoolAddressesProvider.sol";

contract AaveDeposit {
    using SafeERC20 for IERC20;

    address private constant AAVE_ADDRESSES_PROVIDER = 0xd449FeD49d9C443688d6816fE6872F21402e41de; // Replace with actual Aave v3 addresses provider on Base Sepolia
    address private constant AAVE_WETH = 0x4200000000000000000000000000000000000006; // Replace with actual WETH token address on Base Sepolia

    IPoolAddressesProvider private provider = IPoolAddressesProvider(AAVE_ADDRESSES_PROVIDER);
    IPool private pool = IPool(provider.getPool());

    function depositETH(uint256 amount) external payable {
        require(msg.value == amount, "ETH amount mismatch");
        pool.supply(AAVE_WETH, amount, msg.sender, 0);
    }

    function withdrawETH(uint256 amount) external {
        pool.withdraw(AAVE_WETH, amount, msg.sender);
    }
}
