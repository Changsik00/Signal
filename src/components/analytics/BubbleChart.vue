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
        children: []
      },
      currentR: 0
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
        let index = 0;
        for (var key in res.data) {
          const data = {children: []};
          res.data[key].map(d => {
            const k = Object.keys(d)[0];
            const v = d[k];
            data.children.push({name: k, value: v}); 
          });
          this.draw(`bubbleBarChart${index}`, data, key);
          index += 1;
        }
      });
    },
    draw(id, dataset, name) {
      var diameter = 1000 / 3;
      var fontScale = 4;
      var color = d3
        .scaleOrdinal()
        .domain(dataset)
        .range(d3.schemeSet3);

      var bubble = d3
        .pack(dataset)
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

      var nodes = d3.hierarchy(dataset).sum(function(d) {
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
        })
        .on("mouseover",function(d, i){
          this.currentR = d.r;
          d3.select(this)
          .attr("r",function(d){return 100;})
        })
        .on("mouseout", function(d, i) {
          d3.select(this)
          .attr("r",function(d){return this.currentR;})
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
        .attr("fill", "black")
        .on("mouseover",function(d, i){
          d3.select(this)
          .attr("font-size",function(d){return 20;})
        })
        .on("mouseout", function(d, i) {
          d3.select(this)
          .attr("font-size",function(d){return d.r / fontScale})
        });;

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
        .attr("fill", "black")
        .on("mouseover",function(d, i){
          d3.select(this)
          .attr("font-size",function(d){return 18;})
        })
        .on("mouseout", function(d, i) {
          d3.select(this)
          .attr("font-size",function(d){return d.r / fontScale})
        });;

      d3.select(self.frameElement).style("height", diameter + "px");
    }
  }
};
</script>
