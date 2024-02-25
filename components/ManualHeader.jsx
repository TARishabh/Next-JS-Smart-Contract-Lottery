import React, {useEffect} from 'react';
import { useMoralis } from 'react-moralis'; 


export default function ManualHeader() {
  const {enableWeb3,account,isWeb3Enabled,Moralis,deactivateWeb3,isWeb3EnableLoading} = useMoralis();
  const handleConnectOnClick = async () =>{
    await enableWeb3();
    if (typeof window !== "undefined"){
      window.localStorage.setItem("connected","injected")
    }
  }


  useEffect(()=>{
    Moralis.onAccountChanged((account)=>{
      if (account === null){
        localStorage.removeItem("connected");
        deactivateWeb3();
      }
    })
  },[])

  useEffect(()=>{
    if(isWeb3Enabled) return 
    if (typeof window !== "undefined"){
      if (window.localStorage.getItem("connected")){
        enableWeb3();
    }
    }
  },[isWeb3Enabled])

// no dependency array, means run any time something re renders
// blank dependency array, means this will run once when component mounts (run on load initially)
// dependencies in the array, run anytime something in there changes (in that dependency array changes)


  return (
    <div>
      {account ? (<div>Connected to {account.slice(0,6)}....{account.slice(account.length-4)}</div>):(<button disabled={isWeb3EnableLoading} onClick={handleConnectOnClick}>Connect</button>)}
    </div>
  )
}
