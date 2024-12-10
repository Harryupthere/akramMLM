import { toast } from "react-toastify";

export function formatEpochToCustomDate(epochTime) {
  // Convert epoch time to milliseconds
  const date = new Date(epochTime * 1000);

  // Define months array for custom month format
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract components
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine AM/PM and adjust hours
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Format the final date string
  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
}

export function formatWalletAddress(address, firstChar, lastChar) {
  // Truncate the address to the first 4 characters then 3 time "." and then last 6 characters
  if (address.toString().length > firstChar + lastChar) {
    return `${address.slice(0, firstChar)}...${address.slice(-lastChar)}`;
  } else {
    return address;
  }
}

export function getWeb3ErrorMessage(errorMessage) {
  const regex = /"message": "execution reverted: (.*?)"/; // Regex to capture the part after 'execution reverted:'
  const match = errorMessage.toString().match(regex);

  if (match) {
    return match[1];
  } else {
    const regex = /"message": "(.*?)"/;
    const match = errorMessage.toString().match(regex);

    // Check for specific gas-related error
    if (match[1].includes("gas required exceeds allowance")) {
      return "Insufficient fund in your wallet";
    }

    if (match) {
      return match[1];
    } else {
      return null;
    }
  }
}

// Copy address to clipboard
export function copyToClipboard(data) {
  navigator.clipboard.writeText(data);
  toast.success("Copied to clipboard!");
}
