angular.module('budgetTracker.envelopes', [])
.controller('EnvelopeCtrl', ['$scope', 'Categories', 'Envelopes', 
	function($scope, Categories, Envelopes){
		$scope.categories = Categories.get();
		$scope.addCategory = false;
		$scope.addEnvelope = {};
		$scope.newCategory = undefined;
		$scope.newEnvelopes = {};
		
		$scope.createCategory = function(){
			$scope.addCategory = false;
			Categories.add($scope.newCategory);
			$scope.newCategory = "";
		};
		$scope.createEnvelope = function(categoryKey){
			$scope.addEnvelope[categoryKey] = false;
			Envelopes.add(categoryKey, $scope.newEnvelopes[categoryKey]);
			$scope.newEnvelopes[categoryKey] = "";
		};
		$scope.keyListener = function($event, categoryKey){
			if ($event.which === 13){
				if (categoryKey){
					$scope.createEnvelope(categoryKey);
				}
				else{
					$scope.createCategory();
				}
			}
		};
		
		$scope.assignCategory = function(category){
			$scope.envelopeToEdit = false;
			$scope.categoryToEdit = category;
		};
		$scope.updateCategory = function(){
			Categories.update($scope.categoryToEdit);
		};
		
		$scope.assignEnvelope = function(envelope){
			$scope.categoryToEdit = false;
			$scope.envelopeToEdit = envelope;
		};
}]);