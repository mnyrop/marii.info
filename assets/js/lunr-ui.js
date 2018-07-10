---
layout: none
---
$( document ).ready(function() {
  $.getJSON("{{ site.baseurl }}/assets/js/lunr-index.json", function(index_json) {
    var store         = index_json;
    var results_div   = $('#results');
    var search_input  = $('input#search');
    var index         = new elasticlunr.Index;

    index.saveDocument(false);
    index.setRef('lunr_id');
    index.addField('title');
    index.addField('tags');
    index.addField('url');
    index.addField('content');

    // add docs
    for (i in store) { index.addDoc(store[i]); }

    // reset with empty results
    results_div.hide();

    // treat 'enter' as a submit search click
    $('#search').keypress(function(e) {
      var key = e.which;
      if (key == 13) { search(); }
    });

    text_truncate = function(str, length, ending) {
      if (length == null) {
        length = 100;
      }
      if (ending == null) {
        ending = '...';
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
      } else {
        return str;
      }
    };

    // on search click

    function search() {
      // normalize accents / diacritics
      var query = $(search_input).val().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      // boost labels
      var params = {
        bool: "AND",
        expand: true,
        boost: 'title'
      };
      // get all results
      var results = index.search(query, params);
      // add + display real results
      results_div.empty();
      results_div.prepend("<span class='search-info'>Displaying " + results.length + " results.</span><br><br>");

      // contruct formatted results
      for (var r in results) {
        var ref     = results[r].ref;
        var item    = store[ref];
        var excerpt = text_truncate(item.content, 200);
        var result = '<div class="result"><a href="' + item.url + '">' + item.title +'</a><br>' + item.tags + '<br>' + excerpt + '</div>';
        results_div.append(result);
      }
      // display them
      results_div.show();
    }
  });
});
