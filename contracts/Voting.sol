pragma solidity >=0.4.24 <0.9.0; //declarando la version de compatibilidad del compilador

//contrato inteligente para llevar a cabo una votacion
contract Voting{

    //estructura de los candidatos
    struct Candidate{
        uint id;  // id del candidato que es el que usara el votante para votar
        string name;  // nombre del candidato
        uint voteCount; //cantidad de votos recibidos
    }
    
    mapping (uint => Candidate) public candidates; //listado de candidatos
    uint public candidatecount;   //cantidad de candidatos
    mapping (address => bool) public voter;  //listado de direcciones que han votado
    
    //agregamos los candidatos en el constructor 
    constructor() public{
        addCandidate("Bidden");//   candidato 1
        addCandidate("Trump");//    candidato 2
    }
    
    //funcion de crear los candidatos, la creamos privada para solo usarla internamente asi no cualquiera puede crear candidatos
    function addCandidate(string memory _name) private{
        candidatecount++;//aumentamos la cantidad de candidatos
        candidates[candidatecount] = Candidate(candidatecount, _name, 0); //guardamos al candidato en el listado
    }
    
    //funcion clave del contrato usada por los votantes para votar, 
    function vote(uint _candidateid) public{
        require(!voter[msg.sender]); //Antes de continuar verificar que el votante no ha votado aun
        voter[msg.sender] = true; //marcar que ya voto
        candidates[_candidateid].voteCount ++; //aumentar la cantidad de votos del candidato seleccionado por el votante
    }

    //funcion para ver la cantidad de votos de un candidato como un dato publico al que puede acceder todo el mundo
    function getResult(uint _candidateid)public view returns(uint){
        return candidates[_candidateid].voteCount; //retornando la cantidad de votos de un candidato
    }
}