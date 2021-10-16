export default function ValidateLogin(login:any) {
    let message = {email:'',senha:''}

      if(login.email === undefined || (login.email !== undefined && login.email === ""))
        message.email = message.email.concat('Email necessário')
      if(login.email !== undefined && !(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(login.email)))
        message.email = message.email.concat('Email inválido')
      if( login.password === undefined || (login.email !== undefined && login.email === ""))
        message.senha = message.senha.concat('Senha necessário')
      
      return message;
}