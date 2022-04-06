//certificate contract
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Certification {

    struct Certificate {
        uint ID;
        string photoHash;
        uint year;
        string title;
        string artist;
    }

    mapping(uint=>Certificate) certificateID;

    Certificate[] certificates;
    uint public counter;

    constructor() {
        counter = 0;
    }

    function createCertificate(string memory _photoHash, uint _year, string memory _title, string memory  _artist) public {
        
        Certificate memory newCertificate = Certificate({
            ID: counter,
            photoHash: _photoHash,
            year: _year,
            title: _title,
            artist: _artist
        });

        certificates.push(newCertificate);
        certificateID[counter] = newCertificate;

        counter++;
    }

    function returnCertificates() public view 
        returns (
            uint[] memory _ID,
            string[] memory _photoHash,
            uint[] memory _year,
            string[] memory _title,
            string[] memory _artist) {

        uint[] memory IDs = new uint[](counter);
        string[] memory hashes = new string[](counter);
        uint[] memory yearArr = new uint[](counter);
        string[] memory titles = new string[](counter);
        string[] memory artists = new string[](counter);

        for (uint i=0; i<counter; i++) {
            Certificate memory cert = certificateID[i];
            IDs[i] = cert.ID;
            hashes[i] = cert.photoHash;
            yearArr[i] = cert.year;
            titles[i] = cert.title;
            artists[i] = cert.artist;
        }

        return(IDs,hashes,yearArr,titles,artists);
    }
}