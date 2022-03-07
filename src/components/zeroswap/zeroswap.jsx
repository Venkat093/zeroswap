import React, {  useEffect, useState } from "react";
import "../../App.css";
import { Col, Row, Button, Form, FormGroup } from "react-bootstrap";
import { AiFillFrown } from "react-icons/ai";
import Zerofooter from "./zeroswapfooter";
import logo from "./utils/logo.png"

const Zerobridze = () => {
    const [contract,setContract]=useState("1")
    const [contractName,setcontractName]=useState("BSC")
    const [contractSname,setcontractSname]=useState("BEP")
    const [amount,setAmount]=useState()
    useEffect(() => {
      if(contract === "1")
      {
      setcontractName("BSC")
      setcontractSname("BEP")
      }
      else if(contract=== "2")
      {
        setcontractSname("ERC")
        setcontractName("Polygon")
      }
      else if (contract==="3")
      {
        setcontractSname("ERC")
        setcontractName("Avalanche")
      }
     
  console.log(contract +""+ contractName)
     
    }, [contract]);

    return ( <div  className="main-body">
        <div className="main-header container bg ">
        <Row>
          <Col md={8} className="mt-4 ">
          <img className="logo " src={logo} alt="Bitgert"></img>
         
          </Col>
        
          <Col md={2} className="mr-4 mt-4" >
            <Button  className="cwallet btn grad-btn  mt-3 ml-5">
              <span className="h5">Connect Wallet</span>
            </Button>
          </Col>
        </Row>
      </div>
      <div>
      <div className="container   mt-5 ml-">
      <b className="h4"><span> BSC to Polygon Bridge</span></b>
        <div className="transfer-card mt-4 d-flex flex-column wallet-t ">
        <div className="row  ">
        <div className="col-md-7  mt-3 ml-5">
        <div className=" h5 text-muted my-3">Binance Mainnet</div>
        <div className=" h5 text-primary my-3"><span>ZEE ERC20 balance</span></div>
       {amount ?(<div className="h3 my-2 mb-3"><span>{amount}</span></div>) :(<div className="h3 my-2 mb-3"><span>0.000</span></div>)} 
        <div className="h6  text-primary"><span>show more</span></div>
        </div>
        
        <div className="col-md-3 mt-4 ml-5 "  >
        <div className=" h5 text-muted my-3">Polygon</div>
        
        
        <div className=" h5 text-primary my-3"><span>ZEE {contractSname}20 balance</span></div>
        {amount ?(<div className="h3 my-2 mb-3"><span>{amount}</span></div>) :(<div className="h3 my-2 mb-3"><span>0.000</span></div>)} 

        <div className="h6  text-primary"><span>show more</span></div> 
        </div>
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
        
      <div className="col-md-3 mt-4 mb-5 d-flex justify-content-center "><Button className="btn grad-btn "><span className="butsiz ">Transfer {"    -> "}</span></Button></div>
        </div>
        </div>
      </div>
      <div className="mt-5">
      <Zerofooter/>
      </div>
      </div>
      </div> );
}
 
export default Zerobridze;