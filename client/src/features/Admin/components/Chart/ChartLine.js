import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)

ChartLine.propTypes = {

};

function ChartLine(props) {
    const { chartUsers, chartHosts } = props;
    return (
        <div>
            <Line
                datasetIdKey='id'
                data={{
                    labels: chartUsers.milestones || [],
                    datasets: [{
                        label: 'Users',
                        fill: true,
                        animation: true,
                        backgroundColor: "rgba(94, 207, 177, 0.2)",
                        borderColor: "#5ECFB1",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointBorderColor: "#5ECFB1",
                        pointHoverBorderWidth: 1,
                        lineTension: 0.3,
                        data: chartUsers.count || [],
                    },
                    {
                        label: 'Hosts',
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
                        data: chartHosts.count || [],
                        hidden: true,
                    },
                    ],
                }}

                height={400}
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
                        y: {
                            grid: {
                                display: false
                            }
                        },

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

export default ChartLine;