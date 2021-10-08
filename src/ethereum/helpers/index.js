import web3 from '../../ethereum/web3';

export async function signAndSendTransaction(options, privateKey) {
    console.log("try to  SIGN")

    let signedTransaction = await web3.eth.accounts.signTransaction(options, privateKey);
    console.log("TRANSACTION SIGNED")
    await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log("TRANSACTION SENDED")
}
export async function signAndSendTransactionProvider(options, privateKey,provider) {
    console.log("try to  SIGN ??")
    web3.eth.accounts.setProvider(provider)
    let signedTransaction = await web3.eth.accounts.signTransaction(options, privateKey);
    console.log("TRANSACTION SIGNED")
    await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log("TRANSACTION SENDED")
}