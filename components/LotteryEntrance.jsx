import React, { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";
import { Web3Provider } from "@ethersproject/providers";

// Have a function to enter the lottery
export default function LotteryEntrance() {
    const [entranceFee, setEntranceFee] = useState("0");
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [recentWinner, setRecentWinner] = useState("0");
    const { chainId: chainIdHex, isWeb3Enabled, web3 } = useMoralis();
    const [provider, setProvider] = useState(null); // Declare provider state
    // const provider = new Web3Provider(web3.provider); // Access the underlying provider
    // const ethersProvider = new ethers.providers.Web3Provider(web3.provider);

    const dispatch = useNotification();

    // console.log(parseInt(chainIdHex))
    const chainId = parseInt(chainIdHex);
    // const chainId = parseInt
    // const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
    const raffleAddress = "0xc9fDE6C879B8F9B521f72b5212e79dba68BecA9E"

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
        // provider: provider,
    });

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    });

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    });

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    });

    const updateUI = async () => {
        const entranceFeeFromCall = (
            await getEntranceFee({
                onError: (error) => console.log(error),
            })
        ).toString();
        const numberOfPlayersFromCall = (
            await getNumberOfPlayers({
                onError: (error) => console.log(error),
            })
        ).toString();
        const recentWinnerFromCall = await getRecentWinner({
            onError: (error) => console.log(error),
        });
        setNumberOfPlayers(numberOfPlayersFromCall);
        setRecentWinner(recentWinnerFromCall);
        setEntranceFee(entranceFeeFromCall);
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            // try to read raffle entrance fee function
            const web3Provider = new Web3Provider(web3.provider);
            // console.log(provider.connection.url);
            setProvider(web3Provider);
            updateUI();
        }
    }, [isWeb3Enabled]);

    const handleEnterRaffle = async () => {
        await enterRaffle({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error),
        });
        // if (filter) await updateUI();
    };

    // const filter = {
    //     address: raffleAddress,
    //     topics: [
    //         // the name of the event, parnetheses containing the data type of each event, no spaces
    //         ethers.utils.id("RaffleEnter(address)"),
    //     ],
    // }

    const handleSuccess = async function (tx) {
        await tx.wait(1);
        handleNewNotification(tx);
        updateUI();
    };

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete !!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        });
    };
    // add a spinner on loading and on fetching
    return (
        <div className="p-5">
            Hi from Lottery Entrance
            {raffleAddress ? (
                <div>
                    <button
                        disabled={isLoading || isFetching}
                        className="bg-indigo-500 hover:bg-indigo-700 px-3 py-3 text-white font-bold rounded ml-auto"
                        onClick={handleEnterRaffle}
                    >
                        {isLoading || isFetching ? (<div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>) : (<div>Enter Raffle</div>)}
                    </button>
                    <br></br>
                    Entrance Fee {ethers.utils.formatUnits(entranceFee, "ether")} ETH{" "}
                    <br />
                    Number of Players in Raffle : {numberOfPlayers}
                    <br />
                    Recent Winner : {recentWinner}
                    <br />
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    );
}
