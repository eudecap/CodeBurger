import { User } from '../models/User'
import { v4 } from 'uuid'
import * as Yup from 'yup'

class userController {

    async store( request, response ){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean()
        })
        // essa parada aki(Yup) valida/cria regras pra estrutura de cada item do objeto taligado?
        // essa API(Yup) é mt boa por sinal

        try {
            await schema.validateSync(request.body, {abortEarly: false}) // abortEarly: true (se achar um erro ele para a aplicação)
        } catch(err){                                                    // coloquei false pois quero q retorne todos os erros e nao so um
            return response.status(400).json({error: err.errors}) // o erro fica em "errors" dentro do prompt
        }
        // retorna o erro de forma especifica no return response com o auxilio do try catch
        
        
        const { name, email, password, admin } = request.body

        const userExists = await User.findOne({ // procurando apenas um no banco de dados ( um oque? le o de baixo )
            where: { email } // um email
        })
        if(userExists){
            return response.status(400).json({error: "this email already exists"})
        }
        // se userExists for true, pois é...

        const user = await User.create({
            id: v4(),
            name: name,
            email: email,
            password: password,
            admin: admin
        })
        return response.json({message: `create user sucessfully`, user})
    }
}

export default new userController()
// store = cadastrar / adicionar
// index = listar varios
// show = listan apenas um
// update = atualizar
// delete = deletar