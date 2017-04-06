var domain = 'bajurar.github.io';

function loadIFrame() {
	let searchParams = new URLSearchParams(window.location.search);
	if(searchParams.has('v')){
		var videoID = searchParams.get('v');
		var url = 'https://www.youtube.com/live_chat?v='+ videoID + '&embed_domain=' + domain;
		 $("#live-chat-iframe").attr("src", "newwebpage.html");
	}
}

$(document).ready(function() {
	loadIFrame();
}