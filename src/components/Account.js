import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import DaiToken from "../abis/DaiToken.json";

export const Account = () =>{

    const [networkId,setNetworkId] = useState('')
    const [daiToken,setDaiToken] = useState({})
    const [accountd, setAccountd] = useState('0xfB97cAbB6c3e31583F0d45E4E1B8f44f5a756813');
    const [balance, setBalance] = useState(0)
    const [key,setKey] = useState('89a76bc75936a45459abb621c36bf21c5902e5eb93732d78faf4bc4eaf032ba9')
    const setNewAccount = (text) =>{
        setAccountd(text)
    }
     useEffect(() => {
        // const productService = new ProductService();
        // productService.getProducts().then(data => setDataviewValue(data));
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
             window.ethereum.enable();
             console.log("ETH CONECTED",window.web3)
            const web3 = window.web3;
            console.log("ETH CONECTED 2",window.ethereum)
            web3.eth.getAccounts().then(function(accounts){

                setAccountd( accounts[0]);
                console.log("accounts :",accounts)
                web3.eth.getBalance(accounts[0]).then(function(d){
                    console.log(d);
                    let d2 = window.web3.utils.fromWei(d,'Ether')
                    setBalance(d2)
                });
            });



            // if (taniCoin) {
            //     this.sharedState.taniToken = new web3.eth.Contract(
            //         TaniCoin.abi,
            //         taniCoin.address
            //     );
            //
            //     let taniBalance = await this.sharedState.taniToken.methods
            //         .balanceOf(this.sharedState.account)
            //         .call();
            //     let balance = window.web3.utils.fromWei(taniBalance, "Ether");
            //     this.sharedState.balance = balance;
            // }
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            console.log("WEB3 CONNECTED SET")

        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    }, []);
    return (
        <div className="p-grid list-demo">
            ACCOUNT eth {accountd}  Balance:{balance}
        </div>
    )
}