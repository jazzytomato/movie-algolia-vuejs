new Vue({
    el: '#app',
    data: {movie: {}},
    mounted: function() {
        this.client = algoliasearch('latency', '56f24e4276091e774e8157fe4b8b11f6');
        this.index = this.client.initIndex('movies');

        autocomplete('#aa-search-input', {
            hint: false
        }, [{
            source: autocomplete.sources.hits(this.index, {
                hitsPerPage: 5
            }),
            displayKey: 'title',
            templates: {
                suggestion: function(suggestion) {
                    return '<span>' + suggestion._highlightResult.title.value +
              						 '</span><span>' + suggestion.year + '</span>';
                }
            }
        }]).on('autocomplete:selected', function(event, suggestion, dataset) {
        	console.log(suggestion);
        	this.movie = suggestion;
        }.bind(this));

    },
    computed: {
    	actors: function () {
      	return this.movie.actors.slice(0, 5).join(', ') + '... and ' + (this.movie.actors.length - 5) + ' more';
    	}},
    methods: {}
});

Vue.filter('round', function(value) {
  return Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2);
});
