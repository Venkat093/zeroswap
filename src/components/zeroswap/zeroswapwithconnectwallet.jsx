import React, { useEffect, useState } from "react";
import "../../App.css";
import { Col, Row, Button, Form, FormGroup } from "react-bootstrap";
import { AiFillFrown } from "react-icons/ai";
import Zerofooter from "./zeroswapfooter";
import { providers, ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from 'web3modal'
import Web3 from "web3";
import {bsc,bsctoken,bit,bittoken} from '../../Abi/address'
import ERC20 from '../../Abi/ERC20.json'
import fromExponential from 'from-exponential'
import nft from '../../Abi/nft.json'
import logo from "./utils/logo.png"
import { AiOutlineArrowRight,AiOutlineArrowLeft } from 'react-icons/ai'
let web3Modal;
let provider;
let selectedAccount;

function init() {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                // Mikko's test key - don't copy as your mileage may vary
                // infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
                rpc: {
                    56: "https://bsc-dataseed.binance.org/"
                },
                chainId: 56
            }
        },


    };

    web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
    });

    window.w3m = web3Modal;
}

async function fetchAccountData() {
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    selectedAccount = await signer.getAddress();
    console.log(selectedAccount);

    return selectedAccount;
}

async function refreshAccountData() {
    await fetchAccountData(provider);
}

async function onConnect() {
    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect({ cacheProvider: true });
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    provider.on("accountsChanged", (accounts) => {
        console.log('chainchan', accounts)
        fetchAccountData();
        // window.location.reload()
    });

    provider.on("chainChanged", (chainId) => {
        fetchAccountData();
        window.location.reload()
    });

    provider.on("networkChanged", (networkId) => {
        fetchAccountData();
    });
    window.location.reload()

    await refreshAccountData();
}



async function disconnet() {
    console.log("Opening a dialog", web3Modal);
    try {
        // provider = await web3Modal.connect();


        await web3Modal.clearCachedProvider();
        // await window.ethereum.disable()
        window.location.reload()
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }


}

