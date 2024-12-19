"use client";
import { lineaSepolia} from 'wagmi/chains'
import { defineChain} from 'viem'
import { createConfig,http } from 'wagmi';

export const Ganache = defineChain({
  id: 1337,
  name: 'Ganache',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:7545'],webSocket:['ws://127.0.0.1:7545'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
  sourceId:1337,
  testnet:true,
})


const chains = process.env.NODE_ENV === 'development'
  ? [Ganache, lineaSepolia] as const
  : [lineaSepolia] as const

  const transports = Object.fromEntries(
    chains.map((chain) => [chain.id, http()])
  ) as Record<number, ReturnType<typeof http>>

 export const config = createConfig({
  chains,
  transports
});