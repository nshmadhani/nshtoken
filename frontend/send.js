App = {

    web3: null,
    contracts: {},
    account: "",
    tokensSold: 0,
    tokenPrice: 0,
    contractsInstance: {},
    tokensAvailable: 750000,
    transactions:[],

    init: function() {
        App.transactions = new Set()
        return App.initWeb3();
    },

    initWeb3: function() {
        return new Promise((res,rej) => {
            if (typeof web3 != 'undefined') {
                console.log("Using Wallet Provder")
                window.ethereum.enable().then(() => {
                    App.web3 = web3.currentProvider
                    web3 = new Web3(web3.currentProvider)
                    res("Waaa")
                });
            } else {
                App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
                web3 = new Web3(App.web3Provider);
                res()
            }
        }).then((a) => {
            console.log(a)
            return App.initContracts();
        })
    },

    initContracts: function() {

        return axios.get("DappToken.json")
                    .then((res) =>{
                        App.contracts.DappToken = TruffleContract(res.data);
                        App.contracts.DappToken.setProvider(App.web3);
                        return App.contracts.DappToken.deployed()
                    })
                    .then((dappTokenInstance) => {
                        App.contractsInstance.dappToken = dappTokenInstance;
                        console.log("Dapp Token  Address:", dappTokenInstance.address);
                        return axios.get("DappTokenSale.json")
                    })
                    .then((res) => {            
                        App.contracts.DappTokenSale = TruffleContract(res.data);
                        App.contracts.DappTokenSale.setProvider(App.web3);

                        return App.contracts.DappTokenSale.deployed()
                    })
                    .then((a) => {
                        return new Promise((res,rej) => {
                            web3.eth.getCoinbase(function(err, account) {
                                if(err === null) {
                                  App.account = account.       toUpperCase();
                                  $('#accountAddress').html("Your Account: " + account.       toUpperCase());
                                  res(a)
                                }
                            })
                        })
                    })
                    .then((dappTokenSale) => {
                        App.contractsInstance.dappTokenSale = dappTokenSale
                        console.log("Dapp Token Sale Address:", dappTokenSale.address);
                        App.listenForEvents()
                        return App.render();
                    })
    },

    listenForEvents: function() {

        web3Contract = new web3.eth.Contract(App.contracts.DappToken.abi,App.contracts.DappToken.address)

        web3Contract.events
          .Transfer({
            fromBlock: 0,
          },() => {})
          .on("data",(a) => {
            

            var _from = a.returnValues._from.       toUpperCase();
            var _to = a.returnValues._to.       toUpperCase();

            if(_from === App.account || _to === App.account) {
                App.transactions.add({
                    from:_from,
                    to: _to,
                    val:a.returnValues._amount,
                    txHash: a.transactionHash
                })
            }

            App.render()
          })
    },

    render: function() {
        
        
        var listGroup = $("#transactions")

        listGroup.html("")
        App.transactions.forEach((a) => {

            var str = `<li class="list-group-item">${a.from} ==> ${a.to} , ${a.val}</li>`

            listGroup.append(str)

        });
        


        
      

    },
    transfer: function() {
        var numberOfTokens = $('#numberOfTokens').val();
        var address = $('#addressInput').val();
        
        var dappToken = App.contractsInstance.dappToken;

        console.log(numberOfTokens,address)

        dappToken.transfer(address,numberOfTokens, {
            from: App.account,
            gas: 500000 // Gas limit
        }).then(function(result) {
          $('form').trigger('reset')
          App.render()
        });

      }























}

$(function() {
    $(window).load(function() {
      App.init();
    })
  });