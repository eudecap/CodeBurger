import Sequelize, { Model } from 'sequelize';

class User extends Model {
     // SIM! a configuração do usuario!
    static init(sequelize){
        // static init(sequelize){ ESTOU CRIANDO UM INIT ESTÁTICO
        super.init({
            // super.init({ ESTOU HERDANDO UM INIT ESPECIFICO DENTRO DO MO MODEL COMO PRIMEIRO PARÂMETRO
            // POREM PRA FUNCIONAR ELE ESPERA UM SEGUNDO PARÂMETRO
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
        },{
            sequelize,
            // ESTE É O OBJETO COMO SEGUNDO PARÂMETRO
        })
    }
};

export default User