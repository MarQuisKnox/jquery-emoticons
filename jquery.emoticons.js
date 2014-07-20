/**
 * jQuery Emoticons 1.0
 * Replaces occurrences of emoticon text 
 * with the custom content
 * 
 * @copyright	2009 Sebastian Kreft
 * @copyright	2014 MarQuis Knox <opensource@marquisknox.com>
 * @license		Licensed under the GPL license:
 * @link		http://www.gnu.org/licenses/gpl.html
 * 
 * @todo		Use Regex instead of a for loop
*/

(function( $ ) {
	$.fn.emoticons = function( options ) {
		var settings = $.extend({
			displayImages: true,
			BASEURL: window.location.protocol + '//' + window.location.host
		}, options );
		
		// define the emoticons
	    var emotes = {
	        'applause': 	Array('=D&gt;'),
	        'at-wits-end':	Array('~X('),
	        'broken-heart':	Array('=(('),
	        'call-me':		Array(':-c'),
	        'hurry-up':		Array(':!!'),
	        'not-worthy':	Array('^:)^'),
	        'pirate':		Array(':ar!'),
	        'rock-on':		Array('\\m\/'),
	        'smile': 		Array(':-)',':)','=]','=)'),
	        'sad': 			Array(':-(','=(',':[',':&lt;'),
	        'silly':		Array('8-}'),
	        'wink': 		Array(';-)',';)',';]','*)'),
	        'grin': 		Array(':D','=D','XD','BD','8D','xD'),
	        'surprise': 	Array(':O','=O',':-O','=-O'),
	        'devilish': 	Array('(6)'),
	        'angel': 		Array('(A)'),
	        'crying': 		Array(":'(",":'-("),
	        'plain': 		Array(':|'),
	        'smile-big': 	Array(':o)'),
	        'glasses': 		Array('8)','8-)'),
	        'kiss': 		Array('(K)',':-*'),
	        'monkey': 		Array('(M)'),
	        'nerd':			Array(':-B')
	    };
	    
	    // define the URLs & Descriptions
	    var filePath = {
	    	'applause':		{
	    		'url': settings.BASEURL + '/images/emoticons/yahoo/41.gif',
	    		'title': 'Applause'
	    	},
	    	'at-wits-end':	{
	    		'url': settings.BASEURL + '/images/emoticons/yahoo/102.gif',
	    		'title': 'At Wit\'s End'
	    	},
	    	'broken-heart':	{
	    		'url':	settings.BASEURL + '/images/emoticons/yahoo/12.gif',
	    		'title': 'Broken Heart'
	    	},
	    	'call-me':	{
	    		'url':	settings.BASEURL + '/images/emoticons/yahoo/101.gif',
	    		'title': 'Call Me'
	    	},    	
	    	'hurry-up':		{
	    		'url': settings.BASEURL + '/images/emoticons/yahoo/110.gif',
	    		'title': 'Hurry Up'
	    	},
	    	'not-worthy':	{
	    		'url': settings.BASEURL + '/images/emoticons/yahoo/77.gif',
	    		'title': 'Not Worthy'
	    	},
	    	'pirate':	{
	    		'url':	settings.BASEURL + '/images/emoticons/yahoo/pirate_2.gif',
	    		'title': 'Pirate'
	    	},
	    	'rock-on':		{
	    		'url': settings.BASEURL + '/images/emoticons/yahoo/111.gif',
	    		'title': 'Rock On!'
	    	},
	        'smile': 		{
	        	'url': settings.BASEURL + '/images/emojis/smile.png',
	        	'title': 'Smile'
	        },
	        'sad':			{
	        	'url': settings.BASEURL + '/images/emoticons/face-sad.png',
	        	'title': 'Sad'
	        },
	        'wink': 		{
	        	'url': settings.BASEURL + '/images/emoticons/face-wink.png',
	        	'title': 'Wink'
	        },
	        'grin': 		{
	        	'url': settings.BASEURL + '/images/emoticons/face-grin.png',
	        	'title': 'Grin'
	        },
	        'surprise': 	{
	        	'url': settings.BASEURL + '/images/emoticons/face-surprise.png',
	        	'title': 'Suprise'
	        },
	        'devilish': 	{
	        	'url': settings.BASEURL + '/images/emoticons/face-devilish.png',
	        	'title': 'Devilish'
	        },
	        'angel': 		{
	        	'url': settings.BASEURL + '/images/emoticons/face-angel.png',
	        	'title': 'Angel'
	        },
	        'crying': 		{
	        	'url': settings.BASEURL + '/images/emoticons/face-crying.png',
	        	'title': 'Crying'
	        },
	        'plain': 		{
	        	'url': settings.BASEURL + '/images/emoticons/face-plain.png',
	        	'title': 'Plain'
	        },
	        'smile-big': 	{
	        	'url': settings.BASEURL + '/images/emoticons/face-smile-big.png',
	        	'title': 'Big Smile'
	        },
	        'glasses': 		{
	        	'url': settings.BASEURL + '/images/emoticons/face-glasses.png',
	        	'title': 'Glasses'
	        },
	        'kiss': 		{
	        	'url': settings.BASEURL + '/images/emoticons/face-kiss.png',
	        	'title': 'Kiss'
	        },
	        'monkey': 		{
	        	'url': settings.BASEURL + '/images/emoticons/face-monkey.png',
	        	'title': 'Monkey'
	        },
	        'nerd': 		{
	        	'url': settings.BASEURL + '/images/emoticons/yahoo/26.gif',
	        	'title': 'Nerd'
	        },
	        'silly':	{
	        	'url':	settings.BASEURL + '/images/emoticons/yahoo/35.gif',
	        	'title': 'Silly'
	        }
	    };
	    
	    var preloader	= 'data:image/gif;base64,R0lGODlhFAAUAJEDAMzMzLOzs39/f////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgADACwAAAAAFAAUAAACPJyPqcuNItyCUJoQBo0ANIxpXOctYHaQpYkiHfM2cUrCNT0nqr4uudsz/IC5na/2Mh4Hu+HR6YBaplRDAQAh+QQFCgADACwEAAIADAAGAAACFpwdcYupC8BwSogR46xWZHl0l8ZYQwEAIfkEBQoAAwAsCAACAAoACgAAAhccMKl2uHxGCCvO+eTNmishcCCYjWEZFgAh+QQFCgADACwMAAQABgAMAAACFxwweaebhl4K4VE6r61DiOd5SfiN5VAAACH5BAUKAAMALAgACAAKAAoAAAIYnD8AeKqcHIwwhGntEWLkO3CcB4biNEIFACH5BAUKAAMALAQADAAMAAYAAAIWnDSpAHa4GHgohCHbGdbipnBdSHphAQAh+QQFCgADACwCAAgACgAKAAACF5w0qXa4fF6KUoVQ75UaA7Bs3yeNYAkWACH5BAUKAAMALAIABAAGAAwAAAIXnCU2iMfaRghqTmMp1moAoHyfIYIkWAAAOw==';    
	    var found		= [];
	    
	    var inArray = function( needle, haystack, argStrict ) {
	        //  discuss at: http://phpjs.org/functions/in_array
	    	// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    	// improved by: vlado houba
	    	// improved by: Jonas Sciangula Street (Joni2Back)
	    	//    input by: Billy
	    	// bugfixed by: Brett Zamir (http://brett-zamir.me)
	    	//   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
	    	//   returns 1: true
	    	//   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
	    	//   returns 2: false
	    	//   example 3: in_array(1, ['1', '2', '3']);
	    	//   example 3: in_array(1, ['1', '2', '3'], false);
	    	//   returns 3: true
  			//   returns 3: true
  			//   example 4: in_array(1, ['1', '2', '3'], true);
  			//   returns 4: false

	    	var key = '',
	    	strict = !! argStrict;

	    	// we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
	    	// in just one for, in order to improve the performance 
	    	// deciding wich type of comparation will do before walk array
	    	if (strict) {
	    		for (key in haystack) {
	    			if (haystack[key] === needle) {
	    				return true;
	    			}
	    		}
	    	} else {
	    		for (key in haystack) {
	    			if (haystack[key] == needle) {
	    				return true;
	    			}
	    		}
	    	}

	    	return false;    	
	    }
	    
	    /** 
	     * Replaces all ocurrences of emoticons 
	     * in the specified text
	     * 
	     * @param	string	html
	     * @return	string
	    */
	    var emoticons = function( html ) {
	        for( var emoticon in emotes ) {
	            for( var i = 0; i < emotes[emoticon].length; i++ ) {
	                                
	                var image	= filePath[emoticon]['url'];
	                var title	= filePath[emoticon]['title']
	                var randId	= rand();
	                
	                if( typeof image !== 'undefined' ) {
	                    /* css class of images is emoticonimg for styling them*/
	                    var source = html;
	                    
	                    if ( settings.displayImages ) {
	                    	html = html.replace(emotes[emoticon][i], '<img data-img="' + image +'" id="emoticon-'+ randId +'" alt="'+ title +'" title="'+ title +'" src="'+ preloader +'" class="emoticonimg">', 'g');	
	                        if( html != source ) {
	                            if( !in_array( image, found ) ) { 
	                            	found.push( image );
	                            	
	                            	// preload
	                                $.imgpreload([
	                                    image
	                                ], {
	                                each: function() {
	                                	// this = dom image object
	                                	// check for success with: $(this).data('loaded')
	                                	// callback executes on every image load
	                                },
	                                all: function() {
	                                	// this = array of dom image objects
	                                	// check for success with: $(this[i]).data('loaded')
	                                	// callback executes when all images are loaded
	                                }
	                                });                    	
	                            }                    	
	                        }
	                    } else {
	                    	html = html.replace(emotes[emoticon][i], title, 'g');	
	                    }                                 
	                }
	            }
	        }
	        
	        return html;
	    }
	    
	    // run
	    return this.each(function() {
	        $(this).html( emoticons( $(this).html() ) ).promise().done(function() {
	        	if ( settings.displayImages ) {
	                var image = $(this).find('.emoticonimg');
	                if( typeof image !== 'undefined' ) {
	                	image.attr( 'src', image.data('img') );	
	                }        		
	        	}
	        });
	    });
	};
}( jQuery ));
