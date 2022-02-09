import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)

ChartBar.propTypes = {

};

function ChartBar(props) {
    const { chartReservations } = props;
    return (
        <div>
            <Bar
                datasetIdKey='id2'
                data={{
                    labels: chartReservations.milestones || [],
                    datasets: [
                        {
                            label: 'Bookings',
                            fill: true,
                            animation: true,
                            backgroundColor: "rgba(77, 183, 254, 0.2)",
                            borderColor: "#4DB7FE",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointBorderColor: "#4DB7FE",
                            pointBorderWidth: 1,
                            pointHoverBorderWidth: 1,
                            lineTension: 0.3,
                            data: chartReservations.count || [],
                        },

                    ],
                }}

                height={840}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    hover: {
                        onHover: function (e) {
                            var point = this.getElementAtEvent(e);
                            if (point.length) e.target.style.cursor = 'pointer';
                            else e.target.style.cursor = 'default';
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        },
                        // yAxes: [{
                        //     ticks: {
                        //         fontColor: "rgba(0,0,0,0.2)",
                        //         fontStyle: "bold",
                        //         beginAtZero: true,

                        //         padding: 20
                        //     },
                        //     gridLines: {
                        //         display: false,
                        //         zeroLineColor: "transparent"
                        //     }

                        // }],
                        // xAxes: [{
                        //     gridLines: {
                        //         zeroLineColor: "transparent"
                        //     },

                        //     ticks: {
                        //         padding: 20,
                        //         fontColor: "rgba(0,0,0,0.5)",
                        //         fontStyle: "bold"
                        //     }
                        // }],

                    },
                    tooltips: {
                        backgroundColor: "rgba(0,0,0,0.6)",
                        titleMarginBottom: 10,
                        footerMarginTop: 6,
                        xPadding: 22,
                        yPadding: 12
                    }
                }}
            />
        </div>
    );
}

export default ChartBar;