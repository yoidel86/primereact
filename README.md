# Ejemplo de Truffle - Ganache con varias tecnicas

##### Es necesario tener instalado:

1- Node.js: https://nodejs.org/es/ \
2- Ganache: https://www.trufflesuite.com/ganache \
3- Truffle: https://www.trufflesuite.com/truffle


##### Pasos a seguir:

Iniciar una blockchain de prueba utilizando Ganache

Instalar dependencias:

        npm install

Compilar contratos:

        truffle compile

antes de desplegar los contratos se recomienda para ir validando los pasos, vincular el proyecto en ganache para asi cargar los
contratos y ver el cambio de estado una vez desplegado los contratos. para esto ir a la opcion de configuracion de ganache y vincular con el proyecto actual 
seleccionado el fichero de configuracion truffle-config.js

Desplegar contratos:

        truffle migrate

##### App

Compilar y ejecutar la aplicacion :

    npm start

Una vez corriendo la aplicacion tiene dos menus principales para acceder a las opciones
1- usando billetera metamask, aqui se probara los contratos validando las transacciones con la billetera metamask por lo cual debera tenerla instalada 
2- usando llave privada para validar las transacciones.  Aqui se le pedira registrar la llave privada almenos una vez esta llave debe ser
la llave de la cuenta que creo los contratos la primera vez y luego puede usarse cualquier llave privada cuya cuenta ya posea tokens 



contrato SampleString direccion en testnet
0xBf1f301d2659aCf62c4a89fFD3Be4275300518f0
llave publica dueño
0x24a20013c83AaC9c6aB4e27D06b13D116c05c0b4
llave privada dueño
5a4b6beffe092d3c90682ef3f43a5a8e5702f1422de98e05bd91f38bcb570366

otro dueño
0x91BBD513fE89bF796b5944bbc8f9553E05e94384
c0d001f29c463eef45a678d92bebd4da2c7077fb14de0faa58cd784e03514108




0xC7a8A5B9fCC377825Ee95FE2003EA85DD7444cA7
0xb7e534e806cce8c1ca519d0e866b594b083e74802ed31a3037c48869aa66e808  si
0x1959640fE1931E8c69abCc7d6D0684489C4F4fc6
0x517a157da4befd8c0f632fa9820139405b0e068503426e6173ea90aac3daa52d  si

0x34E74eB00a72bA72418821Ecf7F2082053A98cE9
0xaf21ae41b63b296dcb7d1c8f953e8591287b62b9953daa9db64de015f6a5d20f
0x1A5a106E7DaEde61A54D8e5Ee0272cF34c166Ded
0x1716b9bbd2e0ddc79584503a4778a34d5ec9879d7bf768640a31eaf7d85c5a10
0x9f21868BfA313F5C724a20b0bd439C1Aa8cc8f66
0x70e78b4571eb5cfa9fe8b180494ccaff0fec6e18d8dab7ce768bdb94b4f4e2be
0x20ddA8FD182a4F5D2f174023599436473a8B847E
0x29bb4cce02051ee92a02b72955acab80446fc40e2da2232d879eabc7ab96e345
0xa723Fb0D5079c0dB8934922b3796d4986eC5e358
0x45436ee6fa9fb472c67b8317d14b9daf11fffdf0dc66abd768ef2e3cf1ad7516
0x319E1D7CCaE82850B7FD87Ed41E1A2224A560Be3
0xb020c7797e3f097ad565fa48fc121f711c36e112abee7ad28fd36acebfa0d06b
0x2e2a1dAe7CAebcAD259fC513d8489C72f9896Aa3
0x9e1b39e45c06724e532f05a6d65dfa0922b1589ae896a38330ce848ab7e1ab4a
0x4774D71250CA24fe15B872954d2d19d02fB8B52f
0x0354a027338dd5e8643ffbcc9c45f5cddae7982d563043e391b3125cdfa589df
0xC579e999a017f1F4d7C3e5cBe0E5829F328c1622
0x5b4c8300eddab987baf2d2ec3e2e38d843ba964ca19f6e52570dcdadb116a2c3



contrato del tocken nft ArtToken
0x992C993dAb00B25aaaB3b761884603eA31D9F755
  > transaction hash:    0x48c6eb0c4ed1ef74696a15f072c8bbd91e2391666f551bd562891df787291453
   > Blocks: 5            Seconds: 23
   > contract address:    0x992C993dAb00B25aaaB3b761884603eA31D9F755
   > block number:        13395537
   > block timestamp:     1634749006
   > account:             0xd13838884422972D7d5BD3E00905D6AB820ff998
   > balance:             0.28542876
   > gas used:            3176917 (0x3079d5)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.06353834 ETH
