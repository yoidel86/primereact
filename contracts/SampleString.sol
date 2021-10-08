pragma solidity >=0.4.24 <0.7.0; //declarando la version de compatibilidad del compilador

contract SampleString{   //declarando el contrato con su nombre 
    string value;   //propiedad de tipo string cuyo valor puede ser alterado en el tiempo
    constructor() public{  //declarando constructor del contrato de tipo publico
        value = "Initial Value";  //inicializando la propiedad value
    }

    //funcion que devuelve el valor almacenado en la propiedad 
    //la declaracion 'view' es porque es una funcion que no altera los valores de las propiedades del contrato,
    // la declaracion 'returns(string)' es para especificar que la funcion retorna un dato de tipo string, si no se especifica la funcion no retorna informacion
    function get() public view returns(string memory){
        return value;   //
    }

    //funcion que cambia el valor guardado en el contrato de la propiedad value
    function set(string memory _value) public {
        value = _value;
    }

}