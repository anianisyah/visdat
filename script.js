var samples = 20;
var speed = 250;
let timeout = samples * speed;
var values = [];
var labels = [];
var charts = [];
var value = 0;
var scale = 1;
var i=0;


var jsontext_prdbank = (readTextFile('recap_congestion.json'));
var values = JSON.parse(jsontext_prdbank);

function readTextFile(file) {
var rawtext;
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            rawtext = rawFile.responseText;
        }
    }
}
rawFile.send(null);
return rawtext;
}
data_awal= values.slice(0,10)

var originalCalculateXLabelRotation = Chart.Scale.prototype.calculateXLabelRotation
function initialize() {
  charts.push(new Chart(document.getElementById("chart0"), {
    type: 'line',
    data: {
      //labels: labels,
      datasets: [{
        data: data_awal,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        lineTension: 0.25,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: speed * 0.1,
        easing: 'linear'
      },
      legend: false,
      scales: {
        xAxes: [{
          type: "time",
          display: true,
           time: {
                    displayFormats: {
                        quarter: 'MMM D'
                    }
                }
        }],
        yAxes: [{
          ticks: {
            max: 30,
            min: 1
          }
        }]
      }
    }
  }));
  i=i+1
}
function rescale() {
  var padding = [];
  
  values.splice.apply(values, padding);
  
  scale++;
}

function updateCharts(){
  charts.forEach(function(chart) {
    chart.update();
  });
}

function progress() {
  data_awal.push({
    x: values[i+10]['x'],
    y: values[i+10]['y']
  });
  data_awal.shift();
  i=i+1;
}

function advance() {
  if (data_awal[0] !== null && scale < 4) {
    rescale();
    updateCharts();
  }
  
  progress();
  updateCharts();
  
  setTimeout(function() {
    requestAnimationFrame(advance);
  }, speed);
}


window.onload = function() {
  initialize();
  advance();
};
