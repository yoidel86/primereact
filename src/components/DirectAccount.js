import React, {useState, useEffect, Component, useRef} from 'react';
import Web3 from "web3";
import  DaiToken from "../abis/DaiToken.json"
import {Toast} from "primereact/toast";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign-contract";

import {signAndSendTransaction} from '../ethereum/helpers/index';
import {DataView} from "primereact/dataview";

class DirectAccount extends Component{



    constructor(props) {
        super(props);

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

            // toastRef: Toast(),
            // privateKeyModal: false
        };
        let privateKey = sessionStorage.getItem('pkencoded');
        console.log("cargando llave")
        if (!privateKey) {
            console.log(" llave no encontrada")

            this.state.privateKeyModal=false;
            return;
        } else {
            privateKey = decode(privateKey);
            this.state.privateKey = privateKey
            console.log(" llave encontrada",privateKey)
        }

        let account = web3.eth.accounts.privateKeyToAccount(privateKey)
        this.state.account = account
        this.loadBalances()


    }
    loadBalances(){
        const d=5777 //temporalmente el network id
        const _daiToken = DaiToken.networks[d];
        let account = this.state.account
        console.log("CURRENT ACCOUNT",account)
        web3.eth.getBalance(account.address).then(a=>this.setBalance(a))
        let daiToken = new web3.eth.Contract(
            DaiToken.abi,
            _daiToken.address,
        );
        daiToken.methods.balanceOf(account.address).call().then(a =>this.setDaiBalance(a))
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
        const d=5777 //temporalmente el network id
        const _daiToken = DaiToken.networks[d];
        let daiToken = new web3.eth.Contract(
            DaiToken.abi,
            _daiToken.address,
        );

        try {
            const makeRequest = await daiToken.methods.transfer(recipient, value);
            const options = {
                to: makeRequest._parent._address,
                data: makeRequest.encodeABI(),
                gas: '1000000'
            };
            await signAndSendTransaction(options, privateKey);
            this.setState({ success: true,recipient:'',value:'' });
            this.loadBalances()

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

