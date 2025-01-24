// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTicket is ERC721URIStorage, Ownable {
    uint256 public ticketCounter;
    uint256 public totalTicketsMinted;
    address public platformWallet;

    struct Event {
        string name;
        string date;
        string location;
        uint256 price;
        uint256 maxTickets;
        uint256 ticketsSold;
        address organizer;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => uint256) public ticketToEvent;
    mapping(address => bool) public approvedOrganizers;

    event EventCreated(uint256 eventId, string name, string date, string location, uint256 price, uint256 maxTickets, address organizer);
    event TicketMinted(uint256 ticketId, address owner, uint256 eventId);

    constructor(address initialOwner) ERC721("NFTicket", "NFTKT") Ownable(initialOwner) {
        ticketCounter = 0;
        totalTicketsMinted = 0;
        platformWallet = msg.sender;
    }

    function updatePlatformWallet(address newPlatformWallet) public onlyOwner {
        require(newPlatformWallet != address(0), "Invalid wallet address");
        platformWallet = newPlatformWallet;
    }

    modifier onlyOrganizer() {
        require(approvedOrganizers[msg.sender], "Not an approved organizer");
        _;
    }

    function isOrganizer(address organizer) public view returns (bool) {
        return approvedOrganizers[organizer];
    }

    function addOrganizer(address organizer) public onlyOwner {
        approvedOrganizers[organizer] = true;
    }

    function removeOrganizer(address organizer) public onlyOwner {
        approvedOrganizers[organizer] = false;
    }

    function createEvent(
        string memory name,
        string memory date,
        string memory location,
        uint256 price,
        uint256 maxTickets
    ) public onlyOrganizer {
        uint256 eventId = ticketCounter;
        events[eventId] = Event(name, date, location, price, maxTickets, 0, msg.sender);
        ticketCounter++;

        emit EventCreated(eventId, name, date, location, price, maxTickets, msg.sender);
    }

    function mintTicket(uint256 eventId, string memory tokenURI) public payable {
        require(eventId < ticketCounter, "Event does not exist");
        Event storage eventDetail = events[eventId];
        require(eventDetail.ticketsSold < eventDetail.maxTickets, "All tickets sold");
        require(msg.value >= eventDetail.price, "Insufficient payment");

        uint256 ticketId = totalTicketsMinted + 1;
        totalTicketsMinted++;

        // Calculate platform fee and organizer share
        uint256 fee = (msg.value * 1/10) / 100;
        uint256 organizerShare = msg.value - fee;
        // Pay platform fee and send rest to organizer
        payable(platformWallet).transfer(fee);
        payable(eventDetail.organizer).transfer(organizerShare);

        _safeMint(msg.sender, ticketId);
        _setTokenURI(ticketId, tokenURI);

        ticketToEvent[ticketId] = eventId;
        eventDetail.ticketsSold++;

        emit TicketMinted(ticketId, msg.sender, eventId);
    }

    function getEventDetails(uint256 eventId) public view returns (Event memory) {
        require(eventId < ticketCounter, "Event does not exist");
        return events[eventId];
    }
}
