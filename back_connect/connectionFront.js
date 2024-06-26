import {ETHtoClient, USDCtoClient, calcular, solicitar } from "./sc";

//import './sc.js';
let account; // cuenta del cliente // sender client account
const owner='0x02e7520482045E2bA8a127C5d0D6E40a17024127'; // dueño del contrato //contract owner	
		
async function connectWallet() { // conecta el front con la wallet(coinbase) // wallet Connection
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});				
        account = accounts[0];
        console.log(account);                           
    }
}
connectWallet();

async function connectCrediYa() { // conecta el front con el SC de crediYA // smart contract crediYA Connection
    const abi = [
        {
            "inputs": [
                {
                    "internalType": "contract IERC20Metadata",
                    "name": "_usdt",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_pool",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "payCredit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_cripto",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_usd",
                    "type": "uint256"
                }
            ],
            "name": "requestCredit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "amountPay",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "UserCrediYa",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "cripto",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "usd",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "permit",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "valor",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "pagos",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const address = "0xa7AE601F99483Ee8945D9538ed95E96c28008fA3";
    window.web3 = await new Web3(window.ethereum);
    window.contract1 = await new window.web3.eth.Contract( abi, address);
    
}
connectCrediYa();

async function connectUSDC() { // conecta el front con el SC de USDC // smart contract USDC Connection
    const abi = [{"inputs":[{"internalType":"address","name":"implementationContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}]
    const address = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
    window.web3 = await new Web3(window.ethereum);
    window.contract3 = await new window.web3.eth.Contract( abi, address);
    
}
connectUSDC();

const calculate= async () => {  // invocar para obtener la cantidad en ETH del prestamo // get amount credit ETH  
    const amountUSDC=BigInt(document.getElementById("setAmount1")) ;
    console.log(amountUSDC);    
    document.getElementById("setColateral").innerHTML=calcular(amountUSDC)[0];

}

const saveCredito= async () => { // invocar cuando el cliente acepte el credito // when customer accepts credit
    const amountUSDC= BigInt(document.getElementById("setAmount1"));
    console.log(amountUSDC);
    await window.eth.sendTransaction({from: account,to: owner, value: calcular(amountUSDC)[1]})
    solicitar(amountUSDC);
    USDCtoClient(account);
}

const pagarUSDC= async()=> { // invocar cuando el cliente paga sus cuotas // when client pay credits fees
    const dec=window.contract3.methods.decimals().call();
    const amount=BigInt(window.contract1.methods.amountPay(account).call()*10**dec);
    await window.contract3.methods.transfer(owner,amount).send({from:account});
    await window.contract1.methods.payCredit(account).send({from:account});
}

const withdrawSupply= async() => { // invocar cuando el cliente quiere recuperar su ETH despues de pagar todo // client recovers his ETH
    await window.contract.methods.pagoCredito(account).send({from:account});
    pagar();  
    ETHtoClient(account);
}
