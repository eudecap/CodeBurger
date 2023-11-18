import * as Yup from 'yup'
import { User } from '../models/User'

class sessionController{
    async store(request, response){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })
        if(!(await schema.isValid(request.body))){
            return response.status(401).json({message: "incorrect password or email"})
        }
        
        const {email, password} = request.body
        const user = await User.findOne({
            where: {email},
        })
        if(!(user)){
            return response.status(401).json({message: "incorrect password or email"})
        }

        if (!(await user.checkPassword(password))){
            return response.status(401).json({message: "incorrect password or email"})
    }

    if(user && await user.checkPassword(password)){
        console.log("login sucessfully")
    }
    
    return response.json({message: "login sucessfully"})
}}

export default new sessionController()