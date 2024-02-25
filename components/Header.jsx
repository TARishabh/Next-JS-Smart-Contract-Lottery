// import React from 'react'
import {ConnectButton} from "web3uikit";

export default function Header() {
  return (
    <div className="p-5 border-b-2 flex flex-row">
        <h1 className="py-5 px-5 font-blog text-3xl">Decentralized Lottery</h1>
        <div className="ml-auto py-2 px-3">
        <ConnectButton moralisAuth={false}/>
        </div>
    </div>
  )
}


// {"31337":["0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"]}

// const {ethers, network} = require("hardhat");
// const FRONT_END_ADDRESSES_FILE = "../nextjs-smart-lottery/constants/contractAddresses.json"
// const FRONT_END_ABI_FILE = "../nextjs-smart-lottery/constants/abi.json"
// const fs = require("fs")


// module.exports = async function (){
//     if (process.env.UPDATE_FRONT_END){
//         console.log("Updating Frontend")
//         updateContractAddresses()
//         updateAbi()
//     }
// }

// async function updateAbi(){
//     const raffle = await ethers.getContract("Raffle")
//     fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
// }

// async function updateContractAddresses() {
//     const chainId = network.config.chainId.toString();
//     const raffle = await ethers.getContract("Raffle")
//     const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE,"utf8"))
//     if (chainId in currentAddresses){
//         if (!currentAddresses[chainId].includes(raffle.address)){
//             currentAddresses[chainId].push(raffle.address);
//         }
//     }
//     {
//         currentAddresses[chainId] = [raffle.address];
//     }
//     fs.writeFileSync(FRONT_END_ADDRESSES_FILE,JSON.stringify(currentAddresses));
// }

// module.exports.tags = ["all","frontend"]