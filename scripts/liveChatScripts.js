var domain = 'bajurar.github.io';
var template = {};
var emotes = {};
var twitchApiLoaded = false;

function loadIFrame() {
	if(twitchApiLoaded){
	let searchParams = new URLSearchParams(window.location.search);
	if(searchParams.has('v')){
		var videoID = searchParams.get('v');
		var url = 'https://www.youtube.com/live_chat?v='+ videoID + '&embed_domain=' + domain;
		$(document.body).append('<iframe id="live-chat-iframe" src=""><p>Your browser does not support iframes.</p></iframe>');
		 $("#live-chat-iframe").attr("src", url);
		$('iframe#live-chat-iframe').load(function() {
			var observer = new MutationObserver(function(mutations) {
			 mutations.forEach(function(mutation) {
			   for (var i = 0; i < mutation.addedNodes.length; i++)
				 if($(mutation.addedNodes[i]).prop('tagName')=='YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER'){
					console.log($(mutation.addedNodes[i]).find('#message'));
					addEmotes($(mutation.addedNodes[i]).find('#message'));
					
				 }
			 })
			});
			observer.observe(document.getElementById('live-chat-iframe').contentWindow.document.querySelector('#item-offset'), { childList: true, subtree: true });
			});
		}
	}
	else {
		(setTimeout(loadIFrame, 5000));
	}
}

function loadTwitchApi() {
	$.get('https://twitchemotes.com/api_cache/v2/global.json', function(data){
		template = data.template;
		emotes = data.emotes;
		twitchApiLoaded = true;
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
			 var imgHtml = '<img class="twitch-emote" src="' + template['small'].replace('{image_id}', emotes[word].image_id) + '" />';
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
