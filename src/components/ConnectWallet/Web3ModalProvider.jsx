const {  useAccount } = require("wagmi");

const Web3ModalProvider = async () => {
  // const _useWeb3ModalProvider = useWalletClient()
  // return _useWeb3ModalProvider.data;

  const _useAccount = useAccount();
  // exports.provider = async () => {
  const data = await _useAccount.connector?.getProvider();
  return data;
  // }
};
export default Web3ModalProvider;
