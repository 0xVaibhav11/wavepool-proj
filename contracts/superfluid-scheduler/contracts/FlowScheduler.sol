// SPDX-License-Identifier: WTFPL
pragma solidity ^0.8.19;
import {ISuperfluid, ISuperToken, SuperAppDefinitions, IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import {SuperAppBaseFlow} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBaseFlow.sol";
import {IFlowScheduler} from "./interface/IFlowScheduler.sol";

/**
 * @title FlowScheduler contract
 * @author 0xVaibhav11
 */
contract FlowScheduler is IFlowScheduler, SuperAppBaseFlow {
    using SuperTokenV1Library for ISuperToken;

    /// @notice Admin Contract
    address public admin;

    /// @notice fDAIx token
    address public constant _token = 0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f;

    ISuperToken public token;

    mapping(bytes32 => FlowSchedule) public flowSchedules;

    constructor(address _admin) {
        token = ISuperToken(_token);
        admin = _admin;
    }

    /// @dev IFlowScheduler.createFlowSchedule implementation.
    function createFlowSchedule(
        ISuperToken superToken,
        address receiver,
        uint32 startDate,
        uint32 startMaxDelay,
        int96 flowRate,
        uint256 startAmount,
        uint32 endDate,
        bytes memory userData,
        bytes memory ctx
    ) external returns (bytes memory newCtx) {
        newCtx = ctx;
        address sender = _getSender(ctx);

        if (receiver == address(0) || receiver == sender)
            revert AccountInvalid();
        if (address(superToken) == address(0)) revert ZeroAddress();

        // if user don't want to open a stream, he should provide only endDate
        if (startDate == 0) {
            if (startMaxDelay != 0 || endDate == 0) revert TimeWindowInvalid();
        } else {
            // startDate != 0
            if (
                startDate <= block.timestamp ||
                (startDate >= endDate && endDate != 0)
            ) revert TimeWindowInvalid();
        }

        if ((endDate != 0 && endDate <= block.timestamp))
            revert TimeWindowInvalid();

        flowSchedules[
            keccak256(abi.encodePacked(superToken, sender, receiver))
        ] = FlowSchedule(
            startDate,
            startMaxDelay,
            endDate,
            flowRate,
            startAmount,
            userData.length != 0 ? keccak256(userData) : bytes32(0x0)
        );

        emit FlowScheduleCreated(
            superToken,
            sender,
            receiver,
            startDate,
            startMaxDelay,
            flowRate,
            endDate,
            startAmount,
            userData
        );
    }

    /// @dev deleteFlow
    function deleteFlowSchedule(
        ISuperToken superToken,
        address receiver,
        bytes memory ctx
    ) external returns (bytes memory newCtx) {
        newCtx = ctx;
        address sender = _getSender(ctx);

        delete flowSchedules[
            keccak256(abi.encodePacked(superToken, sender, receiver))
        ];
        emit FlowScheduleDeleted(superToken, sender, receiver);
    }

    /// @dev IFlowScheduler.getFlowSchedule implementation.
    function getFlowSchedule(
        address superToken,
        address sender,
        address receiver
    ) external view returns (FlowSchedule memory) {
        return
            flowSchedules[
                keccak256(abi.encodePacked(superToken, sender, receiver))
            ];
    }
}
