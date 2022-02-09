import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)

ChartLineEarnings.propTypes = {

};

function ChartLineEarnings(props) {
    const { chartEarnings } = props;
    return (
        <div>
            <Line
                datasetIdKey='id'
                data={{
                    labels: chartEarnings.milestones || [],
                    datasets: [{
                        label: 'Total Revenue',
                        fill: true,
                        animation: true,
                        backgroundColor: "rgba(94, 207, 177, 0.2)",
                        borderColor: "#5ECFB1",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointBorderColor: "#5ECFB1",
                        pointHoverBorderWidth: 1,
                        lineTension: 0.3,
                        data: chartEarnings.total || [],
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

export default ChartLineEarnings;