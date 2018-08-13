This is a very quick and simple example of an inline widget that displays data from a different API. I used the [OLOO patter](https://gist.github.com/getify/5572383) since I find it easier to reason about 

### Details
Most of the URLs are hardcoded for the simplicity and speed. I store the JS on codepen and the widget can be used on your site with embeding two things into your `HTML` file.

Simply put this script at the end of your HTML
```
<script>
  (function(window, document) {
    var loader = function() {
      var script = document.createElement("script"),
        tag = document.getElementsByTagName("script")[0];
      script.src = "https://codepen.io/samuherek/pen/355369db7e54bfaaaf4d68e2f12451e8.js";
      tag.parentNode.insertBefore(script, tag);
    };
    window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
  })(window, document);
</script>
```
Wherever you use a HTML element with a css class `.inline-js-widget`, the widget will created. Feel free to have multiple elements with that class.

Example:
```
<div class="inline-js-widget"></div>
```


### Demo

It can be seen in action on my codepen pen. [Here is the link](https://codepen.io/samuherek/pen/9d797fecfb2e0d38b288aa2589a93f09)
The source code can be found in the `index.js` file in this repo, and the demo uses the js from [this pen](https://codepen.io/samuherek/pen/355369db7e54bfaaaf4d68e2f12451e8?editors=0011)


### Final words
This repo is not intended for any production app. It's just an example. If you see any issue though I'm happy to hear the feedback.
