import React, { useState, useRef,Component } from 'react';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import PrimeReact from 'primereact/api';
import classNames from 'classnames';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import logo from './logo.svg';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './layout/flags/flags.css';
import './layout/layout.scss';
import './App.scss';
import {Dashboard} from "./components/ListDemo";
import {Account} from "./components/Account";
import DirectAccount from "./components/DirectAccount";
import GetSetText from "./components/GetSetText";
import {Dai} from "./components/Dai";
import { Route, useHistory } from 'react-router-dom';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';

import { CSSTransition } from 'react-transition-group';

const App = () =>  {
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('dark')
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const [dumi, setDumi] = useState(null);
    const sidebar = useRef();
    // active ripple effect PrimeReact
    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false
    });

    const sidebarClassName = classNames('layout-sidebar', {
        'layout-sidebar-dark': layoutColorMode === 'dark',
        'layout-sidebar-light': layoutColorMode === 'light'
    });
    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const onToggleMenu = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                setOverlayMenuActive(prevState => !prevState);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive(prevState => !prevState);
            }
        }
        else {
            setMobileMenuActive(prevState => !prevState);
        }
        event.preventDefault();
    }
    const menu = [
        {
            label:'Usando Metamask',
            icon:'pi pi-fw pi-file',
            items:[
                        {
                            label:'Dai',
                            icon:'pi pi-fw pi-file',
                            to: '/Dai2'
                        },
                        {
                            label:'Cuenta',
                            icon:'pi pi-fw pi-file',
                            to: '/Account'
                        }
                    ]
        },
        {
            label:'Sin Metamask',
            icon:'pi pi-fw pi-money-bill',
            items:[
                {
                    label:'Dai',
                    icon:'pi pi-fw pi-file',
                    to:'/DirectAccount'
                },
                {
                    label:'Get Set Text',
                    icon:'pi pi-fw pi-file',
                    to:'/GetSetText'
                },
                {
                    label:'Cambiar LLave privada',
                    icon:'pi pi-fw pi-file'
                },

            ]
        },



    ];
    const history = useHistory();

    let menuClick = false;
    const onSidebarClick = () => {
        menuClick = true;
    }
    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }
    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        menuClick = false;
    }
    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    const isSidebarVisible = () => {
        if (isDesktop()) {
            if (layoutMode === 'static')
                return !staticMenuInactive;
            else if (layoutMode === 'overlay')
                return overlayMenuActive;
            else
                return true;
        }

        return true;
    }



        return (
            <div className={wrapperClass} onClick={onWrapperClick}>
                <AppTopbar onToggleMenu={onToggleMenu} />

                <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                    <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                        <div className="layout-logo" style={{cursor: 'pointer'}} onClick={() => history.push('/')}>
                            <img alt="Logo" src={logo} />
                        </div>
                        <AppProfile />
                        <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
                    </div>
                </CSSTransition>

                {/*<AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}*/}
                {/*           layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />*/}

                <div className="layout-main">
                    <Route path="/Dai2" >
                        <Dai></Dai>
                    </Route>

                    <Route path="/" exact>
                        <Dashboard title="Inicio"></Dashboard>
                    </Route>

                    <Route path="/DirectAccount" component={DirectAccount} />
                    <Route path="/GetSetText" component={GetSetText} />
                    <Route path="/Account" component={Account} />

                    {/*<Route path="/samplepath">*/}
                    {/*    <Dai title="Historial de Factura" sing="facturas" />*/}
                    {/*</Route>*/}

                    <Route path="/dashboard">
                        <Dashboard title="Dashboard"></Dashboard>
                    </Route>
                </div>

                <AppFooter />

            </div>
        );

}

export default App;