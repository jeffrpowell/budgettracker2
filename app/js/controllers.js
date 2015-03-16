'use strict';

/* Controllers */

angular.module('budgetTracker.controllers', ['firebase.utils', 'budgetTracker.services.utils'])

//<editor-fold defaultstate="collapsed" desc="Auth">

.controller('LoginCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
    $scope.email = null;
    $scope.pass = null;

    $scope.login = function() {
		var $submitBtn = jQuery('#loginSubmit')
		$submitBtn.button('loading');
		$scope.err = null;
		if (assertValidAccountProps()){
			Auth.$authWithPassword({
				email: $scope.email,
				password: $scope.pass
			}).then(function(authData) {
				$submitBtn.button('reset');
				$location.path('home');
			}).catch(function(error) {
				$submitBtn.button('reset');
				$scope.err = "Authentication failed: " + error;
			});
		}
		else{
			$submitBtn.button('reset');
		}
    };

    function assertValidAccountProps() {
      if( !$scope.email ) {
        $scope.err = 'Please enter an email address';
      }
      else if( !$scope.pass) {
        $scope.err = 'Please enter a password';
      }
      return !$scope.err;
    }

    function errMessage(err) {
      return angular.isObject(err) && err.code? err.code : err + '';
    }
  }])
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Home">
.controller('NavCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth){
	$scope.goHome = function(){
		$location.path('home');
	};
	$scope.authData = Auth.$getAuth();
	Auth.$onAuth(function(authData){
		$scope.authData = !!authData;
	});
	$scope.logout = function(){
		$location.path('login');
		Auth.$unauth();
	};
}])

.controller('HomeCtrl', 
['$scope', 'Category', 'ModelInstances',
	function($scope, Category, ModelInstances) {
		$scope.categories = {};
		Category.bank().$loaded(function(banks){
			$scope.categories.bank = banks;
			for (var cat in banks) {
				if (banks.hasOwnProperty(cat) && banks[cat].accounts){
					//We're counting on there being only 1 bank category
					$scope.bankcatid = $scope.categories.bank[cat].$id;
					for (var acct in banks[cat].accounts){
						if (banks[cat].accounts.hasOwnProperty(acct)){
							ModelInstances.getAccount(acct).$loaded(function(loadedAcct){
								if (!loadedAcct.hasOwnProperty("parent_account")){
									//The '0' index here is a hack because we're only
									//expecting 1 bank category in the app. The reason
									//why I don't use 'cat' to index is because the parent
									//function async. looped through each property from
									//line 44 before hitting this line
									$scope.categories.bank[0].accounts[loadedAcct.$id] = loadedAcct;
								}
								else{
									delete $scope.categories.bank[0].accounts[loadedAcct.$id];
								}
							});
							//$scope.categories.bank[cat].accounts[acct] = Account.query(acct);
						}
					}
				}
			}
		});
		Category.income().$loaded(function(incomes){
			$scope.categories.income = incomes;
			for (var cat in incomes) {
				if (incomes.hasOwnProperty(cat) && incomes[cat].accounts){
					for (var acct in incomes[cat].accounts){
						if (incomes[cat].accounts.hasOwnProperty(acct)){
							/*Account.load(acct, function(loadedAcct){
								$scope.categories.income.cat.accounts.acct = loadedAcct;
							});*/
							$scope.categories.income[cat].accounts[acct] = ModelInstances.getAccount(acct);
						}
					}
				}
			}
		});
		Category.expense().$loaded(function(expenses){
			$scope.categories.expense = expenses;
			for (var cat in expenses) {
				if (expenses.hasOwnProperty(cat) && expenses[cat].accounts){
					for (var acct in expenses[cat].accounts){
						if (expenses[cat].accounts.hasOwnProperty(acct)){
							/*Account.load(acct, function(loadedAcct){
								$scope.categories.income.cat.accounts.acct = loadedAcct;
							});*/
							$scope.categories.expense[cat].accounts[acct] = ModelInstances.getAccount(acct);
						}
					}
				}
			}
		});
		$scope.updateBackingTransactions = function(newDate){
			console.log("TODO: update backing transactions for "+newDate);
		};
	}])
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Category">
.controller('CategoryDetailCtrl',['$scope', '$routeParams', 'ModelInstances', 'ServiceUtils', '$location', 
	function($scope, $routeParams, ModelInstances, ServiceUtils, $location){
		if ($routeParams.type === "income" || $routeParams.type === "expense" || $routeParams.type === "bank"){
			if ($routeParams.cid === null || !$routeParams.cid){
				$scope.category = {
					'name': ''
				};
				$scope.add_mode = true;
				$scope.category.type = $routeParams.type;
			}
			else{
				$scope.category = ModelInstances.getCategory($routeParams.cid);
				ModelInstances.getCategory($routeParams.cid).$bindTo($scope, 'category');
				$scope.add_mode = false;
				$scope.cid = $routeParams.cid;
			}
		}
		else{
			$location.path('home');
		}
		
		$scope.saveCategory = function(){
			if ($scope.category){
				//TODO: validation framework
				if ($scope.add_mode){
					ModelInstances.categoryList.$add($scope.category);
				}
				else{
					$scope.category.$save();
				}
				$location.path('home');
			}
		};
		
		$scope.deleteCategory = function(){
			ServiceUtils.deleteCategory($scope.cid);
		};
	}])
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Account">
.controller('AddAccountCtrl',['$scope', '$routeParams', 'Account', 'ModelInstances', '$location', 
	function($scope, $routeParams, Account, ModelInstances, $location){
		//$routeParams.aid != null -> adding sub-account
		if (!$routeParams.cid){
			$location.path('home');
		}
		else{
			ModelInstances.getCategory($routeParams.cid).$loaded(function(cat){
				$scope.category = {
					"$id": $routeParams.cid,
					"name": cat.name
				};
			});
			
			$scope.account = {
				"name": '',
				"balance": 0.00,
				"category": $routeParams.cid, 
				"category_type": $routeParams.type,
				"goal_account": false
			};
			
			if ($routeParams.aid && $routeParams.type === "bank"){
				$scope.subAccount = true;
				$scope.account.parent_account = $routeParams.aid;
				$scope.parentAccount = Account.query($routeParams.aid);
			}
			else{
				$scope.subAccount = false;
			}
			
			$scope.saveAccount = function(){
				if ($scope.account){
					//TODO: validation framework
					/*ModelInstances.accountList.$add($scope.account).then(function(ref){
						ModelInstances.getCategory($routeParams.cid).$addAccount(ref.key()).then(function(innerRef){
							$location.path('home');
						});
					});*/
					ModelInstances.accountList.$add($scope.account).then(function(ref){
						$location.path('home');
					});
				}
			};
		}
	}])

