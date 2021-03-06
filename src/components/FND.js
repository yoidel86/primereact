import React, {useState, useEffect, useRef} from 'react';
import Web3 from "web3";
import { Metadata } from "../services/Metadata";
import FNDNFT721 from "../abis/FNDNFT721.json";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import { Address } from 'ethereumjs-util';

export const FND = () =>{

    const [networkId,setNetworkId] = useState('')
    const [symbol, setSymbol] = useState('');
    const [total, setTotal] = useState('');
    const [market, setMarket] = useState('');
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [creator, setCreator] = useState('');
    const [tokenName, setTokenName] = useState('');
    const [tokenDescription, setTokenDescription] = useState('');
    const [tokenImg, setTokenImg] = useState('');

    const [balance,setBalanace] = useState(0)
    const [amount,setAmount] = useState(94137)
    const [sendTo,setSendTo] = useState('')
    const [daiTokenContract,setDaiTokenContract] = useState({})
    const [daiAddress,setDaiAddress] = useState('')
    const [url,setUrl] = useState('')

    const [account, setAccount] = useState('0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405');
    const [key,setKey] = useState('89a76bc75936a45459abb621c36bf21c5902e5eb93732d78faf4bc4eaf032ba9')
    const setNewAccount = (text) =>{
        setAccount(text)
    }
    const toastRef = useRef();
    const metadata = new Metadata();
    useEffect(() => {
        // const productService = new ProductService();
        // productService.getProducts().then(data => setDataviewValue(data));
        loadDAi()
    }, []);
    const loadDAi = () =>{
        console.log("first load ?")
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            const web3 = window.web3;
            web3.eth.net.getId().then(function(d){
                console.log(d,"DDD")

                //load dai token balance
              
                    let addr = "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405"
                    console.log("ADDRESS DAI ",addr)
                    setDaiAddress(addr);
                    let fndNFT721 = new web3.eth.Contract(
                        FNDNFT721.abi,
                         // "0xc9fe4Ffc4Be41d93A1a7189975cD360504Ee361A"
                        "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405"
                    );
                    console.log(account)

                    fndNFT721.methods.tokenURI("94137").call().then(function(val){
                        console.log(val);
                        setUrl(val);
                        loadJson(val);
                        setDaiTokenContract(fndNFT721);
                        console.log("contract saved balance seted")
                    }).catch(function(e){
                        console.log("ERROR 111 ",e);
                    })
                    loadExtras(fndNFT721,94137);

            });


        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            console.log("WEB3 CONNECTED SET")

        } else {
            let web3js = new Web3('https://mainnet.infura.io/v3/2fc8426062744d85957f8f3e5170c436')
            let fndNFT721 = new web3js.eth.Contract(
                FNDNFT721.abi,
                // "0xc9fe4Ffc4Be41d93A1a7189975cD360504Ee361A"
                "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405"
            );
            console.log(account)

            fndNFT721.methods.tokenURI(94137).call().then(function(val){
                console.log(val);
                setUrl(val);
                setDaiTokenContract(fndNFT721);
                console.log("contract saved balance seted",val)
            }).catch(function(e){
                console.log("ERROR 222 ",e);
            })
            loadExtras(fndNFT721,94137);

        }
    }

    const loadUri = (addres,token) => {
        setAccount(addres);
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            
            const web3 = window.web3;
           
            let fndNFT721 = new web3.eth.Contract(
                FNDNFT721.abi,
                addres
            );
            console.log(account)

            fndNFT721.methods.tokenURI(token).call().then(function(val){
                console.log(val);
                setUrl(val);
                loadJson(val);
                setDaiTokenContract(fndNFT721);
                console.log("contract saved balance seted")
            }).catch(function(e){
                console.log("ERROR 111 ",e);
            })
            loadExtras(fndNFT721,token);

          
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            console.log("WEB3 CONNECTED SET")

        } else {
            let web3js = new Web3('https://mainnet.infura.io/v3/2fc8426062744d85957f8f3e5170c436')
            let fndNFT721 = new web3js.eth.Contract(
                FNDNFT721.abi,
                addres
            );
            console.log(account)
            fndNFT721.methods.tokenURI(token).call().then(function(val){
                console.log(val);
                setUrl(val);
                loadJson(val);
                console.log("contract saved balance seted",val)
            }).catch(function(e){
                console.log("ERROR 222 ",e);
            })
            loadExtras(fndNFT721,token);
            

        }
    }
    const loadExtras = (contract,token) => {
        contract.methods.symbol().call().then(function(symbol){
            setSymbol(symbol);
        })
        contract.methods.name().call().then(function(symbol){
            setName(symbol);
        })
        contract.methods.ownerOf(token).call().then(function(symbol){
            setOwner(symbol);
        })
        contract.methods.getNFTMarket().call().then(function(symbol){
            setMarket(symbol);
        })
        contract.methods.getNFTMarket().call().then(function(symbol){
            setMarket(symbol);
        })
        contract.methods.totalSupply().call().then(function(symbol){
            setTotal(symbol);
        })
        
    }
    const loadJson = (url) => {
        let parsed = url.replace('ipfs://','https://ipfs.io/ipfs/').replace('ipfs/ipfs','ipfs');
        metadata.getMetadata(parsed).then(function(a){
            console.log("JSON LOADED",a.data)
            setTokenName(a.data.name)
            setTokenDescription(a.data.description)
            if(a.data.image){
                var imagUrl = a.data.image.replace('ipfs://','https://ipfs.io/ipfs/')
                imagUrl = imagUrl.replace('ipfs/ipfs','ipfs');
                setTokenImg(imagUrl)
            }
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log("sending dais",account,amount,sendTo)
        
        loadUri(account,amount);
    }
    const imageTag = () =>{
        if(tokenImg.includes(".mp4")){
            return (<div className="col-md-6 " ><b>Video:</b><video src={tokenImg} width="100%" loop autoPlay></video>   </div>);
        }else {
            return(<div className="col-md-6 " ><b>Image:</b><img src={tokenImg} width="100%"></img>   </div>)
        }
    }
    const addres = (add) =>{
        return "https://etherscan.io/address/"+add;
    }
    return (

        <div className="p-grid list-demo card border-2 border-blue-50 p-3">
            <Toast ref={toastRef} />
            <div className="row">
                <div className="col-md-6"><div className='card'>
                     SYMBOL:{symbol}<br/>
                     NAME:{name}<br/>
                     ADDRESS:<a href={addres(account)}>{account}</a> <br/>
                     Market:<a href={addres(market)}>{market}</a> <br/>
                     Cantidad creados:{total} <br/>




                     TOKEN:{amount}<br/>
                     Owner:<a href={addres(owner)}>{owner}</a><br/>
                     Creator:<a href={addres(creator)}>{creator}</a><br/>

                     METADATA url:<a href={url} target="_blank"> {url}</a>
                     
                </div></div>
                <div className="col-md-6">
                    <form className="p-d-flex p-jc-center p-mt-6" onSubmit={onFormSubmit}>
                        <label htmlFor="">Token:</label>
                        <InputText value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <label htmlFor="" className="ml-4">Direccion:</label>
                        <InputText value={account} onChange={(e) => setAccount(e.target.value)} className="col-4"/>
                        <Button type="submit" label="Enviar" icon="pi pi-check" className="p-ml-2"/>
                    </form>
                </div>
            </div>
            <div className=" mt-4">
                <div className="row">
                   <b>Name:</b>{tokenName}
                </div>

                <div className="row mt-4">
                    <div className="col-6"><b>Description:</b><br/>{tokenDescription}</div>

                    {imageTag()}
                   
                </div>
            </div>

            <br/>

        </div>
    )
}