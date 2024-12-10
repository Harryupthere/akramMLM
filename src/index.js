// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter as Router } from "react-router-dom";

// // https://w3m-v2-docs.walletconnect.com/2.0/web/web3modal/react/wagmi/installation
// import {
//   EthereumClient,
//   w3mConnectors,
//   w3mProvider,
// } from "@web3modal/ethereum";
// import { Web3Modal } from "@web3modal/react";
// import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { bscTestnet } from "wagmi/chains";

// const chains = [bscTestnet];
// const projectId = "6b098530af4797b4b0dcb37e0534845a";

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient,
// });
// const ethereumClient = new EthereumClient(wagmiConfig, chains);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Router>
//       <WagmiConfig config={wagmiConfig}>
//         <App />
//       </WagmiConfig>
//       <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
//     </Router>
//   </React.StrictMode>
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { polygon,bscTestnet,polygonAmoy } from 'wagmi/chains'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { http, createConfig, WagmiProvider } from 'wagmi';
import { walletConnect, injected, coinbaseWallet, metaMask } from 'wagmi/connectors'


const root = ReactDOM.createRoot(document.getElementById('root'));

const projectId = '6b098530af4797b4b0dcb37e0534845a';

const metadata = {
  name: 'Web3Modal',
  description: 'Mlm',
  url: 'http://localhost:3000', 
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const config = createConfig({
  // chains: [bscTestnet],
  // transports: {
  //   [bscTestnet.id]: http()
  // },

  chains: [polygon],
  transports: {
    [polygon.id]: http()
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0]
    }),
  ]
})


createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, 
  enableOnramp: true, 
  defaultChain: polygon,
 // defaultChain: bscTestnet,

})


root.render(
  <>
   <WagmiProvider config={config}>
              <App />
      </WagmiProvider>
          </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
