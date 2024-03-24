// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlashLoan {
    address public lender;
    uint256 public loanAmount;
    uint256 public fee;
    uint256 public fine;

    event LoanBorrowed(address borrower, uint256 amount);
    event LoanRepaid(address borrower, uint256 amount);
    event LoanDefaulted(address borrower, uint256 amount, uint256 penalty);

    constructor(uint256 _loanAmount, uint256 _fee, uint256 _fine) {
        lender = msg.sender;
        loanAmount = _loanAmount;
        fee = _fee;
        fine = _fine;
    }

    function borrow() external payable {
        require(msg.value == loanAmount, "Incorrect loan amount");
        
        // Emit event indicating loan has been borrowed
        emit LoanBorrowed(msg.sender, msg.value);
    }

    function repay() external {
        require(msg.sender == lender, "Only lender can repay the loan");
        
        // Calculate total amount to be repaid including fee
        uint256 totalAmount = loanAmount + fee;
        
        // Transfer borrowed amount plus fee to lender
        payable(lender).transfer(totalAmount);

        // Emit event indicating loan has been repaid
        emit LoanRepaid(msg.sender, totalAmount);
    }

    function defaultLoan() external {
        require(msg.sender != lender, "Lender cannot default the loan");

        // Deduct fine from borrower's balance
        //uint256 totalAmount = loanAmount + fee + fine;
        
        // Transfer fine amount to lender
        payable(lender).transfer(fine);

        // Emit event indicating loan default and penalty
        emit LoanDefaulted(msg.sender, loanAmount , fine);
    }
} 
