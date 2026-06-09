import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

// Mock ABI for a HealthRecord Smart Contract
const ABI = [
  "function verifyRecord(string mvid, string recordHash) public view returns (bool)"
];

export async function POST(req: Request) {
  try {
    const { mvid, complaint, diagnosis } = await req.json();

    if (!mvid || !complaint) {
      return NextResponse.json({ error: 'Missing data to hash' }, { status: 400 });
    }

    // Generate SHA-256 Hash of the clinical data
    const dataString = JSON.stringify({ mvid, complaint, diagnosis, timestamp: new Date().toISOString() });
    const hash = ethers.keccak256(ethers.toUtf8Bytes(dataString));

    // Simulate pushing to an Ethereum Testnet
    const mockTxHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');

    return NextResponse.json({ 
      success: true, 
      hash: hash,
      txHash: mockTxHash,
      message: 'Cryptographically hashed and simulated publish to Polygon Sepolia.'
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
