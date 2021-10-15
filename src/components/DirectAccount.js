import React, {useState, useEffect, Component, useRef} from 'react';
import Web3 from "web3";
import  DaiToken from "../abis/DaiToken.json"
import {Toast} from "primereact/toast";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign-contract";
import { Coingecko } from '../services/Coingecko';
import {signAndSendTransaction} from '../ethereum/helpers/index';
import {DataView} from "primereact/dataview";

class DirectAccount extends Component{

   


    constructor(props) {
        super(props);

        this.web3js = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
        // this.address = this.props.match.params.address;
        this.state = {
            recipient: '',
            value: '',
            error: '',
            success: false,
            loading: false,
            privateKeyModal: true,
            account:{},
            accountBalance:0,
            DAIBalance:0,
            network:97 ,
            analisis:{accounts:0}

            // toastRef: Toast(),
            // privateKeyModal: false
        };
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            web3 = window.web3;
        }else{
            this.web3js = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')
        }
        let privateKey = sessionStorage.getItem('pkencoded');
        console.log("cargando llave")
        if (!privateKey) {
            console.log(" llave no encontrada")
            this.state.privateKeyModal=false;

            // return;
            privateKey = '5a4b6beffe092d3c90682ef3f43a5a8e5702f1422de98e05bd91f38bcb570366'
            this.state.privateKey = privateKey
        } else {
            privateKey = decode(privateKey);
            this.state.privateKey = privateKey;
            console.log(" llave encontrada",privateKey);
        }

