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
import { forIn } from 'lodash';

class Wallets extends Component{

   


    constructor(props) {
        super(props);

        this.web3js = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
        // this.address = this.props.match.params.address;
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            web3 = window.web3;
        }else{
            this.web3js = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')
        }
        this.state = {
            wallets: [],
            account:{},
            accountBalance:0,
            DAIBalance:0,
            network:97 ,
           
        };

        var account1 = this.web3js.eth.accounts.create();
        for(let i=0;i<10;i++){
            this.state.wallets[i]=this.web3js.eth.accounts.create()
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
            this.state.privateKeyModal=true;

            privateKey = decode(privateKey);
            this.state.privateKey = privateKey;
            console.log(" llave encontrada",privateKey);
        }
        let account = this.web3js.eth.accounts.privateKeyToAccount(privateKey);
        this.state.account = account;
        this.loadBalances();
        

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
    setBalance(p){
        console.log("setting balance",p)
        let value = web3.utils.fromWei(p, 'ether')+" ETH";
        this.setState({accountBalance:value});
    }
    setDaiBalance(p){
        console.log("dai balance ",p)
        let value = web3.utils.fromWei(p, 'ether')+" DAI";
        this.setState({DAIBalance:value});
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
    onSubmit = async event => {
        event.preventDefault();
        this.setState({ success: false });
        let privateKey = this.state.privateKey;
        let value = '10';   
        const _daiToken = DaiToken.networks[this.state.network];
        let daiToken = new this.web3js.eth.Contract(
            DaiToken.abi,
            _daiToken.address,
        );
        value = web3.utils.toWei(value, 'ether');
        console.log("tiene provider ",this.web3js.currentProvider);
        daiToken.setProvider(this.web3js.currentProvider)
        web3.setProvider(this.web3js.currentProvider)
        for(let element of this.state.wallets){
            console.log("WHAT ELEMENT IS IN",element)
            try {
                var makeRequest = await daiToken.methods.transfer(element.address, value);
                var options = {
                    to: makeRequest._parent._address,
                    data: makeRequest.encodeABI(),
                    gas: '1000000'
                };
                await signAndSendTransaction(options, privateKey);
                this.setState({ success: true,recipient:element.address,value:value });
                element.enviada = true;
    
            } catch (error) {
                console.log("error ? :( ")
                console.log(error.message);
                console.log(error)
                this.setState({ error: error.message });
            }
        }
        // const d=5777 //temporalmente el network id
        
       

        this.setState({ loading: false });
    };
    itemTemplate(data){
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <div className="product-list-detail">
                        <div className="product-name">{data.address}</div>
                        {/* <Rating value={data.rating} readonly cancel={false}></Rating> */}
                        
                            <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.privateKey}</span>
                        
                    </div>
                   
                </div>
            </div>
        );
    }


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
        return (
            <div className="p-grid list-demo">
       
                {privateKey}
                <div className="p-col-12">
                    <div className="card">
                        <h5>Wallets Generadas</h5>
                        <DataView value={this.state.wallets} layout="list" paginator rows={9}  itemTemplate={this.itemTemplate} ></DataView>
                        <Button onClick={this.onSubmit} >Enviar!</Button>
                        
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

export default Wallets

