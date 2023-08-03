import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// import env from "react-dotenv";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    mainnet,sepolia,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

console.log("api key is ",import.meta.env.VITE_ALCHEMY_ID);

const { chains, publicClient } = configureChains(
  [mainnet,sepolia],
  [
    alchemyProvider({ apiKey: import.meta.VITE_ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My ERC20 INDEXER APP',
  projectId: '001',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    < WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
      <App />
      </RainbowKitProvider>
    </WagmiConfig>
   
  </React.StrictMode>,
)
