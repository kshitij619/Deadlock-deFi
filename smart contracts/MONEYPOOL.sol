// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MoneyPool {
    struct Deposit {
        address depositor;
        uint256 amount;
        uint256 lockPeriod;
        uint256 depositTime;
    }

    mapping(address => Deposit) public deposits;

    event DepositMade(address indexed depositor, uint256 amount, uint256 lockPeriod);
    event Withdrawal(address indexed depositor, uint256 amount);

    function deposit(uint256 lockPeriod) external payable {
        require(lockPeriod > 0, "Lock period must be greater than zero");
        require(msg.value > 0, "Deposit amount must be greater than zero");

        // Ensure that the sender does not have an existing deposit
        require(deposits[msg.sender].amount == 0, "You already have an active deposit");

        deposits[msg.sender] = Deposit({
            depositor: msg.sender,
            amount: msg.value,
            lockPeriod: lockPeriod,
            depositTime: block.timestamp
        });

        emit DepositMade(msg.sender, msg.value, lockPeriod);
    }

    function withdraw() external {
        Deposit storage userDeposit = deposits[msg.sender];
        require(userDeposit.amount > 0, "No active deposit found");

        require(block.timestamp >= userDeposit.depositTime + userDeposit.lockPeriod, "Lock period not expired yet");

        uint256 interest = calculateInterest(userDeposit.amount, userDeposit.lockPeriod);
        uint256 totalAmount = userDeposit.amount + interest;

        delete deposits[msg.sender];

        payable(msg.sender).transfer(totalAmount);

        emit Withdrawal(msg.sender, totalAmount);
    }

    function calculateInterest(uint256 principal, uint256 lockPeriod) internal pure returns (uint256) {
        // Simple interest calculation
        uint256 rate = 5; // 5% annual interest rate (for example)
        uint256 time = lockPeriod / (1 days); // Convert lockPeriod to days
        return (principal * rate * time) / (100 * 365);
    }

    // Fallback function to receive ether
    receive() external payable {}
}
