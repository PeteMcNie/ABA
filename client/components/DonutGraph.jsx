import React from 'react'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { compressObjKeystoUniqueArray, convertToPercentageOfIncome, sumPercentageValuesOfObject } from './mathfunctions'

class DonutGraph extends React.Component {
  state = {
    previousData: {}
  }

  componentDidMount () {
    // this.updateGraph(this.updateData(this.props))
    this.setState({
      previousData: { Surplus: 100 }
    })
  }

  componentDidUpdate () {
    d3.selectAll('svg > *').remove()
    const transitionData = this.updateData(this.props)
    if (this.previousData !== transitionData) {
      // console.log(this.previousData)
      // console.log(this.transitionData)
      this.updateGraph(transitionData)
    }

    // {56: 5.783125, Surplus: 71.327875, "": 19.48, df: 3.409}
    // {56: 5.783125, Surplus: 57.326625, "": 19.48, df: 3.409, rt: 14.001249999999999}
  }

  updateData = (props) => {
    const timeFrame = 30.4375 // set to a month for now
    let totalIncome = 0
    console.log(props)
    props.incomes.forEach(value => {
      totalIncome += value.amount
    })

    const MonthlyIncome = totalIncome / timeFrame

    // this function puts all categories into an array of unique values
    const categories = compressObjKeystoUniqueArray(props.expenses)

    // this function uses the unique category array to sum all amounts of that category
    const { data, sumTotalExpenses} = sumPercentageValuesOfObject(props.expenses, categories, MonthlyIncome)

    // convert values to percentage of total income
    const difference = 100 - convertToPercentageOfIncome(MonthlyIncome, sumTotalExpenses)

    data.Surplus = difference
    if (isNaN(data.Surplus)) {
      return { Surplus: 100 }
    }
    return data
  }

  updateGraph = (data) => {
    const height = 500
    const width = 500
    // const margin = 0

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width / 1.7, height / 1.7)

    // append the svg object to the div called 'donut-graph '
    const svg = d3.select('#my_dataviz')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      // attr('transform-origin', '250px, 250px')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(['#a0f5b7', '#002455', '#36a59c', '#64cda3', '#15637d'])

    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .sort(null) // Do not sort group by size
      .value(function (d) { return d.value })
    const dataReady = pie(d3.entries(data))

    // The arc generator
    const arc = d3.arc()
      .innerRadius(radius * 0.6) // This is the size of the donut hole
      .outerRadius(radius * 0.8)

    // inner border circle
    svg
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', radius * 0.56)
      .attr('stroke', 'grey')
      .attr('fill', 'white')
      .attr('stroke-width', 2)

    // inner solid circle
    svg
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', radius * 0.52)
      .attr('stroke', 'white')
      .attr('fill', '#A0F5B7')
      .attr('stroke-width', 2)

    svg
      .append('text')
      .attr('x', -30)
      .attr('y', -15)
      .style('font-family', 'Helvetica')
      .style('font-size', '15px')
      .text('you spent')

    svg
      .append('text')
      .attr('x', -35)
      .attr('y', 15)
      .style('font-family', 'Helvetica')
      .style('font-size', '30px')
      .text('$1615')

    // svg
    //   .append('rect')
    //   .attr('width', 100)
    //   .attr('height', 100)
    //   .style('fill', 'rgb(0,0,255)')
    //   .style('font-size', '30px')
    //   .text('$1615')

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('allSlices')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d) { return (color(d.data.key)) })
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)
  }

  render () {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    incomes: state.income,
    expenses: state.expense
  }
}

export default connect(mapStateToProps)(DonutGraph)