.controller('EditAccountCtrl',['$scope', '$routeParams', 'Account', 'Category', 'ServiceUtils', 'ModelInstances', 
	function($scope, $routeParams, Account, Category, ServiceUtils, ModelInstances){
		$scope.aid = $routeParams.aid;
		var $account = ModelInstances.accountList.$getAccount($routeParams.aid);
		$scope.account = $account;
		$account.$bindTo($scope, 'account').then(function(){
			ModelInstances.categoryList.$loaded(function(cats){
				$scope.categories = cats;
				$scope.originalCategory = $scope.account.category;
			});
		});
		$account.$loaded(function(acct){
			if (acct.hasOwnProperty("parent_account")){
				$account.$getParentAccount().$loaded(function(parentAcct){
					$scope.parentAccount = parentAcct;
				});
			}
		});
		$scope.changeCategory = function(){
			for (var cat in $scope.categories){
				var catObj = $scope.categories[cat];
				if (catObj.hasOwnProperty("$id") && catObj.$id === $scope.account.category){
					$scope.account.category_type = catObj.type;
					break;
				}
			}
			Category.removeAcct($scope.originalCategory, $scope.account.$id).then(function(ref){
				Category.addAcct($scope.account.category, $scope.account.$id).then(function(innerRef){
					$scope.originalCategory = $scope.account.category;
				});
			});
		};
		$scope.deleteAccount = function(){
			ServiceUtils.deleteAccount($scope.account.category, $scope.aid);
		};
	}])

