
twitApp.controller('TwitAppController', ['$scope','ngDialog', function($scope, ngDialog) {
    $scope.addTweet = function(){
        $scope.twitPostValuehtml = '';
        $scope.NameEntered = '';
        ngDialog.open({ template: 'template/twitDialogTemplate.html',
            className: 'ngdialog-theme-default',
            scope: $scope
        });

    }
   

     var allTagsWithDups = [];
     var elemtntCount = {};

    
    function _intialize() {
        $scope.isDisabled = true;
        $scope.allTags = [];
        $scope.date = new Date();
        $scope.showHashCloud = "ng-hide";
        $scope.postsWithTags = {};
        $scope.posts =[];
    }

   _intialize();


    //Logic for posting 
    $scope.postTweet = function() {
        ngDialog.close();
        $scope.removeFilter();
        $scope.isDisabled = true;
        var taggs =  $scope.twitPostValuehtml.split('#');
        $scope.twitPostValue = '<p><span class = "postedDate">posted@'
        +$scope.date.toDateString()+' '+$scope.date.toLocaleTimeString()+
        '</span></br><b><span>'+ $scope.NameEntered + ':' +'</span></b>'+' ' 
        +$scope.twitPostValuehtml+'</p>';
        for(var i=0; i< taggs.length; i++) {

            if(i != 0) {
                var taggsList = taggs[i].split(' ');
                if($scope.tags) {
                    $scope.tags = $scope.tags + ' #' + taggsList[0];
                } else {
                    $scope.tags = '#' + taggsList[0];
                }
                $scope.twitPostValue = $scope.twitPostValue.replace('#' + taggsList[0],'<a  ng-click="showTaggedElement($event)" id="'+taggsList[0]+'" href="#">#' + taggsList[0]+'</a>');
               
                allTagsWithDups.push('#' + taggsList[0]);
                var countElement = _getCountOfElements(allTagsWithDups);
                elemtntCount = {};
                for(var j = 0; j < countElement[0].length; j++) {
                    elemtntCount[eval('"'+countElement[1][j]+'_'+countElement[0][j]+'"')] = countElement[0][j];
                }
                elemtntCount = _sortObject(elemtntCount);
                $scope.allTags = countElement[0];

            }

        }
        $scope.tagsHighestCount = [];
        var i = 0;
        //show only 5 hash clouds which are maximum used in the post
        for(var element in elemtntCount) {
            if(i < 5) {
                $scope.tagsHighestCount.unshift('<a  ng-click="showTaggedElement($event)" id="' + elemtntCount[element] + '" href="#">' + elemtntCount[element] + '</a>');
            }
            i++;
        }
        //we we not show the hash cloud div when we do not have any hash tag style
        if(i > 0) {
            $scope.showHashCloud = "ng-show";
        } else {
            $scope.showHashCloud = "ng-hide";
        }
        $scope.postsWithTags.tags = $scope.tags;
        $scope.postsWithTags.twitPostValue = $scope.twitPostValue;
        $scope.posts.unshift($scope.postsWithTags);
        $scope.tags = '';
        $scope.postsWithTags = {};
      
    }
    

    //if the length of the post is greater than 0 and less than 141,then the button is enabled else disabled
    $scope.postHandle = function() {
        if($scope.twitPostValuehtml.length > 0 && $scope.twitPostValuehtml.length < 141 && $scope.NameEntered.length > 0) {
            $scope.isDisabled = false;
        } else {
            $scope.isDisabled = true;
        }
    }

    //this function is called when you try to click on any #link,so the post you see contains #link
    $scope.showTaggedElement = function(element) {
        $scope.searchText = null;
        $scope.hashTag = element.target.attributes.id.value;

    }

    //this function is called to show all the tweets/post
    $scope.removeFilter = function(element) {
        $scope.hashTag = '';
        $scope.searchText = null;
    }


    $scope.$watch('searchText',function(){

        if($scope.searchText != '' && $scope.searchText){
            $scope.hashTag = '';
        }
    })

    //return array of array 
    //array[0] = array of elements of #tag
    //array[1] = array of occurence of #tag
    function _getCountOfElements(arr) {
        var a = [], b = [], prev;

        arr.sort();
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = arr[i];
        }

        return [a, b];
    }

     //This function is used for sorting of object on keys
    function _sortObject(myObj) {
        var keys = Object.keys(myObj);
        var i;
        var len = keys.length;
        var sortedObject = {};
        keys.sort();

        for (i = 0; i < len; i++)
        {
            var k = keys[i];
            sortedObject[k] = myObj[k];
        }
        return sortedObject;
    }
}]);

