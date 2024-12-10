// import {

//   useWeb3Modal,
// } from "@web3modal/wagmi/react";
// import {

//   useDisconnect,
//   useWalletClient,

//   useConnect,
//   useChainId,
//   useAccount,
//   useConfig,
// } from "wagmi";

// import { useEffect } from "react";
// import Web3 from "web3";


// const Connectwallet = ({  show, onHide }) => {
//     console.log(show,onHide)
//     const _useWeb3Modal = useWeb3Modal()

    
//     const _useConnect = useConnect()
//     const _useChainId = useChainId()
//     const _useAccount = useAccount()
//     const _useWalletClient = useWalletClient()
//     const _useConfig = useConfig()
//     const _useDisconnect = useDisconnect()

 
    
//     useEffect(() => {
//         // getProvider()
//     }, [_useAccount])

//     const getProvider = async () => {
//         let aa = await _useAccount.connector?.getProvider()

//         if (aa) {
//             const web3 = new Web3(aa);
//             let pp = await web3.currentProvider.chainId;
            
//         }
//     }
    
//     useEffect(() => {
//         if (!_useWeb3Modal.isOpen) {
//             onHide()
//         }
//     }, [_useWeb3Modal])


// // asdf
//     useEffect(() => {
//         if (_useAccount.isConnected) {
           
//         } else {
           
//         }

//     }, [_useAccount])



//     useEffect(() => {
//         if (show) {
//             _useWeb3Modal.open()
//         }
//     }, [show])





//     return (
//         <>
//         </>
//     );
// }

// export default Connectwallet;