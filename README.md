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

