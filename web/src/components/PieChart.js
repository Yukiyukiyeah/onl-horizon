import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactEcharts from "echarts-for-react";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  componentWillMount() {
  }

  render() {
    const option = {
      // color: ["rgb(135,232,105)", "rgb(228,71,71)", "rgb(46,129,225)"],
      color: ["rgb(98,218,171)", "rgb(233,108,91)", "rgb(99,149,249)"],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        top: 'bottom',
        data: ["Succeeded", "Failed", "Running"],
      },
      series: [
        {
          name: 'Machine Count',
          type: 'pie',
          radius: [20, 70],
          center: ['50%', '50%'],
          roseType: 'radius',
          data: [
            {value: this.props.data.succeeded, name: 'Succeeded'},
            {value: this.props.data.failed, name: 'Failed'},
            {value: this.props.data.running, name: 'Running'},
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            color: 'rgba(0, 0, 0, 1)',
          },
        }
      ]
    };

    return (
      <ReactEcharts style={{width: 500, height: 300, marginLeft: -80, marginRight: -80}} option={option}/>
    );
  }
}

export default withRouter(PieChart);
