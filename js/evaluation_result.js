Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Hasil Penilaian Visualisasi Data'
    },
    xAxis: {
        type: 'category', 
        title:{
            text : 'Aspek Penilaian'
        }
    },subtitle: {
        text: 'dari total responden 11 mahasiswa'
    },
    yAxis: {
        title: {
            text: 'Rata-rata'
        }
    },
    
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true
            }
        }
    },tooltip: {
        headerFormat: '<span style="font-size:11px">{series.data.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} </b><br/>'
    },

    series: [{
        name: 'Hasil Penilaian',
        colorByPoint: true,
        data: [{
            name: 'Tujuan',
            y: 4.89,
            drilldown: 'tujuan'
        }, {
            name: 'Teknik',
            y: 4.95,
            drilldown: 'teknik'
        }, {
            name: 'Desain',
            y: 4.95,
            drilldown: 'desain'
        }, {
            name: 'Interaksi',
            y: 4.72
        }]
    }],
    drilldown: {
        series: [{
            id: 'tujuan',
            name : 'tujuan visualisasi',
            data: [
                ['Pemilihan topik dan tema', 4.72],
                ['Pemahaman visualisasi oleh Pengguna', 5.18],
                ['Visualisasi dapat menggugah eksplorasi', 4.63],
                ['Visualisasi dapat memberikan insight', 5],
                ['Visualisasi data jujur, objektif dan tidak memihak', 4.9],
                ['Visualisasi memberikan manfaat', 4.9]
            ]
        }, {
            id: 'teknik',
            name : 'teknik visualisasi',
            data: [
                ['Jumlah Sampel', 5],
                ['Ketepatan memilih teknik ', 4.8],
                ['Teknik visualisasi dapat merepresentasikan data',5],
                ['Teknik visualisasi dapat memperoleh insight', 4.72],
                ['Teknik visualisasi yang digunakan tidak ambigu', 5]
            ]
        }, {
            id: 'desain',
            name : 'desain visualisasi',
            data: [
                ['Pemilihan warna', 5.18],
                ['Desain interaksi', 4.9],
                ['Pemberian caption/judul pada visualisasi', 5.09],
                ['User Interface bersifat user friendly', 5.18],
                ['Navigasi', 5.09],
                ['Mobile-friendly', 4.27]
            ]
        }]
    }
});

