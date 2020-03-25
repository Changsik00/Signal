<template>
  <section style="padding: 50px; ">
    <div style="display:flex;">언급된 이슈어</div>
    <div style="display: flex; width: 1000px; margin: auto">
      <div id="bubbleBarChart0"></div>
      <div id="bubbleBarChart1"></div>
      <div id="bubbleBarChart2"></div>
    </div>
  </section>
</template>
<script>
export default {
  props: ["keywords"],
  data() {
    return {
      categories: [],
      dataset: {
        children: [
          { name: "Cocoa", value: 5637 },
          { name: "Olives", value: 1321 },
          { name: "Tea", value: 2312 },
          { name: "Mashed Potatoes", value: 1123 },
          { name: "Boiled Potatoes", value: 1424 },
          { name: "Milk", value: 1524 },
          { name: "Chicken Salad", value: 1525 },
          { name: "Vanilla Ice Cream", value: 1676 },
          { name: "Lettuce Salad", value: 1566 },
          { name: "Lobster Salad", value: 1511 },
          { name: "Chocolate", value: 1489 },
          { name: "Apple Pie", value: 1487 },
          { name: "Orange Juice", value: 1423 },
          { name: "American Cheese", value: 1372 },
          { name: "Green Peas", value: 1341 },
          { name: "Assorted Cakes", value: 1331 },
          { name: "French Fried Potatoes", value: 1328 },
          { name: "Potato Salad", value: 1306 },
          { name: "Baked Potatoes", value: 1293 },
          { name: "Roquefort", value: 1273 },
          { name: "Stewed Prunes", value: 1268 }
        ]
      }
    };
  },
  watch: {
    keywords(value, old) {
      if (_.isEqual(value, old)) {
        return;
      }
      this.setData();
    }
  },
  created() {
    this.setData();
  },

  methods: {
    setData() {
      const params = {
        keyword: this.keywords.join(",")
      };
      this.$axios.get("/naver/related_keywords/", { params }).then(res => {
        for (var key in res.data) {
          this.categories.push(key);
        }
        this.draw("bubbleBarChart0");
        this.draw("bubbleBarChart1");
        this.draw("bubbleBarChart2");
      });
    },
    draw(id) {
      // https://github.com/d3/d3-scale-chromatic/blob/master/README.md#categorical
      var diameter = 1000 / 3;
      var fontScale = 4;
      var color = d3
        .scaleOrdinal()
        .domain(this.dataset)
        .range(d3.schemeSet3);

      var bubble = d3
        .pack(this.dataset)
        .size([diameter, diameter])
        .padding(1.5);

      d3.select("#" + id)
        .select("svg")
        .remove();

      var svg = d3
        .select("#" + id)
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

      var nodes = d3.hierarchy(this.dataset).sum(function(d) {
        return d.value;
      });

      var node = svg
        .selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d) {
          return !d.children;
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      node.append("title").text(function(d) {
        return d.name + ": " + d.value;
      });

      node
        .append("circle")
        .attr("r", function(d) {
          return d.r;
        })
        .style("fill", function(d, i) {
          return color(i);
        });

      node
        .append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
          return d.data.name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d) {
          return d.r / fontScale;
        })
        .attr("fill", "black");

      node
        .append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
          return d.data.value;
        })
        .attr("font-family", "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d) {
          return d.r / fontScale;
        })
        .attr("fill", "black");

      d3.select(self.frameElement).style("height", diameter + "px");
    }
  }
};
</script>
