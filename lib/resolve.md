---
permalink: '0919'
layout: none
link: 'https://photos.app.goo.gl/uk99MwBpAQvC3yP6A'
---
<html>
  <head>
    <meta http-equiv="refresh" content="URL=0; {{ page.link }}" />
    <script>
      var uagent = navigator.userAgent.toLowerCase();
      if(/safari/.test(uagent) && !/chrome/.test(uagent)) {
        window.location.href = "{{ page.link }}"
      }
    </script>
  </head>
  <body>
    <p>This page should redirect you to a photo album! If not, click [here]({{ page.link }}).</p>
  </body>
</html>