const Zerobridzee = () => {
  const [acc, setacc] = useState()
  const  [webm3,setweb3m] = useState()
  const [provider1, setprovider1] = useState()
  const [tok,settok] = useState()
  const [add,setadd] = useState()
  const [amount, setAmount] = useState()
  const [chainid,setchainid] = useState()
  console.log('vvcc',{
    tok,add
  })

  useEffect(async () => {

    if (acc) {
      // const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // setaccountid(accounts1[0])
      provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      console.log('dddd', accounts)
      setweb3m(web3)
      setprovider1(provider)
      setAccount(accounts[0])


    }


  }, [acc]);

  const [account, setAccount] = useState();

  useEffect(() => {
    init();

    if (web3Modal.cachedProvider) {
      console.log('accaa', web3Modal.cachedProvider)
      console.log("connected");
      setacc(true)

    }
  }, []);

  useEffect(async () => {
    if (webm3 && acc && provider1) {
        const chainId = await provider1.request({ method: 'eth_chainId' });
        console.log('chain', chainId)
        await window.ethereum.on('chainChanged', (chainId) => {
          window.location.reload();
        });
        if(chainId==0xfc9c){
          settok(bittoken)
          setadd(bit)
        }
        if(chainId==0x61){
          settok(bsctoken)
          setadd(bsc)
        }

        setchainid(chainId)
    }

}, [webm3, acc, provider1,chainid])

  const [contract, setContract] = useState("1")
  const [contractName, setcontractName] = useState("BSC")
  const [contractSname, setcontractSname] = useState("BEP")
  const approve = async () => {
    if (webm3 && acc) {
        const accounts = await webm3.eth.getAccounts();
        //  console.log(accounts);
        let userwalletaddresss = accounts[0];
        // web3main = new Web3(web3main && acc);
        const ercContract = await new webm3.eth.Contract(ERC20, tok);
        let amountADesired = webm3.utils.toBN(fromExponential(parseInt((parseFloat(amount)) * Math.pow(10, 18))));
        ercContract.methods.approve(add, amountADesired).send({ from: userwalletaddresss })
            .then((result) => {
                console.log(result);
                swapv()
                //     false)
              
            }).catch()


    }
}
  useEffect(() => {
    if (contract === "1") {
      setcontractName("BSC")
      setcontractSname("BEP")
    }
    else if (contract === "2") {
      setcontractSname("ERC")
      setcontractName("Polygon")
    }
    else if (contract === "3") {
      setcontractSname("ERC")
      setcontractName("Avalanche")
    }

    console.log(contract + "" + contractName)

  }, [contract]);
  const swapv = async (e) =>
  {   
      if (webm3 && acc)
      {
        const accounts = await webm3.eth.getAccounts();
      //  console.log(accounts);
      let userwalletaddresss = accounts[0];
      let amountADesired = webm3.utils.toBN(fromExponential(parseInt((parseFloat(amount)) * Math.pow(10, 18))));
      let  swaping = new webm3.eth.Contract(nft,add)
      
      swaping.methods.swap(amountADesired).send({from:userwalletaddresss})
      .then((fees)=>
      {
            console.log(fees); 
      }).catch() 
      }
  }
  const [interchnage,setInterchange] =useState(false)

  return (<div className="main-body">
    <div className="main-header container bg ">
    <Row>
      <Col md={8} className="mt-4 ">
      <img className="logo " src={logo} alt="Bitgert"></img>
     
      </Col>
    
      <Col md={2} className="mr-4 mt-4" >
      {
        acc?<Button className="cwallet btn grad-btn  mt-3 ml-5"  onClick={disconnet}>
        <b>Disconnet Wallet</b>
      </Button>:
      <Button className="cwallet btn grad-btn  mt-3 ml-5"  onClick={onConnect}>
      <span className="h5">Connect Wallet</span>
    </Button>
      }
      
        
      </Col>
    </Row>
  </div>
  <div>
  <div className="container   mt-5 ml-">
  <b className="h4"><span> BSC to BRISE Bridge</span></b>
    <div className="transfer-card mt-4 d-flex flex-column wallet-t ">
    <div className="row  ">
    { interchnage === false ? (<div className="col-md-4  mt-3 ml-5">
    <div className=" h5 text-muted my-3">Binance </div>
    <div className=" h5 text-primary my-3"><span>Binance Native balance</span></div>
   {amount ?(<div className="h3 my-2 mb-3"><span>{amount}</span></div>) :(<div className="h3 my-2 mb-3"><span>0.000</span></div>)} 
    <div className="h6  text-primary"><span>show more</span></div>
    </div>):(<div className="col-md-4 mt-3 ml-5 "  >
    <div className=" h5 text-muted my-3">Bitgert</div>
    
    
    <div className=" h5 text-primary my-3"><span>Brise Native balance</span></div>
    {amount ?(<div className="h3 my-2 mb-3"><span>{amount}</span></div>) :(<div className="h3 my-2 mb-3"><span>0.000</span></div>)} 

    <div className="h6  text-primary"><span>show more</span></div> 
    </div>)}
    <div className="col-md-2 my-5 mx-5 d-flex  justify-content">{interchnage === false ? (<div><button className="mid-btn" onClick={()=>{setInterchange(true)}}><AiOutlineArrowLeft size={30} className="arr"/> </button> </div>) :(<div><button className="mid-btn" onClick={()=>{setInterchange(false)}}><AiOutlineArrowRight   size={30} className="arr"/> </button> </div>) }   </div>
    {interchnage === false ? ( <div className="col-md-2 mt-3 ml-5 mb-3"  >
    <div className=" h5 text-muted my-3">Bitgert</div>
    
    
    <div className=" h5 text-primary my-3"><span>Brise Native balance</span></div>
    {amount ?(<div className="h3 my-2 mb-3"><span>{amount}</span></div>) :(<div className="h3 my-2 mb-3"><span>0.000</span></div>)} 

    <div className="h6  text-primary"><span>show more</span></div> 
    </div>) :(<div className="col-md-2  mt-3 ml-5 mb-3">
    <div className=" h5 text-muted my-3">Binance </div>
    <div className=" h5 text-primary my-3"><span>Binance Native balance</span></div>
   {amount ?(<div className="h3 my-2 mb-3"><span>{amount}</span></div>) :(<div className="h3 my-2 mb-3"><span>0.000</span></div>)} 
    <div className="h6  text-primary"><span>show more</span></div>
    </div>)}
   
    </div>
    </div>
    <div className="container transfer-card my-5 ">
    <div className="row  ">
    <div className="col-md-7 mt-3"> <span className="h3 text-muted ml-3">Transfer Amount</span></div>
    <div className="col-md-3 mt-3" > <span className="h3 text-primary ml-3">Max</span></div>
    </div>
    <div className="row ">
    <div className="col-md-7">
    <div className="fieldd mt-3 ">
    <span className="fa fa-user"></span>
    <input
      type="text"
      onChange={(e) => {
        setAmount(e.target.value);
      }}
    />
    {amount ? (<div></div>):(<label>Enter Amount To Be Transfer</label>)}
  </div>
    </div>
    
  <div className="col-md-3 mt-4 mb-5 d-flex justify-content-center "><Button className="btn grad-btn " onClick={approve}  ><span className="butsiz ">Transfer {"    -> "}</span></Button></div>
    </div>
    </div>
  </div>
  <div className="mt-5">
  <Zerofooter/>
  </div>
  </div>
  </div> );
}

export default Zerobridzee;