.controller('AccountCtrl',['$scope', '$routeParams', 'Account', 'Category', 'ServiceUtils', 
	function($scope, $routeParams, Account, Category, ServiceUtils){
		$scope.account = Account.query($routeParams.aid);
		Account.query($routeParams.aid).$bindTo($scope, 'account');
		$scope.balance = 0;
		$scope.updateBackingTransactions = function(newDate){
			ServiceUtils.getTransactionsByMonthYear(newDate, $routeParams.aid).$loaded(function(ref){
				$scope.transactions = [];
				$scope.monthBalance = 0;
				for (var key in ref) {
					var transaction = ref[key];
					if (transaction.hasOwnProperty("$id")){
						var accountId, accountName, deposit, withdrawal;
						if (transaction.from_account === $routeParams.aid){
							accountId = transaction.to_account;
							accountName = transaction.to_account_name;
							withdrawal = "$" + transaction.amount;
							deposit = "";
							$scope.monthBalance -= transaction.amount;
						}
						else{
							accountId = transaction.from_account;
							accountName = transaction.from_account_name;
							withdrawal = "";
							deposit = "$" + transaction.amount;
							$scope.monthBalance += transaction.amount;
						}
						$scope.transactions.push({
							id: transaction.$id,
							accountid: accountId,
							date: transaction.timestamp,
							account: accountName,
							deposit: deposit,
							withdrawal: withdrawal,
							memo: transaction.memo
						});
					}
				}
			});
		};
		
		Account.load($routeParams.aid, function(acct){
			Category.load(acct.category, function(cat){
				$scope.category = cat;
				if ($scope.category.type === 'bank' && (!$scope.account.hasOwnProperty("parent_account") || $scope.account.parent_account === '')){
					$scope.canAddSub = true;
					$scope.subaccounts = {};
					Account.all.$loaded(function(ref){
						for (var key in ref) {
							var acct = ref[key];
							if (acct.hasOwnProperty("parent_account") && acct.parent_account === $routeParams.aid){
								$scope.subaccounts[acct.$id] = acct;
							}
						}
						$scope.showSubAccounts = Object.keys($scope.subaccounts).length > 0;
					});
				}
				else{
					$scope.canAddSub = false;
				}
			});
		});
	}])
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Transaction">
.controller('AddTransactionCtrl',['$scope', '$routeParams', 'ModelInstances', 'Account', 'FilterDate', '$location', 
	
	function($scope, $routeParams, ModelInstances, Account, FilterDate, $location){
		if (!$routeParams.aid){
			$location.path('home');
		}
		else{
			
			//Load up defaults
			
			var today = new Date();
			var filterDate = FilterDate.date;
			filterDate.setDate(1);
			if (today.getFullYear() === filterDate.getFullYear() &&
				today.getMonth() === filterDate.getMonth() ){
				filterDate = today;
			}
			$scope.transaction = {
				'timestamp': filterDate.getTime(),
				'amount': 0,
				'projection': false, 
				'memo': ''
			};
			
			//Determine if we display for an income or an expense account
			
			var expenseStrings = ['Purchase under', 'From', 'Charged'];
			var incomeStrings = ['Deposit from', 'Deposit into', 'Deposited'];
			ModelInstances.getAccount($routeParams.aid).$loaded(function(acct){
				$scope.account = acct;
				if ($scope.account.category_type === 'income'){
					$scope.outputStrings = incomeStrings;
					$scope.selectedAcctIsToAcct = false;
					$scope.transaction.from_account = $routeParams.aid;
					$scope.transaction.from_account_name = acct.name;
				}
				else{
					$scope.outputStrings = expenseStrings;
					$scope.selectedAcctIsToAcct = true;
					$scope.transaction.to_account = $routeParams.aid;
					$scope.transaction.to_account_name = acct.name;
				}
				Account.bank().$loaded(function(accts){
					$scope.bankAccounts = accts;
					var acctObj = findBankAccountObj("Checking Account");
					if ($scope.selectedAcctIsToAcct){
						$scope.transaction.from_account = acctObj.$id;
						$scope.transaction.from_account_name = acctObj.name;
					}
					else{
						$scope.transaction.to_account = acctObj.$id;
						$scope.transaction.to_account_name = acctObj.name;
					}
					$scope.targetAccount = acctObj.$id;
				});
			});
			
			var findBankAccountObj = function(idOrName){
				for (var acct in $scope.bankAccounts){
					var acctObj = $scope.bankAccounts[acct];
					if (acctObj.name === idOrName || acctObj.$id === idOrName){
						return acctObj;
					}
				}
			}
			
			$scope.saveTransaction = function(){
				if ($scope.transaction){
					//TODO: validation framework
					var acctObj = findBankAccountObj($scope.targetAccount);
					if ($scope.selectedAcctIsToAcct){
						$scope.transaction.from_account = $scope.targetAccount;
						$scope.transaction.from_account_name = acctObj.name;
					}
					else{
						$scope.transaction.to_account = $scope.targetAccount;
						$scope.transaction.to_account_name = acctObj.name;
					}
					var dateTime = new Date($scope.transaction.timestamp);
					//Flush out time bits
					$scope.transaction.timestamp = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDay()).getTime();
					ModelInstances.transactionList.$add($scope.transaction);
					$location.path('home');
				}
			};
		}
	}]);
//</editor-fold>