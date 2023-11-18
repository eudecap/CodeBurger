import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'
import { password } from '../../config/database'

export class User extends Model {
     // SIM! a configuração do usuario!
    static init(sequelize){
        // static init(sequelize){ ESTOU CRIANDO UM INIT ESTÁTICO
        super.init({
            // super.init({ ESTOU HERDANDO UM INIT ESPECIFICO DENTRO DO MO MODEL COMO PRIMEIRO PARÂMETRO
            // POREM PRA FUNCIONAR ELE ESPERA UM SEGUNDO PARÂMETRO
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL, // informações como "VIRTUAL" não são enviadas para o banco de dados, por isso... leia a baixo
            password_hash: Sequelize.STRING,    // subistituimos "password" por "password_hash" na hora de gravar no banco
            admin: Sequelize.BOOLEAN,
        },{
            sequelize,
            // ESTE É O OBJETO COMO SEGUNDO PARÂMETRO
        })

        this.addHook('beforeSave', async(user) => { 
            if(user.password){ // se "user.password" existir... executada a função abaixo
                user.password_hash = await bcrypt.hash(user.password, 10) // "user.password" a informação que quero criptografar
            }                                                             // , e "10" a intensidade de criptografia
        })
        // criada uma nova instancia this.addHook, addHook pode esperar varios parametros,
        // neste caso, usei o beforeSave (nome é auto-explicativo)
        // antes de salvar é criado uma função que pega a informação "password", criptografa, e..
        // salva no banco de dados como "password_hash" ja criptografada

    }
    checkPassword(password){
    return bcrypt.compare(password, this.password_hash)
}
}