var metro_colors = [
    'black', 'white', 'lime', 'green', 'emerald', 'teal', 'blue', 'cyan', 'cobalt', 'indigo', 'violet',
    'pink', 'magenta', 'crimson', 'red', 'orange', 'amber', 'yellow', 'brown', 'olive',
    'steel', 'mauve', 'taupe', 'gray', 'dark', 'darker', 'darkBrown', 'darkCrimson',
    'darkMagenta', 'darkIndigo', 'darkCyan', 'darkCobalt', 'darkTeal', 'darkEmerald',
    'darkGreen', 'darkOrange', 'darkRed', 'darkPink', 'darkViolet', 'darkBlue',
    'lightBlue', 'lightRed', 'lightGreen', 'lighterBlue', 'lightTeal', 'lightOlive',
    'lightOrange', 'lightPink', 'grayDark', 'grayDarker', 'grayLight', 'grayLighter'
];

var panels = [
  'appMeteorology', 'appInventory', 'appCommunications', 'appLibrary', 'appController'
];

var modes = [
  'modeBright', 'modeEfficient', 'modeParty', 'modeSecurity'
];

var adBlock = false;

$( document ).ready(function() {
  
    
    availableWindowSpace = $( document ).height() - $( '#appBarContainer' ).height()
    console.log('Setting salamanderPanelSpace height to '+availableWindowSpace.toString()); // returns height of pageDetail space
    $( '#salamanderPanelSpace' ).height(availableWindowSpace);
  $( "#salamanderPanelSpace" ).load("panels/appHome.html",function(){panelInitialize()});

  
  $("#salamanderAppList").on("click", "a", function(event){
    var buttonUniqueName = $(this).attr('id');
    $( "#salamanderPanelSpace" ).load("panels/"+buttonUniqueName+".html",function(){panelInitialize()});
  });

  $("#homeButton").on("click", function(event){
    var buttonUniqueName = $(this).attr('id');
    $( "#salamanderPanelSpace" ).load("panels/appHome.html",function(){panelInitialize()});
  });

  $("#lockButton").on("click", function(event){
    var buttonUniqueName = $(this).attr('id');
    $( "#salamanderPanelSpace" ).load("panels/appLocked.html",function(){panelInitialize()});
  });
});
