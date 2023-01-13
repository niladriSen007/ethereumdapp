import React, { useState } from 'react'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'
import detectEthereumProvider from '@metamask/detect-provider'
import { useEffect } from 'react'
import  Web3 from "web3"
import { loadContract } from './utils/load_contract'

const App = () => {

  const [account,setAccount] = useState(0)
  const [web3Api,setWeb3Api] = useState({
    provider:null,
    web3:null,
    contract:null,
  })

  useEffect(()=>{
    const loadProvider = async()=>{
      const provider = await detectEthereumProvider()
      const contract = await loadContract("Funder",provider)
      if(provider)
      {
        provider.request({method:"eth_requestAccounts"})
        setWeb3Api(prevWeb3Api=>{
          return {
            ...prevWeb3Api,
            provider,
            web3:new Web3(provider),
            contract,
          }
        })
      }
      else
      {
        console.error('Please install MetaMask!')
      }
    }
    loadProvider()
  },[])

  useEffect(()=>{
    const getAccount = async() =>{
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    web3Api.web3 && getAccount()
  })
  console.log(web3Api.web3)
  return (
    <div>
      <Navbar />
      <Hero account={account? account : "Not Connected"}/>
    </div>
  )
}

export default App