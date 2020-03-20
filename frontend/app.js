App = {

    web3: null,
    contracts: {},
    account: "",
    tokensSold: 0,
    tokenPrice: 0,
    contractsInstance: {},
    tokensAvailable: 750000,

    init: function() {
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
                    .then((dappTokenSale) => {
                        App.contractsInstance.dappTokenSale = dappTokenSale
                        console.log("Dapp Token Sale Address:", dappTokenSale.address);
                        App.listenForEvents()
                        return App.render();
                    })
    },

    listenForEvents: function() {

        web3Contract = new web3.eth.Contract(App.contracts.DappTokenSale.abi,App.contracts.DappTokenSale.address)

        web3Contract.events
          .Sell({
            fromBlock: 0,
          },() => {})
          .on("data",(a) => {
            App.render()
          })
    },

    render: function() {
        
        var content = $("#content")
        var loader = $("#loader")
        var dappToken = App.contractsInstance.dappToken;
        var dappTokenSale = App.contractsInstance.dappTokenSale;

        loader.show()
        content.hide()

        web3.eth.getCoinbase(function(err, account) {
            if(err === null) {
              App.account = account.toUpperCase();
              $('#accountAddress').html("Your Account: " + account.toUpperCase());
            }
        })


        console.log(dappToken)
        console.log(dappTokenSale)
        dappTokenSale.tokenPrice()
            .then((price) => {
                App.tokenPrice = price;
                return dappTokenSale.tokenSold();
            })
            .then((tokenSold) => {
                App.tokensSold = tokenSold.toNumber();
                return dappToken.balanceOf(App.account)
            })
            .then((balance) => {
                $('.token-price').html(web3.utils.fromWei(App.tokenPrice, "ether"));
                $('.tokens-sold').html(App.tokensSold);
                $('.tokens-available').html(App.tokensAvailable);
                

                var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
                $('#progress').css('width', progressPercent + '%');
                $('.dapp-balance').html(balance.toNumber());

                loader.hide()
                content.show()

            })
        
      

    },
    buyTokens: function() {
        $('#content').hide();
        $('#loader').show();
        var numberOfTokens = $('#numberOfTokens').val();
        var dappTokenSale = App.contractsInstance.dappTokenSale;

        dappTokenSale.buy(numberOfTokens, {
            from: App.account,
            value: numberOfTokens * App.tokenPrice,
            gas: 500000 // Gas limit
        }).then(function(result) {
          console.log("Tokens bought...")
          $('form').trigger('reset')
        });
      }























}

$(function() {
    $(window).load(function() {
      App.init();
    })
  });