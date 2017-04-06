var domain = 'bajurar.github.io';
var template = {};
var emotes = {};

function loadIFrame() {
	let searchParams = new URLSearchParams(window.location.search);
	if(searchParams.has('v')){
		var videoID = searchParams.get('v');
		var url = 'https://www.youtube.com/live_chat?v='+ videoID + '&embed_domain=' + domain;
		 $("#live-chat-iframe").attr("src", url);
	}
}

function loadTwitchApi() {
	$.get('https://twitchemotes.com/api_cache/v2/global.json', function(data){
		template = data.template;
		emotes = data.emotes;
	});
}

$(document).ready(function() {
	loadTwitchApi();
	loadIFrame();
});

function addEmotes(spanObj) {
	var wordsArray = $(spanObj.html().split(" "));
	wordsArray.each(function(i, word){
		if(word in emotes) {
			var imgHtml = '<img class="twitch-emote" src="' + template['small'].replace('{image_id}', iemotes[word].image_id) + '" />';
			if(i===0){
				spanObj.html(spanObj.html().replace(word+" ", imgHtml + " "));
			}
			else if(i===wordsArray.length-1){				
				spanObj.html(spanObj.html().replace(" "+word, " " +imgHtml));
			}
			else {
				spanObj.html(spanObj.html().replace(" "+word+" ", " " +imgHtml+ " "));				
			}
		}
	});
}
