function init(){window.addEventListener("scroll",function(e){var t=window.pageYOffset||document.documentElement.scrollTop,n=30,s=document.querySelector("header");t>n?classie.add(s,"smaller"):classie.has(s,"smaller")&&classie.remove(s,"smaller")})}!function(e){e.fn.juizScrollTo=function(t,n){if(!t)var t="slow";if(!n)var n=0;return this.each(function(){e(this).click(function(){var s=!1,a=e(this).attr("href"),o=new RegExp("#(.*)","gi");if(a.match("#(.+)")&&(a=a.replace(o,"$1"),e("#"+a).length>0?(the_element="#"+a,s=!0):e("a[name="+a+"]").length>0&&(the_element="a[name="+a+"]",s=!0),s)){var i="html";return e.browser.webkit&&(i="body"),e(i).animate({scrollTop:e(the_element).offset().top+n},t,function(){e(the_element).attr("tabindex","0").focus().removeAttr("tabindex")}),!1}})})}}(jQuery),$("a:first").juizScrollTo("fast",-75),$("a:not(:first)").juizScrollTo("slow").css("color","fdb417"),window.onload=init(),function(e){"use strict";function t(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}function n(e,t){var n=s(e,t)?o:a;n(e,t)}var s,a,o;"classList"in document.documentElement?(s=function(e,t){return e.classList.contains(t)},a=function(e,t){e.classList.add(t)},o=function(e,t){e.classList.remove(t)}):(s=function(e,n){return t(n).test(e.className)},a=function(e,t){s(e,t)||(e.className=e.className+" "+t)},o=function(e,n){e.className=e.className.replace(t(n)," ")});var i={hasClass:s,addClass:a,removeClass:o,toggleClass:n,has:s,add:a,remove:o,toggle:n};"function"==typeof define&&define.amd?define(i):e.classie=i}(window);