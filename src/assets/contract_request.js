import { ethers } from "ethers";

/* send */
async function register_contract(_contract, _name, _owner, _resolver) {
    // console.log("-- [request] register");
    let response = await _contract.register(_name, _owner, _resolver, { value: 100000000000000 });
    // console.log("-- [response] register :", response);
    return response;
}

async function bid_contract(_contract, _tokenId, _value) {
    // console.log("-- [request] bid");
    let response = await _contract.bid(_tokenId, { value: _value });
    // console.log("-- [response] bid :", response);
    return response;
}

/* view */
async function getNodeHashes_contract(_contract) {
    // console.log("-- [request] getNodeHashes");
    let response = await _contract.getNodeHashes();
    // console.log("-- [response] getNodeHashes :", response);
    return response;
}

async function getBNSInfo_contract(_contract, _node) {
    // console.log("-- [request] getBNSInfo");
    let response = await _contract.getBNSInfo(_node);
    // console.log("-- [response] getBNSInfo :", response);
    return response;
}

async function getBNS6551s_contract(_contract, _node) {
    // console.log("-- [request] getBNS6551s");
    let response = await _contract.bns6551s(_node);
    // console.log("-- [response] getBNS6551s :", response);
    return response;
}

async function getHighestBid_contract(_contract, _node) {
    // console.log("-- [request] getHighestBid");
    let response = await _contract.highestBid(_node);
    // console.log("-- [response] getHighestBid :", response);
    return response;
}

async function getEndOfYear_contract(_contract) {
    // console.log("-- [request] getEndOfYear");
    let response = await _contract.endOfYear();
    // console.log("-- [response] getEndOfYear :", response);
    return response;
}

async function getTaxRate_contract(_contract) {
    // console.log("-- [request] getTaxRate");
    let response = await _contract.taxRate();
    // console.log("-- [response] getTaxRate :", response);
    return response;
}

async function getMaxPercentage_contract(_contract) {
    // console.log("-- [request] getMaxPercentage");
    let response = await _contract.MAX_PERCENTAGE();
    // console.log("-- [response] getMaxPercentage :", response);
    return response;
}

async function getTokenIdFromNodeHash(_contract, _node) {
    const { name } = await _contract.getBNSInfo(_node);
    const _newName = name.replace(".opbnb", "");
    const tokenId = ethers.keccak256(ethers.toUtf8Bytes(_newName));
    return tokenId;
}

export { register_contract, bid_contract }
export {
    getNodeHashes_contract, getBNSInfo_contract, getBNS6551s_contract, getHighestBid_contract,
    getEndOfYear_contract, getTaxRate_contract, getMaxPercentage_contract,
    getTokenIdFromNodeHash
}