        let account = this.web3js.eth.accounts.privateKeyToAccount(privateKey);
        this.state.account = account;
        this.loadEstadisticas();
        this.loadBalances();
        this.web3js.eth.getBlockNumber().then(a=>this.setLatest(a))

    }
    setBlock(block){
        console.log("   BLOQUE DE INICIO DEL CONTRATO " ,block)
        this.state.block = block.blockNumber;
        this.state.owner = block.from;
        let contract = this.getContract()
        contract.methods.balanceOf(block.from).call().then(a =>this.setOwnerBalance(a))

        this.loadEvents();
    }
    
    setLatest(a){
        console.log("SETTING LATEST",a);
        this.state.latest = a;
        this.loadEvents();
    }
    getContract(){
        const d=this.state.network //temporalmente el network id
        const _daiToken = DaiToken.networks[d];
        let account = this.state.account
        
        // this.web3js.eth.getBalance(account.address).then(a=>this.setBalance(a))
        let daiToken = new this.web3js.eth.Contract(
            DaiToken.abi,
            _daiToken.address,
        );
        return daiToken;
    }
    printResult(text,value){
        console.log(text,value);
    }

    loadEvents(){
        if(this.state.block && this.state.latest)
       for (var i = this.state.block; i < this.state.latest; i +=4500 ) { 
         this.loadEventsFromBlock(i);
       }
    }
    loadEventsFromBlock(block){
        let that = this;
        let myContract = this.getContract();
        myContract.getPastEvents('Transfer', {
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: block,
            toBlock: block+4500
        }, function(error, events){ 
            if(error)
                console.log(error,events);
         })
        .then(function(events){
            if(events.length>0){
                that.analizeEvents(events)
            }
        }); 
    }

    loadEstadisticas(){
        if(this.state.analisis.accounts==0){
            const d=this.state.network 
            let network = DaiToken.networks[d]
            this.web3js.eth.getTransactionReceipt(network.transactionHash).then(a=>this.setBlock(a));
        }
    }
    analizeEvents(events){
        for(var event of events){
            this.state.analisis.accounts +=1
            
        }
        this.setState({analisis:this.state.analisis})
    }
    loadBalances(){
        const d=this.state.network //temporalmente el network id
        const _daiToken = DaiToken.networks[d];
        let account = this.state.account        
        this.web3js.eth.getBalance(account.address).then(a=>this.setBalance(a))
        let daiToken = new this.web3js.eth.Contract(
            DaiToken.abi,
            _daiToken.address,
        );
        daiToken.methods.balanceOf(account.address).call().then(a =>this.setDaiBalance(a))
        // this.loadEstadisticas();
    }
    showText(text,severity=false){
        if(!severity){
            severity = 'info'
        }
        if (text) {
            // this.state.toastRef.current.show({ severity: severity, summary: text, life: 3000 });
        }
    }
    loading(){
        this.showText("Una transaccion puede tomar varios segundos, por favor sea paciente ","info" )
    }

    setDaiBalance(p){
        console.log("dai balance ",p)
        let value = web3.utils.fromWei(p, 'ether')+" DAI";
        this.setState({DAIBalance:value});
    }
    setOwnerBalance(p){
        console.log("dai balance owner ",p)
        let value = web3.utils.fromWei(p, 'ether');
        this.setState({ownerBalance:value+" DAI"});
        let gecko = new Coingecko();
        let cuentas = gecko.getCuentas().then(a=>this.setTVL(a,value));
        console.log("CUENTASSS GECKO",cuentas);

        //@todo call to coingecko api to get price and marketcap https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=usd%2Cbtc&include_market_cap=true
    }
    setTVL(a,value){
        console.log("calculating TVL",a.btc*value,a.usd*value,value);
        this.setState({tvlBTC:a.btc*value+" BTC",tvlUSD:a.usd*value+" USD"});

    }
    setBalance(p){
        console.log("setting balance",p)
        let value = web3.utils.fromWei(p, 'ether')+" ETH";
        this.setState({accountBalance:value});
    }
    success(){
        this.showText("Su transaccion se completo satisfactoriamente ","info" )
    }
    validateInput() {
        const value = this.state.value.match(/^[0-9.]+$/g);
        const recipient = this.state.recipient.match(/^0x[a-fA-F0-9]{40}$/g);

        return value && recipient;
    }
    savePrivateKey = async event => {
        event.preventDefault();
        console.log(this.state.privateKey);
        sessionStorage.setItem('pkencoded', encode(this.state.privateKey));
        console.log("SAVED IN SESSION STORAGE")
        this.setState(
            { privateKeyModal: true }
        )

    }
    removeCurrentKey = async event => {
        sessionStorage.removeItem('pkencoded');
        console.log("removed IN SESSION STORAGE")
        this.setState(
        { privateKeyModal: false }
        )

    }

    onSubmit = async event => {
        event.preventDefault();
        this.setState({ success: false });

        if (!this.validateInput()) {
            return;
        }
        let privateKey = this.state.privateKey;
        let {value, recipient } = this.state;
        value = web3.utils.toWei(value, 'ether');
        // const d=5777 //temporalmente el network id
        const _daiToken = DaiToken.networks[this.state.network];
        let daiToken = new this.web3js.eth.Contract(
            DaiToken.abi,
            _daiToken.address,
        );
        console.log("tiene provider ",this.web3js.currentProvider);
        daiToken.setProvider(this.web3js.currentProvider)
        try {
            const makeRequest = await daiToken.methods.transfer(recipient, value);
            const options = {
                to: makeRequest._parent._address,
                data: makeRequest.encodeABI(),
                gas: '1000000'
            };
            web3.setProvider(this.web3js.currentProvider)
            await signAndSendTransaction(options, privateKey);
            this.setState({ success: true,recipient:'',value:'' });
            this.loadBalances()
            this.loadEstadisticas()

        } catch (error) {
            console.log("error ? :( ")
            console.log(error.message);
            console.log(error)
            this.setState({ error: error.message });
        }

        this.setState({ loading: false });
    };


    render() {
        let privateKey;
        if(!this.state.privateKeyModal){
            privateKey = (
                <div className="card">
                    <label>Necesita especificar su clave privada antes de hacer una transaccion</label><br/>

                    <InputText onChange={event => this.setState({ privateKey: event.target.value })} className="ml-2 col-8"/>
                    <Button onClick={this.savePrivateKey} > Guardar</Button>
                </div>
            )
        }else{
            privateKey = (
                <div className="col-12">
                    <Button onClick={this.removeCurrentKey}>Eliminar llave privada actual</Button>
                    <label htmlFor="" className="ml-3">Current Balance:</label> <span className="p2" > {this.state.accountBalance}</span>
                    <label htmlFor="" className="ml-3">Dai Balance:</label> <span className="p2" > {this.state.DAIBalance}</span>
                </div>
            )
        }
        let alert = "";
        if(this.state.success){
            alert = (
                <div className="alert-primary">
                    Transaccion completada
                </div>
            )
        }
        return (
            <div className="p-grid list-demo">
                {alert}
                {privateKey}

                <div className="p-col-12">
                    <div className="card">
                        <h5>Enviar Dai</h5>

                            <form onSubmit={this.onSubmit} >


                                    <label>Cantidad</label>
                                    <InputText value={this.state.value} label="ether"  onChange={event => this.setState({ value: event.target.value })} />

                                    <label className="ml-5">Direccion</label>
                                    <InputText value={this.state.recipient} onChange={event => this.setState({ recipient: event.target.value })} className="ml-2 col-8" />
                                <Button onClick={this.onSubmit} >Enviar!</Button>

                            </form>
                    </div>
                    <div className="card mt-3">
                       <h5> ESTADISTICAS</h5>
                    <label>Cuentas:</label>{this.state.analisis.accounts}
                    <label className="ml-3">Owner: {this.state.owner}</label>
                    <label className="ml-3">Balance: {this.state.ownerBalance}</label><br/>
                    <label className="">TVL(BTC): {this.state.tvlBTC}</label>
                    <label className="ml-3">TVL(USD): {this.state.tvlUSD}</label>

                    </div>
                </div>
            </div>
        );
    }

}


function decode(data) {
    return window.atob(data);
}
function encode(data) {
    return window.btoa(data);
}

export default DirectAccount

