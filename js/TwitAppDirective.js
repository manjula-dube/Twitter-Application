twitApp.directive( 'compileData', function ( $compile ) {
    return {
        scope: true,
        link: function ( scope, element, attrs ) {

            var elmnt;

            attrs.$observe( 'template', function ( myTemplate ) {
                if ( angular.isDefined( myTemplate ) ) {
                    //we do compile so that it understands html 
                    // compile the provided template against the current scope
                    elmnt = $compile( myTemplate )( scope );

                    element.html(""); // dummy "clear"

                    element.append( elmnt );
                }
            });
        }
    };
});


