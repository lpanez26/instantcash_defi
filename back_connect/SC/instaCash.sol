// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract instaCash is Ownable(0x02e7520482045E2bA8a127C5d0D6E40a17024127){
    using SafeMath for uint;
    address pool;
    IERC20Metadata usdt;

    modifier onlyPermit(address _ad){
        require(!UserCrediYa[_ad].permit,"You cannot access more than one credit");
        _;
    }

    struct detail{        
        uint cripto;
        uint usd;
        bool permit;
        mapping (uint=>bool)cuotas;
        uint valor;
        uint pagos;
    }

    mapping (address => detail) public UserCrediYa; 
    

    constructor (IERC20Metadata _usdt, address _pool){
        pool=_pool;
        usdt=_usdt;
    }

    function requestCredit(address _user,uint _cripto, uint _usd) external onlyOwner onlyPermit(_user){
        detail storage user= UserCrediYa[_user];
        user.cripto=_cripto;
        user.usd=_usd;
        user.valor=_usd/4; 
        user.permit=true;       

    }

    function payCredit (address _user) external onlyOwner{
        detail storage user= UserCrediYa[_user];
        if (user.pagos==3){            
            user.pagos=0;
        }else{
            user.pagos+=1;            
        }
    }

    function amountPay (address _user) external view returns(uint){
        detail storage user= UserCrediYa[_user];
        if (user.pagos==3){            
            return user.usd.sub(user.valor.mul(3));

        }else{
            return user.valor;            
        }
    }    
}
