/* send */
async function register_contract(_contract, _account, _name, _owner, _resolver) {
    console.log("-- [request] register");
    let response = await _contract.methods.register(_name, _owner, _resolver).send({ from: _account });
    console.log("-- [response] register :", response);
    return response;
}

async function bid_contract(_contract, _account, _tokenId, _value) {
    console.log("-- [request] bid");
    let response = await _contract.methods.bid(_tokenId).send({ from: _account, value: _value });
    console.log("-- [response] bid :", response);
    return response;
}

/* view */
async function getNodeHashes_contract(_contract) {
    console.log("-- [request] getNodeHashes");
    let response = await _contract.methods.getNodeHashes().call();
    console.log("-- [response] getNodeHashes :", response);
    return response;
}

async function getBNSInfo_contract(_contract, _node) {
    console.log("-- [request] getBNSInfo");
    let response = await _contract.methods.getBNSInfo(_node).call();
    console.log("-- [response] getBNSInfo :", response);
    return response;
}

export { register_contract, bid_contract }
export { getNodeHashes_contract, getBNSInfo_contract }