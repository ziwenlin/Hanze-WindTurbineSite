Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontSize = 14;
Chart.defaults.global.defaultColor = "FF9B00CC";
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.legend.labels.fontSize = 18;
Chart.defaults.global.elements.line.pointRadius = 10;
Chart.defaults.global.elements.line.pointHoverRadius = 10;
Chart.defaults.global.elements.line.borderWidth = 3;
Chart.defaults.global.elements.rectangle.borderWidth = 3;
Chart.defaults.global.elements.rectangle.borderColor = "#FF9B00CC";
Chart.defaults.global.elements.rectangle.backgroundColor = "#FF9B00AA";
Chart.defaults.global.tooltips.mode = 'index';
Chart.defaults.global.tooltips.intersect = false;
Chart.defaults.global.tooltips.animationDuration = 200;
Chart.defaults.global.hover.mode = 'index';
Chart.defaults.global.hover.intersect = false;
Chart.defaults.global.hover.animationDuration = 200;
// Chart.defaults.global.animation.responsive = true;
// Chart.defaults.global.animation.maintainAspectRatio = true;
// Chart.defaults.global.animation.duration = 20;
Chart.defaults.scale.gridLines.color = '#ccc';
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    draw: function (ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0],
                ctx = this.chart.ctx,
                x = activePoint.tooltipPosition().x,
                topY = this.chart.scales['y-axis-0'].top,
                bottomY = this.chart.scales['y-axis-0'].bottom;

            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.chart.data.datasets.backgroundColor;
            ctx.stroke();
            ctx.restore();
        }
    }
});

function makeGraph(id, data) {
    const canvas = document.getElementById(id);
    if (canvas === null) {
        return;
    }
    const ctx = canvas.getContext('2d');
    return new Chart(ctx, {
        type: 'LineWithLine',
        data: data,
        options: {}
    });
}

window.addEventListener("load", function () {
    makeGraph('graph_generator', {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: 'Rotations generator [rpm]',
            backgroundColor: 'rgba(0,217,255,0.1)',
            borderColor: 'rgba(0,217,255,1)',
            data: [0, 232, 342, 543, 788, 835, 932, 1037, 1109, 1151, 1221, 435, 11, 0, 0, 438]
        }]
    });
    makeGraph('graph_production', {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: 'Energy production [Watt]',
            backgroundColor: 'rgba(255,240,0,0.1)',
            borderColor: 'rgba(255,240,0,1)',
            data: [0, 103, 204, 342, 457, 567, 624, 657, 689, 722, 741, 101, 4, 0, 0, 238]
        }]
    });
    makeGraph('graph_windspeed', {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: 'Wind speed [m/s]',
            backgroundColor: 'rgba(255,155,0,0.1)',
            borderColor: 'rgba(255,155,0,0.9)',
            data: [0, 1.4, 3.7, 5.9, 7.2, 9.9, 12.3, 13.2, 14.2, 14.6, 14.9, 15.2, 15.8, 16.3, 17.1, 14.3]
        }]
    });
    makeGraph('graph_temp', {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: 'Temperature [°C]',
            backgroundColor: 'rgba(255,68,0,0.1)',
            borderColor: 'rgb(255,68,0)',
            data: [23.1, 23.3, 23.6, 23.9, 24.2, 24.4, 24.5, 24.6, 24.6, 24.6, 24.7, 24.7, 24.4, 23.9, 23.7, 23.6]
        }]
    });
    makeGraph('graph_vibration', {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: 'Vibration [m/s^2]',
            backgroundColor: 'rgba(121,255,0,0.1)',
            borderColor: 'rgba(121,255,0,0.9)',
            data: [0, 0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.4, 0.4, 0.4, 1.5, 1.8, 0.3, 0, 0, 0.1]
        }]
    });
    makeGraph('graph_water', {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: 'Humidity [%]',
            backgroundColor: 'rgba(30,185,255,0.1)',
            borderColor: 'rgba(30,185,255,0.9)',
            data: [60.5, 60.3, 60.2, 59.9, 59.7, 58.5, 57.3, 57.1, 57.0, 56.9, 56.8, 56.8, 56.7, 56.8, 56.8, 56.8]
        }]
    });
    makeGraph('graph_rotation', {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        datasets: [{
            label: 'Rotations [rpm]',
            backgroundColor: 'rgba(218,0,255,0.1)',
            borderColor: 'rgb(218,0,255)',
            data: [0, 232, 342, 543, 788, 835, 932, 1037, 1109, 1151, 1221, 435, 11, 0, 0, 438]
        }]
    });
});