$(document).ready(function () {
    //Function to animate a css opacity change on hover for the sqaure svg in the navbar
    $('#display').mouseover(function(){
        $('#display').animate({opacity:'0.6'});
    })
    //A chained function to animate the svg menu button in the navbar for an extended animation
    $('#dial1').click(function () {
        //Animation top goes right
        $('#menuTop').animate({
            'marginLeft': '+=10px'
        }, function () {
            //Animation top goes left, mid goes right
            $('#menuTop').animate({
                'marginLeft': '-=20px'
            })
            $('#menuMid').animate({
                'marginLeft': '+=8px'
            }, function () {
                //Animation top goes right, mid goes left, low goes right
                $('#menuTop').animate({
                    'marginLeft': '+=10px'
                })
                $('#menuMid').animate({
                    'marginLeft': '-=15px'
                })
                $('#menuLow').animate({
                    'marginLeft': '+=6px'
                }, function () {
                    //Animation mid goes right, low goes left
                    $('#menuMid').animate({
                        'marginLeft': '+=7px'
                    })
                    $('#menuLow').animate({
                        'marginLeft': '-=10px'
                    }, function () {
                        //Animation low goes right
                        $('#menuLow').animate({
                            'marginLeft': '+=4px'
                        })
                    })
                })
            })
        })
    })
});
//Function to show the li elements in the drop down menu
$('#menuButtonNav').click(function(){
    $('li').slideToggle();
})    
//Function to hide the li elements in the drop down menu on any click that is not the menu or element buttons themselves
$('*').click(function(e){
    let target = e.target;
    if (!$(target).is('#menuButtonNav')&&
    !$(target).parent().is('#menuButtonNav')&&
    !$(target).parent().is($('.menuButton')))
    $('li').slideUp();
})
//Function to hide the text area and input fields on the contact page when button element is clicked, while also calling the show() function on an h element
$( document ).ready(function() {
$('#submitQuery').click(function(){
    $('#contactQueryForm').hide();
    $('#thanksMessage').show();
})
});

