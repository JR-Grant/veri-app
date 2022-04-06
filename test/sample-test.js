const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Certification", () => {
  let Certification;
  let certificate;
  
  beforeEach(async () => {
    Certification = await ethers.getContractFactory("Certification");
    certification = await Certification.deploy();
    await certification.deployed();
  });

  it("Contract deploys successfully and runs constructor", async () => {
    expect((await certification.counter()).toString()).to.equal('0');
  });

  it("Should create a certificate and return", async () => {
    const setCertificate = await certification.createCertificate("hash","100","title","artist");

    // wait until the transaction is mined
    await setCertificate.wait();

    expect(await certification.returnCertificates()).to.have.lengthOf(5);
  });

  it("Should increment the counter after Certificate creation", async () => {
    const setCertificate = await certification.createCertificate("hash","100","title","artist");

    await setCertificate.wait();

    expect(await certification.counter()).to.equal('1');
  });

  it("Should return created certificate fields", async () => {
    const setCertificate = await certification.createCertificate("hash","100","title","artist");

    await setCertificate.wait();

    const obj = await certification.returnCertificates();

    expect((obj[0].toString())).to.equal('0');
    expect((obj[1].toString())).to.equal("hash");
    expect((obj[2].toString())).to.equal("100");
    expect((obj[3].toString())).to.equal("title");
    expect((obj[4].toString())).to.equal("artist");
  });

  it("Should return multiple certificates", async () => {
    const setCertificate = await certification.createCertificate("hash","100","title","artist");

    await setCertificate.wait();

    const setCertificate2 = await certification.createCertificate("hash2","200","title2","artist2");

    await setCertificate2.wait();

    const obj = await certification.returnCertificates();

    expect(obj[0].toString()).to.equal('0,1');
    expect(obj[1].toString()).to.equal("hash,hash2");
    expect(obj[2].toString()).to.equal("100,200");
    expect(obj[3].toString()).to.equal("title,title2");
    expect(obj[4].toString()).to.equal("artist,artist2");
  });

  it("Certificates should have incrementing IDs", async () => {
    const setCertificate = await certification.createCertificate("hash","100","title","artist");

    await setCertificate.wait();

    const setCertificate2 = await certification.createCertificate("hash2","200","title2","artist2");

    await setCertificate2.wait();

    const setCertificate3 = await certification.createCertificate("hash2","200","title2","artist2");

    await setCertificate3.wait();

    const obj = await certification.returnCertificates();

    expect(obj[0].toString()).to.equal('0,1,2');

  });
});
