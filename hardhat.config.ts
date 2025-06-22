import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import * as dotenv from "dotenv";


dotenv.config();

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
if (!infuraApiKey) {
    throw new Error("Please set your INFURA_API_KEY in a .env file");
}

const chainIds = {
    bsc: 56,
    bscTestnet: 97,
    mainnet: 1,
    goerli: 5,
    polygon: 137,
    polygonMumbai: 80001,
    avalancheFujiTestnet: 43113,
    sepolia: 11155111,
    arbitrumOne: 42161,
};

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
    let jsonRpcUrl: string;
    switch (chain) {
        case "bsc":
            jsonRpcUrl = "https://bsc-dataseed1.binance.org";
            break;
        case "bscTestnet":
            jsonRpcUrl = "https://data-seed-prebsc-1-s3.binance.org:8545/";
            break;
        case "polygon":
            jsonRpcUrl = "https://rpc.ankr.com/polygon/0243472cd915c54b0589f39c216ae52398f6016de05764b6ba45f0ef59feb741";
            break;
        case "polygonMumbai":
            jsonRpcUrl = "https://matic-mumbai.chainstacklabs.com";
            break;
        case "avalancheFujiTestnet":
            jsonRpcUrl = "https://api.avax-test.network/ext/C/rpc";
            break;
        case "arbitrumOne":
            jsonRpcUrl="https://arbitrum.blockpi.network/v1/rpc/public";
            break;
        default:
            jsonRpcUrl = "https://" + chain + ".infura.io/v3/" + infuraApiKey;
    }
    return {
        accounts: [process.env.PRIVATE_KEY || ""],
        chainId: chainIds[chain],
        url: jsonRpcUrl,
    };
}

module.exports = {
    solidity: {
        version: "0.8.18",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            viaIR: true,
        },
    },
    docgen: {
        output: "docs",
        pages: "files",
    },
    paths: {
        sources: "./contracts",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    networks: {
        bsc: getChainConfig("bsc"),
        bscTestnet: getChainConfig("bscTestnet"),
        mainnet: getChainConfig("mainnet"),
        goerli: getChainConfig("goerli"),
        polygon: getChainConfig("polygon"),
        polygonMumbai: getChainConfig("polygonMumbai"),
        avalancheFujiTestnet:getChainConfig("avalancheFujiTestnet"),
        sepolia:getChainConfig("sepolia"),
        arbitrumOne:getChainConfig("arbitrumOne"),
    },

    etherscan: {
        apiKey: {
            bsc: process.env.BSCSCAN_API_KEY || "",
            bscTestnet: process.env.BSCSCAN_API_KEY || "",
            mainnet: process.env.ETHERSCAN_API_KEY || "",
            goerli: process.env.ETHERSCAN_API_KEY || "",
            polygon: process.env.POLYGONSCAN_API_KEY || "",
            polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
            avalancheFujiTestnet: process.env.AVAX_API_KEY || "",
            sepolia: process.env.ETHERSCAN_API_KEY || "",
            arbitrumOne:process.env.ARBIRSCAN_API_KEY || "",
        },
    },

    abiExporter: {
        path: "./build-info",
        pretty: false,
        except: ["@openzeppelin"],
    },
} as HardhatUserConfig;
