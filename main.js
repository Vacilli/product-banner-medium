//GLOBAL VARS
var adWidth = 970,
    adHeight = 200,
    d = 4,
    t = .5,
    easeInOut = Power1.easeInOut,
    easeIn = Power1.easeIn,
    easeOut = Power1.easeOut,
    easeBounceFast = Back.easeInOut.config(1.7),
    easeBounceSlow = Back.easeInOut.config(0.5);


    var tl_product = new TimelineMax(),
    tl_mainAnimation = new TimelineMax({paused:true}),
    tl_endFrame = new TimelineMax({paused:true}),
    tl_switchFinalAsset = new TimelineMax();

    var newlabelPath = [-100, -120, -634, 10], 
    productPath = [0, 185, 130, -5], //x1,y2,x1,y2
    productRotation = [20, 48],
    samplesPath = [-100, -0, 60, 20], 
    meatPath = [400, 20, 430, 70];
    
var counter = 0;//2debug


//ANIMATIONS CALLS
function init() {
    var f1_call = setTimeout(initFrame01, 500);
  
    function initFrame01() {
        counter++; //2debug
        console.log(counter);//2debug
        clearTimeout(f1_call);
        tl_mainAnimation.play();
        tl_product.play();
    }

  
    function initFrame04() {
        clearTimeout(f4_call);
        tl_mainAnimation.play();
        tl_endFrame.play();
    }
    
    var patties = document.getElementsByClassName('meatLoop');
    for(var i = 0; i < patties.length; i++)
    {
       patties[i].style.transform = "rotate("+randomNumber(170,210)+"deg)";
        
    } 


}


//TIMELINES //
//product
tl_product.addLabel("INIT_PRODUCT", "=+"+t*3)
    .to("#f1_text", t/1.5, {opacity:1, ease:easeOut})
    .staggerTo(".meatLoop", t*7, {bezier:[{left:meatPath[0], top:meatPath[1]}, {left:meatPath[2], top:meatPath[3]}], scale:0.85, ease:easeBounceSlow}, d/4,"INIT_PRODUCT")
    .from("#samples", t, {x:samplesPath[0], y:samplesPath[1], scale:0,  ease:easeOut},"INIT_PRODUCT")

//product
tl_mainAnimation.addLabel("INIT_TEXT")
    .to([".banner", "#newLabel", "#samples", "#bagPurple", "#colorShade", "#cta" ], t/2, {opacity:1})
    .to("#f1_text", t/1.5, {opacity:1, ease:easeOut}, "INIT_TEXT")
    
    .addLabel("INIT_TEXT2", "=+"+t*3)
    .to("#f1_text", t/1.5, {opacity:0, ease:easeOut},"INIT_TEXT2")   
    .to("#f2_text", t/1.5, {opacity:1, ease:easeIn})
    .addLabel("INIT_TEXT3", "=+"+t*3)
    .to("#f2_text", t/1.5, {opacity:0, ease:easeOut},"INIT_TEXT3")
    .to("#f3_text", t/1.5, {opacity:1, ease:easeIn})
    
    .addLabel("INIT_TEXT4", "=+"+t*3)
    .to(["#f3_text","#newLabel"], t/1.5, {opacity:0, ease:easeOut},"INIT_TEXT4")
    .set("#newLabel", {x:newlabelPath[2], y:newlabelPath[3]})
   
    
    .addLabel("END-FRAME")
    .set(".meatLoop", {scale:0}, "END-FRAME")
    .to("#colorShade", t, {opacity:0}, "END-FRAME")
    .to("#samples", t, {x:samplesPath[2], y:samplesPath[3], scale:0,  ease:easeOut}, "END-FRAME")
    .to("#bagPurple", t, {x:productPath[2], y:productPath[3],  rotation:productRotation[1], ease:easeOut, onComplete: switchFinalAsset}, "END-FRAME")
    .to("#logo", t, {opacity:1, ease:easeOut})
    .to("#newLabel", t/2, {opacity:1, ease:easeOut}, "=-"+t/2)
    .to("#f4_text", t/1.5, {opacity:1, ease:easeIn})

    .staggerFrom(".smallBag", t, {y:"=-10", ease:easeOut}, d/20, "END-FRAME")
    .staggerTo(".smallBag", t/2, {opacity:1, ease:easeOut}, d/10, "END-FRAME")

  

//MISC METHODS
function switchFinalAsset() {
      //  tl_switchFinalAsset.addLabel("INIT_SWITCH")
//        .to("#bagPurple", t, {opacity:0},"INIT_SWITCH")
//        .to("#bagPurple_small", t/2, {opacity:1},"INIT_SWITCH")

 }

function randomNumber(min, max){
	return Math.floor(Math.random() * (1 + max - min) + min);
}



//CLICKTAG
document.getElementById('clickTag').addEventListener("click", function(){
    window.open(window.clickTag);
});




//INIT
function preLoad() {
    if (Enabler.isInitialized()) {
        init();
        console.log("done!");
    } else {
        Enabler.addEventListener(
            studio.events.StudioEvent.INIT,
            init
        );
        console.log("loading...");
    }
}


preLoad();
