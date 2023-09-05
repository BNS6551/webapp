import { ref } from 'vue';

import { ethers } from "ethers";
let provider = new ethers.BrowserProvider(window.ethereum);

import ADDRESS from './json/address.json';
import BASE from './json/BaseRegistrarImplementation.json'
import RESOLVER from './json/PublicResolver.json';
import CONTROLLER from './json/BNBRegistrarController.json';

const TestChainId = '0x15eb';
const RPCUrl = 'https://opbnb-testnet-rpc.bnbchain.org';
const ExplorerUrl = 'https://opbnbscan.com/';

const chainName = "opBNB Testnet";
const chainId = '0x15eb';
const rpcUrl = 'https://opbnb-testnet-rpc.bnbchain.org';
const nativeCurrency = { name: "tBNB", decimals: 18, symbol: "tBNB" };

let account = { address: "" };
let contract_base = undefined;
let contract_resolver = undefined;
let contract_controller = undefined;
let isConnected = ref(false);

async function connectContract() {
    contract_base = new ethers.Contract(ADDRESS.BaseRegistrarImplementation, BASE.abi, await provider.getSigner());
    contract_resolver = new ethers.Contract(ADDRESS.PublicResolver, RESOLVER.abi, await provider.getSigner());
    contract_controller = new ethers.Contract(ADDRESS.BNBRegistrarController, CONTROLLER.abi, await provider.getSigner());
}

async function connectMetamask() {
    if (provider) {
        account.address = (await provider.getSigner()).address;
        const { currentChainId } = await provider.getNetwork()

        if (currentChainId != chainId) {
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: chainId }]
                });
            } catch (e) {
                if (e.code === 4902) {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: chainId,
                            chainName: chainName,
                            rpcUrls: [rpcUrl],
                            nativeCurrency: nativeCurrency,
                        }],
                    });
                } else {
                    console.error("Fail to switch network");
                }
            } finally {
                provider = new ethers.BrowserProvider(window.ethereum);
            }
        }

        await provider.send('eth_requestAccounts', []); // this promps user to connect metamask
        await connectContract();

        isConnected.value = true;

        return true;
    } else {
        alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
    }
    return false;
}

function getAccount() {
    return account;
}

function getIsConnected() {
    return isConnected;
}

export {
    contract_base,
    contract_resolver,
    contract_controller
}
export {
    connectContract,
    connectMetamask,
    getAccount,
    getIsConnected
};