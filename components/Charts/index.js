import * as d3 from "d3";
import myDataset from "../../pages/api/worldPopulation.json";

const dateParser = d3.timeParse("%Y-%m-%d");

const dataset = myDataset.map((item, idx) => {
  item.id = idx + 1;
  return item;
});

async function drawScatterChart() {
  const xAccessor = d => d["id"];
  const yAccessor = d => d["2018"];

  const colorAccessor = d => {
    if (d["Country Code"] === "LBR") {
      return "red";
    } else if (d["Country Code"] === "USA") {
      return "blue";
    } else {
      return "gray";
    }
  };
  const colorScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, colorAccessor))
    .range(["skyblue", "darkslategrey"]);
  //Math.min will return NaN if there is a value in the array that can’t be
  //converted into a number, whereas d3.min will ignore it
  const width = d3.min([window.innerWidth * 0.9, window.innerHeight * 0.9]);

  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 100
    }
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);
  const bounds = wrapper
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const dots = bounds
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(xAccessor(d)))
    .attr("cy", d => yScale(yAccessor(d)))
    .attr("r", 5)
    .attr("fill", d => colorAccessor(d));

  const xAxisGenerator = d3.axisBottom().scale(xScale);
  const xAxis = bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${dimensions.boundedHeight}px)`);

  const xAxisLabel = xAxis
    .append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .html("Country");
  const yAxisGenerator = d3
    .axisLeft()
    .scale(yScale)
    .ticks(4);
  const yAxis = bounds.append("g").call(yAxisGenerator);
  const yAxisLabel = yAxis
    .append("text")
    .attr("x", -dimensions.boundedHeight / 2)
    .attr("y", -dimensions.margin.left + 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .text("2018 Population")
    .style("transform", "rotate(-90deg)")
    .style("text-anchor", "middle");
  const tooltip = d3.select("#tooltip");
  function onMouseEnter(datum, index) {}
  function onMouseLeave() {}
  bounds
    .selectAll("circle")
    .on("mouseenter", onMouseEnter)
    .on("mouseleave", onMouseLeave);
}

export default drawScatterChart;
