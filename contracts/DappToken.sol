pragma solidity ^0.5.0;

contract DappToken {
    string  public name = "DApp Token"; //Nombre del token
    string  public symbol = "DAPP";     //symbolo que se muestra del token
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;

    //evento que se dispara cuando se hace una transferencia, esto es para informar al resto de la blockchain
    event Transfer(
        address indexed _from, //quien hace la transferencia
        address indexed _to,    //quien recibe la transferencia
        uint256 _value  //valor de la transferencia
    );
    //evento que se dispara cuando se aprueba que alguien gaste los token de otra persona
    event Approval(
        address indexed _owner, //quien posee los tokens
        address indexed _spender,  //quien se autoriza a gastar los token
        uint256 _value  // la cantidad que autorizan a gastar
    );

    // diccionario donde se registran las cantidades de tokens por personas
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;// diccionario donde se registra la relacion dueno y autorizado a gastar con la cantidad autorizada

    constructor() public {
        balanceOf[msg.sender] = totalSupply; //para inicializar el contrato asignando inicialmente todos los tokens al creador del contrato
    }

    //funcion que realiza la transferencia
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);  //validando que el que esta haciendo la transferencia tenga mas de lo que manda
        balanceOf[msg.sender] -= _value; //quitando la cantidad enviada al balance de quien hace la transferencia
        balanceOf[_to] += _value;  //sumando la cantidad enviada al balance de quien recibe la transferencia
        emit Transfer(msg.sender, _to, _value);  //avisando al resto de la blockchain de la operacion realizada
        return true;
    }

    //funcion que permite a una direccion gastar dinero de quien le esta dando el permiso
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value; //asignando la cantidad de tokens que puede gastar "_spender"
        emit Approval(msg.sender, _spender, _value); // avisando al resto de la blockchain
        return true;
    }

    //funcion para que una persona aprobada haga transacciones de tokens pertenecientes a una persona a otra.(contratos vendedores etc)
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);//verificando que el aprobador tenga fondos
        require(_value <= allowance[_from][msg.sender]);//verificando que quien transfiere tiene suficiente aprobado para la transaccion
        balanceOf[_from] -= _value;//quitando los fondos del duenno original
        balanceOf[_to] += _value;//sumandoselo a quien lo recibe
        allowance[_from][msg.sender] -= _value; //disminuyendo de la cantidad aprobada
        emit Transfer(_from, _to, _value);//avisando al resto de la blockachain que hubo una transferencia
        return true;
    }
}
