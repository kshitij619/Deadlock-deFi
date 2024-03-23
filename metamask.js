// Function to handle MetaMask connection
async function connectMetaMask() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        // Request account access
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            alert('MetaMask connected successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to connect MetaMask. Please check if MetaMask is installed and unlocked.');
        }
    } else {
        alert('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
}

// Add event listener to connect button
document.getElementById('connectButton').addEventListener('click', connectMetaMask);