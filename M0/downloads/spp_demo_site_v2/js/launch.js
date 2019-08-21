var launchTagUrl = "//assets.adobedtm.com/staging/launch-EN90b33b9050b048d1bdc68e03892894d9-development.min.js";

dynamicallyLoadScript(launchTagUrl);

function dynamicallyLoadScript(url) {
    var script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
}
