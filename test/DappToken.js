// var DappToken = artifacts.require("./DappToken.sol")

// contract('DappToken',function(accounts) {

//     var tokenInstance = null;

//     var admin = accounts[0]

//     it('sets the total supply upon development',() => {
//         return DappToken.deployed()
//                     .then((i) => {tokenInstance=i;return tokenInstance.totalSupply()})
//                     .then((totalSupply) => {
//                         assert.equal(totalSupply.toNumber(),1000000,"Total Supply")
//                         return tokenInstance.balanceOf(admin)
//                     })
//                     .then((adminBalance) => {
//                         assert.equal(adminBalance.toNumber(),1000000,"Admin Balance")
//                     })

//     })
//     it('Transfers Token Ownership',() => {
//         return DappToken.deployed()
//                     .then((i) => {
//                         tokenInstance=i;
//                         return tokenInstance.transfer.call(accounts[1],999999999);   //Calls
//                     })
//                     .then(assert.fail).catch((err)=> {
//                         assert(err.message.indexOf('revert')>=0,'Error Message must Contain revert')
//                         return tokenInstance.transfer(accounts[1],25000,{
//                             from:admin
//                         }) //TXs
//                     })
//                     .then((recpt) => {
//                         assert.equal(recpt.logs.length,1,"Triggers and Event")
//                         assert.equal(recpt.logs[0].event,'Transfer','Tranfer is Fired')
//                         assert.equal(recpt.logs[0].args._from,accounts[0],'From Account')
//                         assert.equal(recpt.logs[0].args._to,accounts[1],'To Account')
//                         assert.equal(recpt.logs[0].args._amount,25000,'Value Should be equal')    

//                         return tokenInstance.balanceOf(accounts[1])
//                     })
//                     .then((balance) => {
//                         assert.equal(balance.toNumber(),25000,"Fund SHould be transferreed")
//                     })
//                     .then((recpt) => {
//                         return tokenInstance.balanceOf(accounts[0])
//                     })
//                     .then((balance) => {
//                         assert.equal(balance.toNumber(),1000000 - 25000,"Fund SHould be Debited")
//                     })
                    

                 

//     })

//     it('Approval and Transfer Delegation' ,() => {
//         var ownerAcc = accounts[1];
//         var spenderAcc = accounts[2];
//         var receiverAcc  = accounts[3];

//         //Can Spend , Cant Spend
//         return DappToken
//                     .deployed()
//                     .then((i) => {tokenInstance=i;return tokenInstance.totalSupply()})
//                     .then(() => {
//                         return tokenInstance.approve(spenderAcc,2500,{from:ownerAcc});
//                     })
//                     .then((recpt) => {
//                         assert.equal(recpt.logs.length,1,"Triggers and Event")
//                         assert.equal(recpt.logs[0].event,'Approval','Approval is Fired')
//                         assert.equal(recpt.logs[0].args._owner,ownerAcc,'Owner Account')
//                         assert.equal(recpt.logs[0].args._spender,spenderAcc,'Spender Account')
//                         assert.equal(recpt.logs[0].args._amount,2500,'Value Should be equal')    
//                         return 
//                     })
//                     .then(() => {
//                         return tokenInstance.transferFrom(ownerAcc,receiverAcc,100,{from:spenderAcc})
//                     })
//                     .then(() => {
//                         return tokenInstance.balanceOf("0xe549e9105302893b7135198BcBba4C816FF58730")
//                     })
//                     .then((a) => {
//                         console.log(a.toNumber())
//                         return tokenInstance.balanceOf(admin)
//                     })
//                     .then((a) => {
//                         console.log(a.toNumber())
//                     })
//     })



// })