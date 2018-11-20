$(function () {

    var chart;
	
    $(document).ready(function() {
       	var jqxhr = $.getJSON("https://raw.githubusercontent.com/anianisyah/visdat/master/data/recap_congestion_by_date.json", function(data) {
            var times = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
            console.log(jqxhr);
            var congested_time = [];
            function indexOfMax(arr) {
                if (arr.length === 0) {
                    return -1;
                }

                var max = arr[0];
                var maxIndex = 0;

                for (var i = 1; i < arr.length; i++) {
                    if (arr[i] > max) {
                        maxIndex = i;
                        max = arr[i];
                    }
                }

                return maxIndex;
            }
            function sortByFrequency(array) {
                var frequency = {};

                array.forEach(function(value) { frequency[value] = 0; });

                var uniques = array.filter(function(value) {
                    return ++frequency[value] == 1;
                });

                return uniques.sort(function(a, b) {
                    return frequency[b] - frequency[a];
                });
            }
            for (var i = 0; i < jqxhr.responseJSON.length; i++){
                var maxVal = indexOfMax(jqxhr.responseJSON[i]["congestion_by_hour"]);
                congested_time.push(maxVal);
            }
            var idx_congested_time = sortByFrequency(congested_time);
            if(idx_congested_time.length > 5){
                idx_congested_time = idx_congested_time.slice(0,5);
            }
            var new_congested_time = [];
            for (var i = 0; i < idx_congested_time.length; i++){
                new_congested_time[i] = times[idx_congested_time[i]];
            }
            console.log(new_congested_time);

            var parent = document.getElementById('container4');

            for (var i = 0; i < new_congested_time.length; i++){
                parent.innerHTML += '<canvas id="canvas'+ (i+1) +'" width="200" height="200" style="background-color:#333; margin : 20px;"></canvas>'
            }

            var canvas1 = document.getElementById("canvas1");
            var canvas2 = document.getElementById("canvas2");
            var canvas3 = document.getElementById("canvas3");
            var canvas4 = document.getElementById("canvas4");
            var canvas5 = document.getElementById("canvas5");

            makeClock(canvas1, new_congested_time[0]);
            makeClock(canvas2, new_congested_time[1]);
            makeClock(canvas3, new_congested_time[2]);
            makeClock(canvas4, new_congested_time[3]);
            makeClock(canvas5, new_congested_time[4]);

            function makeClock(canvas, time){
                var ctx = canvas.getContext("2d");
                var time_splitted = time.split(":");
                var hour = parseInt(time_splitted[0]);
                ctx.font="20px Georgia";
                ctx.fillStyle = "#ffffff";
                if(hour <= 12){
                    ctx.fillText("AM",10,25);
                }else{
                    ctx.fillText("PM",10,25);
                }
                var radius = canvas.height / 2;
                ctx.translate(radius, radius);
                radius = radius * 0.90
                setInterval(drawClock, 1000);

                function drawClock() {
                  drawFace(ctx, radius);
                  drawNumbers(ctx, radius);
                  drawTime(ctx, radius, time);
                }

                function drawFace(ctx, radius) {
                  var grad;
                  ctx.beginPath();
                  ctx.arc(0, 0, radius, 0, 2*Math.PI);
                  ctx.fillStyle = 'white';
                  ctx.fill();
                  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
                  grad.addColorStop(0, '#333');
                  grad.addColorStop(0.5, 'white');
                  grad.addColorStop(1, '#333');
                  ctx.strokeStyle = grad;
                  ctx.lineWidth = radius*0.1;
                  ctx.stroke();
                  ctx.beginPath();
                  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
                  ctx.fillStyle = '#333';
                  ctx.fill();
                }

                function drawNumbers(ctx, radius) {
                  var ang;
                  var num;
                  ctx.font = radius*0.15 + "px arial";
                  ctx.textBaseline="middle";
                  ctx.textAlign="center";
                  for(num = 1; num < 13; num++){
                    ang = num * Math.PI / 6;
                    ctx.rotate(ang);
                    ctx.translate(0, -radius*0.85);
                    ctx.rotate(-ang);
                    ctx.fillText(num.toString(), 0, 0);
                    ctx.rotate(ang);
                    ctx.translate(0, radius*0.85);
                    ctx.rotate(-ang);
                  }
                }

                function drawTime(ctx, radius, time){
                    var time = time.split(":");
                    var hour = parseInt(time[0]);
                    var minute = parseInt(time[1]);
                    var second = 0;
                    //hour
                    hour=hour%12;
                    hour=(hour*Math.PI/6)+
                    (minute*Math.PI/(6*60))+
                    (second*Math.PI/(360*60));
                    drawHand(ctx, hour, radius*0.5, radius*0.07);
                    //minute
                    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
                    drawHand(ctx, minute, radius*0.8, radius*0.07);
                }

                function drawHand(ctx, pos, length, width) {
                    ctx.beginPath();
                    ctx.lineWidth = width;
                    ctx.lineCap = "round";
                    ctx.moveTo(0,0);
                    ctx.rotate(pos);
                    ctx.lineTo(0, -length);
                    ctx.stroke();
                    ctx.rotate(-pos);
                }
            }
	    });
	});
})