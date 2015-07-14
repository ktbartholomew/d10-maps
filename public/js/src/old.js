        document.addEventListener('click', function (e) {
          if(!e.target.matches('#dcb .maps a')) {
            return false;
          }

          e.preventDefault();

          var targetMap = videoMaps[e.target.getAttribute('data-map')];
          if(!targetMap) {
            return false;
          }

          var drawFromJson = function() {
            if (this.status >= 200 && this.status < 400) {
              var lines = JSON.parse(this.responseText);
              for(var i = 0; i < lines.length; i++) {
                var line = new google.maps.Polyline({
                  path: [
                    new google.maps.LatLng(lines[i].start_lat, lines[i].start_lon),
                    new google.maps.LatLng(lines[i].end_lat, lines[i].end_lon)
                  ],
                  geodesic: false,
                  strokeColor: 'rgb(200,200,200)',
                  strokeOpacity: 1,
                  strokeWeight: 1
                });

                line.setMap(map);

                targetMap.lines.push(line);
                e.target.classList.add('active');
              }
            }
          };

          if(targetMap.lines.length === 0) {
            var request = new XMLHttpRequest();
            request.open('GET', targetMap.url, true);
            request.onload = drawFromJson;
            request.send();
          }
          else {
            for(var i = 0; i < targetMap.lines.length; i++) {
              targetMap.lines[i].setMap(null);
            }

            targetMap.lines = [];
            e.target.classList.remove('active');
          }



        }, true);
