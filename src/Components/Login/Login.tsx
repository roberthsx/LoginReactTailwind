import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ValidateLogin from '../Utils/validationForm';

import './Login.css';

async function loginUser(credentials:any) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data =>data.json() )
 }

export default function Login({setToken}:{setToken:any}) {

  const [email, setUserName] = React.useState<string | undefined>();
  const [password, setPassword] = React.useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageSenha, setErrorMessageSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    let messagesErros = ValidateLogin({email,password})
    if(messagesErros !== undefined){
      if(messagesErros.email.length >=1)
        setErrorMessageEmail(messagesErros.email);
      if(messagesErros.senha.length >=1)
        setErrorMessageSenha(messagesErros.senha);
      setLoading(false);
      return;
    }

    try {
      // Sign In logic using signInEmail and signInPassword state
        const token = await loginUser({
          username: email,
          password
        });
        if(token)
          setToken(token);
        else
        setErrorMessage('Erro ao realizar login');
        
    } catch (err) {
      // Remediation logic
      setErrorMessage('Houve problemas se comunicar com server');
      setLoading(false);
    }    
  }

  return(
    <div className="login-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"/>
        </label>
        { 
          errorMessageEmail.length > 0 &&
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errorMessageEmail}</span>
          </div>
        }
        <label>
          <p>Senha</p>
          <input type="password" onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"/>
        </label>
        { 
          errorMessageSenha.length > 0 &&
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errorMessageSenha}</span>
          </div>
        }
        <div>
          <button type="submit" disabled={loading} 
          className={`
            bg-white mt-6 border rounded-xl border-gray-300 p-2 hover:bg-purple-500 hover:text-white
            ${
              loading ? "bg-purple-500 text-white animate-pulse" : ""
            }
          `}>Submit</button>
        </div>

        { 
          errorMessage.length > 0 &&
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        }
        
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}