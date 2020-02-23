<template>
  <section style="padding: 50px; ">
    <div style="display:flex;">검색량 (수집기간: 전체기간)</div>
    <div id="verticalBarChart" style="width: 800px; margin: auto"></div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      groupData: [
        {
          key: "뉴스",
          values: [
            { groupName: "Team1", groupValue: 26 },
            { groupName: "Team2", groupValue: 15 },
            { groupName: "Team3", groupValue: 48 }
          ]
        },
        {
          key: "카페",
          values: [
            { groupName: "Team1", groupValue: 14 },
            { groupName: "Team2", groupValue: 23 },
            { groupName: "Team3", groupValue: 5 }
          ]
        },
        {
          key: "블로그",
          values: [
            { groupName: "Team1", groupValue: 32 },
            { groupName: "Team2", groupValue: 9 },
            { groupName: "Team3", groupValue: 25 }
          ]
        },
        {
          key: "기타",
          values: [
            { groupName: "Team1", groupValue: 41 },
            { groupName: "Team2", groupValue: 55 },
            { groupName: "Team3", groupValue: 26 }
          ]
        }
      ]
    };
  },
  mounted() {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var x0 = d3
      .scaleBand()
      .rangeRound([0, width], 0.5)
      .paddingInner(0.3);
    var x1 = d3.scaleBand().padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var xAxis = d3
      .axisBottom()
      .scale(x0)
      .tickValues(this.groupData.map(d => d.key));

    var yAxis = d3.axisLeft().scale(y);
    const color = d3.scaleOrdinal(d3.schemeSet3);

    var svg = d3
      .select("#verticalBarChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var categoriesNames = this.groupData.map(function(d) {
      return d.key;
    });
    var rateNames = this.groupData[0].values.map(function(d) {
      return d.groupName;
    });

    x0.domain(categoriesNames);
    x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
    y.domain([
      0,
      d3.max(this.groupData, function(key) {
        return d3.max(key.values, function(d) {
          return d.groupValue;
        });
      })
    ]);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .style("opacity", "0")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .text("Value");

    svg
      .select(".y")
      .transition()
      .duration(500)
      .delay(1300)
      .style("opacity", "1");

    var slice = svg
      .selectAll(".slice")
      .data(this.groupData)
      .enter()
      .append("g")
      .attr("class", "g")
      .attr("transform", function(d) {
        return "translate(" + x0(d.key) + ",0)";
      });

    slice
      .selectAll("rect")
      .data(function(d) {
        return d.values;
      })
      .enter()
      .append("rect")
      .attr("width", x1.bandwidth())
      .attr("x", function(d) {
        return x1(d.groupName);
      })
      .style("fill", function(d) {
        return color(d.groupName);
      })
      .attr("y", function(d) {
        return y(0);
      })
      .attr("height", function(d) {
        return height - y(0);
      })
      .on("mouseover", function(d) {
        d3.select(this).style("fill", d3.rgb(color(d.groupName)).darker(2));
      })
      .on("mouseout", function(d) {
        d3.select(this).style("fill", color(d.groupName));
      });

    slice
      .selectAll("rect")
      .transition()
      .delay(function(d) {
        return Math.random() * 1000;
      })
      .duration(1000)
      .attr("y", function(d) {
        return y(d.groupValue);
      })
      .attr("height", function(d) {
        return height - y(d.groupValue);
      });

    //Legend
    var legend = svg
      .selectAll(".legend")
      .data(
        this.groupData[0].values
          .map(function(d) {
            return d.groupName;
          })
          .reverse()
      )
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      })
      .style("opacity", "0");

    legend
      .append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) {
        return color(d);
      });

    legend
      .append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {
        return d;
      });

    legend
      .transition()
      .duration(500)
      .delay(function(d, i) {
        return 1300 + 100 * i;
      })
      .style("opacity", "1");
  }
};
</script>
<style lang="scss" scoped>
.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.x.axis path {
  display: none;
}

.x.axis {
  font-size: 15px;
}
</style>
