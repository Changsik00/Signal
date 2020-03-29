<template>
  <section style="padding: 50px; ">
    <div style="display:flex;">언급된 이슈어</div>
    <div style="display: flex; width: 1000px; margin: auto">
      <div>
        <div id="bubbleBarChart0"></div>
        <div style="text-align: center;">{{ categories[0] }}</div>
      </div>
      <div>
        <div id="bubbleBarChart1"></div>
        <div style="text-align: center;">{{ categories[1] }}</div>
      </div>
      <div>
        <div id="bubbleBarChart2"></div>
        <div style="text-align: center;">{{ categories[2] }}</div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ["keywords"],
  data() {
    return {
      categories: [],
      currentData: null
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
      d3.select("#bubbleBarChart0")
        .select("svg")
        .remove();
      d3.select("#bubbleBarChart1")
        .select("svg")
        .remove();
      d3.select("#bubbleBarChart2")
        .select("svg")
        .remove();

      this.categories = [];

      this.$axios.get("/naver/related_keywords/", { params }).then(res => {
        let index = 0;
        for (var key in res.data) {
          const data = { children: [] };
          res.data[key].map(d => {
            const k = Object.keys(d)[0];
            const v = d[k];
            data.children.push({ name: k, value: v });
          });
          data.children = data.children
            .filter(d => Number.isInteger(d.value) && d.value > 10)
            .sort((a, b) => b.value > a.value)
            .slice(0, 15);
          this.draw(index, data, key);
          index += 1;
        }
      });
    },
    draw(index, dataset, name) {
      this.categories.push(name);
      if (dataset.children.length == 0) {
        this.$showToast(name + " : 연관 검색어가 없습니다.");
        return;
      }
      var diameter = 1000 / 3;
      var fontScale = 3.5;
      var color = d3
        .scaleOrdinal()
        .domain(dataset)
        .range(d3.schemeSet3);

      var bubble = d3
        .pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

      var sizeScale = d3.scaleSqrt().range([15, 50]);
      sizeScale.domain(d3.extent(dataset.children, d => d.value));
      bubble.radius(d => sizeScale(d.value));

      var svg = d3
        .select("#" + `bubbleBarChart${index}`)
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
          return d.data.name.substring(0, d.r / 2);
        })
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
        .attr("font-size", function(d) {
          return d.r / fontScale;
        })
        .attr("fill", "black");

      node
        .on("mouseover", function(d, i) {
          this.currentData = { ...d };
          d.depth = 10;
          d.parent.depth = 10;
          d3.select(this).attr("transform", function(d) {
            if (d.r < 50) {
              return `translate(${d.x},${d.y}) scale(${50 / d.r})`;
            } else {
              return `translate(${d.x},${d.y}) scale(1)`;
            }
          });
        })
        .on("mouseout", function(d, i) {
          d = this.currentData;
          d3.select(this).attr("transform", function(d) {
            return `translate(${d.x},${d.y}) scale(1)`;
          });
          this.currentData = null;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.node {
  cursor: pointer;
  transition: all ease 1s;
  z-index: 100;
}
</style>
