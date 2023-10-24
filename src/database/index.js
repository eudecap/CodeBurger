import Sequelize from 'sequelize'

import User from '../app/models/User'
import configDataBase from '../config/database'

const models = [
User
]

class Database{ // TODA VEZ QUE A CLASSE E INSTÂNCIADA ELE CHAMA O METODO CONSTRUCTOR
    constructor(){ // O METODO CONSTRUCTOR CHAMA O INIT
        this.init()
    }

    init(){ // AKI ESTA A "CONFIGURAÇÃO( configuração entre aspas )" DO INIT, E ACIMA ELE APENAS CHAMADO PELO METODO CONSTRUCTOR.
        this.connection = new Sequelize(configDataBase) // cria uma instância do Sequelize com as configurações fornecidas em "configDataBase".
        models.map((model) => model.init(this.connection)) // intera item por item, dentro do meu arrey do models ele vai cirar a conexão.
        // como ele vai fzr isso?
        // chamando metodo init e enviando AS CONEXÕES( this.connection ) como argumento.
        // o primeiro "model" refere-se aos usuarios do arrey, e o segundo refere-se à... clica ai pra tu ver( segura Ctrl e clica no "init" ).
    }
}

export default new Database()
