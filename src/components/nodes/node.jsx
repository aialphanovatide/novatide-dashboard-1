import React, { useState, useEffect } from 'react';
import axios from 'axios';

function convertBlockData(blockData) {
  
    const humanReadableData = {
        number: parseInt(blockData.number, 16), // Convert hexadecimal number to decimal
        hash: blockData.hash,
        parentHash: blockData.parentHash,
        nonce: blockData.nonce,
        sha3Uncles: blockData.sha3Uncles,
        logsBloom: blockData.logsBloom,
        transactionsRoot: blockData.transactionsRoot,
        stateRoot: blockData.stateRoot,
        receiptsRoot: blockData.receiptsRoot,
        miner: blockData.miner,
        difficulty: parseInt(blockData.difficulty, 16), // Convert hexadecimal number to decimal
        totalDifficulty: parseInt(blockData.totalDifficulty, 16), // Convert hexadecimal number to decimal
        extraData: blockData.extraData,
        size: parseInt(blockData.size, 16), // Convert hexadecimal number to decimal
        gasLimit: parseInt(blockData.gasLimit, 16), // Convert hexadecimal number to decimal
        gasUsed: parseInt(blockData.gasUsed, 16), // Convert hexadecimal number to decimal
        timestamp: parseInt(blockData.timestamp, 16), // Convert hexadecimal number to decimal
        transactions: blockData.transactions, // Array of transaction objects or hashes
        uncles: blockData.uncles // Array of uncle hashes
    };

    return humanReadableData;
}


export default function Node(){

    // const [node, setNode] = useState(null);
   
    // useEffect(() => {
    //     const getNodeData = async () => {
    //       try {
    //         const response = await axios.post(
    //           '',
    //           {
    //             jsonrpc: '2.0',
    //             method: 'eth_getBlockByNumber',
    //             params: ['latest', true],
    //             id: 1
    //           },
    //           {
    //             headers: {
    //               'Content-Type': 'application/json'
    //             }
    //           }
    //         );
    
    //         if (response.status === 200) {
    //           const data = response.data;
    //           const formatted_data = convertBlockData(data.result)
    //           setNode(formatted_data);
    //         }
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };
    
    //     getNodeData();
    //   }, []); 

    return (
        <div className='node-container'>
            <h1 className='nodes-title'>Nodes</h1>
            <div className='node-subcontainer'>
                <div className='node-item'>
                    <p>Taiko</p>
                </div>
            </div>
        </div>
    )
}