require('dotenv').config();
const ethers = require('ethers');
const cron = require('node-cron');

// Base chain RPC URL
const RPC_URL = process.env.BASE_RPC_URL;

// Your wallet private key
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Contract addresses
const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

// ABI for the router contract (simplified for this example)
const ROUTER_ABI = [
  "function swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline) payable returns (uint256[] amounts)"
];

// Connect to the Base chain
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Create contract instance
const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, wallet);

async function buyTokens() {
  try {
    const amountToBuy = ethers.utils.parseEther("0.1"); // Buy 0.1 ETH worth of tokens
    const path = [ethers.constants.AddressZero, TOKEN_ADDRESS]; // Path from ETH to the token
    const to = wallet.address;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

    const tx = await router.swapExactETHForTokens(
      0, // We don't care about the minimum amount out for this example
      path,
      to,
      deadline,
      { value: amountToBuy }
    );

    console.log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log('Transaction confirmed');
  } catch (error) {
    console.error('Error buying tokens:', error);
  }
}

// Schedule the bot to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running buy bot...');
  buyTokens();
});

console.log('Buy bot started. Will execute purchases every hour.');