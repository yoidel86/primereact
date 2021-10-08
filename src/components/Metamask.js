import React, {useState, useEffect, useRef} from 'react';
import Web3 from "web3";
import DaiToken from "../abis/DaiToken.json";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";

export const Metamask = () =>{

    const [networkId,setNetworkId] = useState('')
    const [text, setText] = useState('');

    const [balance,setBalanace] = useState(0)
    const [daiToken,setDaiToken] = useState({})
    const [daiAddress,setDaiAddress] = useState('')

    const [account, setAccount] = useState('0xfB97cAbB6c3e31583F0d45E4E1B8f44f5a756813');
    const [key,setKey] = useState('89a76bc75936a45459abb621c36bf21c5902e5eb93732d78faf4bc4eaf032ba9')
    const setNewAccount = (text) =>{
        setAccount(text)
    }
    const toastRef = useRef();

    useEffect(() => {
        // const productService = new ProductService();
        // productService.getProducts().then(data => setDataviewValue(data));
        loadDAi()
    }, []);
    const loadDAi = () =>{
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            const web3 = window.web3;
            web3.eth.net.getId().then(function(d){
                console.log(d,"DDD")
                //load dai token balance
                const _daiToken = DaiToken.networks[d];
                if(_daiToken){
                    let addr = _daiToken.address
                    console.log("ADDRESS DAI ",addr)
                    setDaiAddress(addr);
                    let daiToken = new web3.eth.Contract(
                        DaiToken.abi,
                        _daiToken.address
                    );
                    console.log(account)
                    daiToken.methods.balanceOf(account).call().then(function(val){
                        console.log(val);
                        let d2 = window.web3.utils.fromWei(val,'kether')
                        setBalanace(d2)
                    })
                }

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
    }
    const onFormSubmit = (e) => {
        if (text) {
            toastRef.current.show({ severity: 'info', summary: text, life: 3000 });
        }

        // clear
        setText('');

        e.preventDefault();
    }
    return (

        <div className="p-grid list-demo card border-2 border-blue-50 p-3">
            <Dai></Dai>
        </div>
    )
}