<template>
  <section
    style="background-color: white; width: 100%; height: 100%; overflow-y: auto"
  >
    <section class="container">
      <div style="font-size: 24px; font-weight: bold; margin-top: 30px;">
        실시간 검색어
      </div>
      <div>
        매일 일어난 실시간 검색어를 12시간 누적데이터 기준으로 정리하여
        제공합니다.
      </div>
      <div style="margin-top: 20px; color: ##5C5C5C; font-weight: bold;">
        {{ date }} ~ 현재
      </div>
      <svg width="1024" height="400" />
      <div v-for="(d, i) in totalResultTop10" :key="i">
        <div style="display:flex">
          <div style="color: #5C5C5C; font-weight: bold;">
            누적 검색 {{ i + 1 }}위
          </div>
          <div style="color: #3CAEA3; font-weight: bold; margin-left: 10px;">
            {{ d.name }} [검색량 : {{ d.value }}]
          </div>
        </div>

        <div
          style="display: flex; margin: 10px 30px 20px 30px; cursor: pointer"
          @click="link(d.link)"
        >
          <img
            style="width: auto; height: 100px; object-fit: contain;"
            :src="d.image"
          />
          <div style="margin-left: 20px;">
            <div
              style="font-size: 18px; font-weight: bold;"
              v-html="d.title"
            ></div>
            <div v-html="d.description"></div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import "../assets/js/history-chart/config.js";
export default {
  data() {
    return {
      date: "",
      totalResultTop10: []
    };
  },
  mounted() {
    const now = new Date();
    now.setHours(now.getHours() - 12);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      hour12: true,
      minute: "numeric"
    };
    this.date = now.toLocaleDateString("ko-KR", options);

    this.$axios
      .get("/naver/hot_issues/")
      .then(res => {
        const chartData = [];
        const groupData = _.groupBy(res.data, d => d.date);
        var holder = {};
        for (var date in groupData) {
          groupData[date].forEach(d => {
            if (holder.hasOwnProperty(d.name)) {
              d.value = holder[d.name].value + (11 - d.value);
            } else {
              d.value = 11 - d.value;
            }
            holder[d.name] = d;
          });
          for (var name in holder) {
            chartData.push({
              name: name,
              date: date,
              value: holder[name].value
            });
          }
        }
        const totalResult = [];
        for (var prop in holder) {
          totalResult.push(holder[prop]);
        }

        const top10 = totalResult
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);
        this.requestTop10(top10);
        this.draw(chartData);
      })
      .catch(error => {});
  },
  methods: {
    link(l) {
      window.open(l);
    },
    async requestTop10(top10) {
      this.totalResultTop10 = [];
      const imageURL = "/naver/ogimage/?url=";
      top10.forEach(async d => {
        const imageResult = await this.$axios.get(imageURL + d.link);
        if (
          imageResult.data.image.startsWith("http") &&
          (imageResult.data.image.endsWith("png") ||
            imageResult.data.image.endsWith("jpg"))
        ) {
          d.image = imageResult.data.image;
        } else {
          d.image = "";
        }
        this.totalResultTop10.push(d);
        this.totalResultTop10.sort((a, b) => b.value - a.value);
      });
    },
    draw(data) {
      const config = {
        encoding: "UTF-8",
        max_number: 10,
        auto_sort: false,
        timeFormat: "%Y-%m-%d",
        reverse: false,
        // divide_by: "type",
        divide_by: "value",
        divide_color_by: "name",
        color: {},
        changeable_color: false,
        divide_changeable_color_by_type: false,
        color_range: [
          "#990000",
          "#cccc00",
          "#009900",
          "#004c99",
          "#4c0099",
          "#99004c",
          "#66b2ff",
          "#a0a0a0a"
        ],
        itemLabel: "左侧文字",
        typeLabel: "右侧文字",
        item_x: 250,

        // interval_time: 1,
        interval_time: 0.4,
        text_y: -50,
        text_x: 1000,
        offset: 350,
        display_barInfo: 0,

        use_counter: false,
        step: 1,
        format: ",.0f",
        postfix: "",
        deformat: function(val, postfix) {
          return Number(val.replace(postfix, "").replace(/\,/g, ""));
        },
        left_margin: 50,
        right_margin: 150,
        top_margin: 50,
        bottom_margin: 50,
        dateLabel_switch: true,
        dateLabel_x: null,
        dateLabel_y: null,
        allow_up: false,
        always_up: false,
        enter_from_0: true,
        big_value: true,
        use_semilogarithmic_coordinate: false,
        long: false,
        wait: 0,
        update_rate: 1,
        showLabel: false,
        labelx: -10,
        use_img: false,
        background_color: "#FFFFFF",
        rounded_rectangle: true,
        show_x_tick: true,
        bar_name_max: 30
      };

      var date = [];
      data.forEach(element => {
        if (date.indexOf(element["date"]) == -1) {
          date.push(element["date"]);
        }
      });
      var rate = [];
      var auto_sort = config.auto_sort;
      var time = date;
      if (auto_sort) {
        time = date.sort((x, y) => new Date(x) - new Date(y));
      }
      var use_semilogarithmic_coordinate =
        config.use_semilogarithmic_coordinate;
      var big_value = config.big_value;
      var divide_by = config.divide_by;
      var divide_color_by = config.divide_color_by;
      var name_list = [];
      var changeable_color = config.changeable_color;
      var divide_changeable_color_by_type =
        config.divide_changeable_color_by_type;
      data
        .sort((a, b) => Number(b.value) - Number(a.value))
        .forEach(e => {
          if (name_list.indexOf(e.name) == -1) {
            name_list.push(e.name);
          }
        });
      var baseTime = 3000;

      function getColor(d) {
        var r = 0.0;
        if (changeable_color) {
          var colorRange = d3.interpolateCubehelix(
            config.color_range[0],
            config.color_range[1]
          );
          if (
            divide_changeable_color_by_type &&
            d["type"] in config.color_ranges
          ) {
            var colorRange = d3.interpolateCubehelix(
              config.color_ranges[d["type"]][0],
              config.color_ranges[d["type"]][1]
            );
          }
          var v =
            Math.abs(rate[d.name] - rate["MIN_RATE"]) /
            (rate["MAX_RATE"] - rate["MIN_RATE"]);
          if (isNaN(v) || v == -1) {
            return colorRange(0.6);
          }
          return colorRange(v);
        }

        if (d[divide_color_by] in config.color)
          return config.color[d[divide_color_by]];
        else {
          return d3.schemeCategory10[
            Math.floor(d[divide_color_by].charCodeAt() % 10)
          ];
        }
      }

      var allow_up = config.allow_up;
      var always_up = config.always_up;
      var interval_time = config.interval_time;
      var text_y = config.text_y;
      var itemLabel = config.itemLabel;
      var typeLabel = config.typeLabel;
      var display_barInfo = config.display_barInfo;
      var use_type_info = false;
      var use_counter = config.use_counter;
      var step = config.step;
      var long = config.long;
      var format = config.format;
      var left_margin = config.left_margin;
      var right_margin = config.right_margin;
      var top_margin = config.top_margin;
      var bottom_margin = config.bottom_margin;
      var timeFormat = config.timeFormat;
      var item_x = config.item_x;
      var max_number = config.max_number;
      var reverse = config.reverse;
      var text_x = config.text_x;
      var offset = config.offset;
      var animation = config.animation;
      var deformat = config.deformat;

      const margin = {
        left: left_margin,
        right: right_margin,
        top: top_margin,
        bottom: bottom_margin
      };

      var enter_from_0 = config.enter_from_0;
      interval_time /= 3;
      var lastData = [];
      var currentdate = time[0].toString();
      var currentData = [];
      var lastname;
      const svg = d3.select("svg");

      const width = svg.attr("width");
      const height = svg.attr("height");
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom - 32;
      //var dateLabel_y = height - margin.top - margin.bottom - 32;;
      const xValue = d => Number(d.value);
      const yValue = d => d.name;

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      const xAxisG = g
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`);
      const yAxisG = g.append("g");

      xAxisG
        .append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", 100);

      var xScale = d3.scaleLinear();
      if (use_semilogarithmic_coordinate) {
        xScale = d3.scalePow().exponent(0.5);
      } else {
        xScale = d3.scaleLinear();
      }
      const yScale = d3
        .scaleBand()
        .paddingInner(0.3)
        .paddingOuter(0);

      const xTicks = 10;
      const xAxis = d3
        .axisBottom()
        .scale(xScale)
        .ticks(xTicks)
        .tickPadding(20)
        .tickFormat(d => {
          if (d <= 0) {
            return "";
          }
          return d;
        })
        .tickSize(-innerHeight);

      const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .tickPadding(5)
        .tickSize(-innerWidth);

      var dateLabel_switch = config.dateLabel_switch;
      var dateLabel_x = config.dateLabel_x;
      var dateLabel_y = config.dateLabel_y;
      if (dateLabel_x == null || dateLabel_y == null) {
        dateLabel_x = innerWidth;
        dateLabel_y = innerHeight;
      }
      if (dateLabel_switch == false) {
        dateLabel_switch = "hidden";
      } else {
        dateLabel_switch = "visible";
      }

      var dateLabel = g
        .insert("text")
        .data(currentdate)
        .attr("class", "dateLabel")
        .attr("style:visibility", dateLabel_switch)
        .attr("x", dateLabel_x)
        .attr("y", dateLabel_y)
        .attr("text-anchor", function() {
          return "end";
        })
        .text(currentdate);

      var topLabel = g
        .insert("text")
        .attr("class", "topLabel")
        .attr("x", item_x)
        .attr("y", text_y);

      function dataSort() {
        if (reverse) {
          currentData.sort(function(a, b) {
            if (Number(a.value) == Number(b.value)) {
              var r1 = 0;
              var r2 = 0;
              for (let index = 0; index < a.name.length; index++) {
                r1 = r1 + a.name.charCodeAt(index);
              }
              for (let index = 0; index < b.name.length; index++) {
                r2 = r2 + b.name.charCodeAt(index);
              }
              return r2 - r1;
            } else {
              return Number(a.value) - Number(b.value);
            }
          });
        } else {
          currentData.sort(function(a, b) {
            if (Number(a.value) == Number(b.value)) {
              var r1 = 0;
              var r2 = 0;
              for (let index = 0; index < a.name.length; index++) {
                r1 = r1 + a.name.charCodeAt(index);
              }
              for (let index = 0; index < b.name.length; index++) {
                r2 = r2 + b.name.charCodeAt(index);
              }
              return r2 - r1;
            } else {
              return Number(b.value) - Number(a.value);
            }
          });
        }
      }

      function getCurrentData(date) {
        let rate = [];
        currentData = [];
        let tail = "";
        data.forEach(element => {
          if (element["date"] == date && parseFloat(element["value"]) != 0) {
            currentData.push(element);
          }
        });

        rate["MAX_RATE"] = 0;
        rate["MIN_RATE"] = 1;
        currentData.forEach(e => {
          lastData.forEach(el => {
            if (el.name == e.name) {
              rate[e.name] = Number(Number(e.value) - Number(el.value));
            }
          });
          if (rate[e.name] == undefined) {
            rate[e.name] = rate["MIN_RATE"];
          }
          if (rate[e.name] > rate["MAX_RATE"]) {
            rate["MAX_RATE"] = rate[e.name];
          } else if (rate[e.name] < rate["MIN_RATE"]) {
            rate["MIN_RATE"] = rate[e.name];
          }
        });
        dataSort();
        currentData = currentData.slice(0, max_number);

        d3.transition("2")
          .each(redraw)
          .each(change);
        lastData = currentData;
      }

      var lastname;
      var counter = {
        value: 1
      };

      var avg = 0;
      var enter_from_now = true;

      function redraw() {
        if (currentData.length == 0) return;
        if (big_value) {
          xScale
            .domain([
              2 * d3.min(currentData, xValue) - d3.max(currentData, xValue),
              d3.max(currentData, xValue) + 10
            ])
            .range([0, innerWidth]);
        } else {
          xScale
            .domain([0, d3.max(currentData, xValue) + 1])
            .range([0, innerWidth]);
        }
        if (auto_sort) {
          dateLabel
            .data(currentData)
            .transition()
            .duration(baseTime * interval_time)
            .ease(d3.easeLinear)
            .tween("text", function(d) {
              var self = this;
              var i = d3.interpolateDate(
                new Date(self.textContent),
                new Date(d.date)
              );
              return function(t) {
                var dateformat = d3.timeFormat(timeFormat);
                self.textContent = dateformat(i(t));
              };
            });
        } else {
          dateLabel.text(currentdate);
        }

        xAxisG
          .transition()
          .duration(baseTime * interval_time)
          .ease(d3.easeLinear)
          .call(xAxis);
        yAxisG
          .transition()
          .duration(baseTime * interval_time)
          .ease(d3.easeLinear)
          .call(yAxis);

        yAxisG.selectAll(".tick").remove();
        if (!config.show_x_tick) {
          xAxisG.selectAll(".tick").remove();
        }

        yScale
          .domain(currentData.map(d => d.name).reverse())
          .range([innerHeight, 0]);

        var bar = g.selectAll(".bar").data(currentData, function(d) {
          return d.name;
        });

        var barEnter = bar
          .enter()
          .insert("g", ".axis")
          .attr("class", "bar")
          .attr("transform", function(d) {
            return "translate(0," + yScale(yValue(d)) + ")";
          });

        if (config.use_img) {
          barEnter
            .append("defs")
            .append("pattern")
            .attr("id", d => d.name)
            .attr("width", "100%")
            .attr("height", "100%")
            .append("image")
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", "40")
            .attr("height", "40")
            .attr("href", d => config.imgs[d.name]);

          barEnter
            .append("circle")
            .attr("fill-opacity", 0)
            .attr("cy", 63)
            .attr(
              "fill",
              d =>
                "url(#" +
                encodeURIComponent(d.name)
                  .replace("'", "%27")
                  .replace("(", "%28")
                  .replace(")", "%29") +
                ")"
            )
            .attr("stroke-width", "0px")
            .transition("a")
            .delay(500 * interval_time)
            .duration(2490 * interval_time)
            .attr("stroke", d => getColor(d))
            .attr("stroke-width", "4px")
            .attr("x", -16)
            .attr("cx", -22)
            .attr("cy", 13)
            .attr("r", 40 / 2)
            .attr("fill-opacity", 1);
        }
        const barHeight = 10;
        barEnter
          .append("rect")
          .attr("width", function(d) {
            if (enter_from_0) {
              return 0;
            } else {
              return xScale(currentData[currentData.length - 1].value);
            }
          })
          .attr("fill-opacity", 0)
          .attr("height", barHeight)
          .attr("y", 50)
          .style("fill", d => getColor(d))
          .transition("a")
          .delay(500 * interval_time)
          .duration(2490 * interval_time)
          .attr("y", 0)
          .attr("width", d => xScale(xValue(d)))
          .attr("fill-opacity", 1);

        if (config.rounded_rectangle) {
          d3.selectAll("rect").attr("rx", barHeight / 2);
        }
        if (config.showLabel) {
          barEnter
            .append("text")
            .attr("y", 20)
            .attr("fill-opacity", 0)
            .style("fill", d => getColor(d))
            .transition("2")
            .delay(500 * interval_time)
            .duration(2490 * interval_time)
            .attr("fill-opacity", 1)
            .attr("y", 0)
            .attr("class", function(d) {
              return "label ";
            })
            .attr("x", config.labelx)
            .attr("y", 20)
            .attr("text-anchor", "end")
            .text(function(d) {
              if (long) {
                return "";
              }
              return d.name;
            });
        }

        var barInfo = barEnter
          .append("text")
          .attr("x", function(d) {
            if (long) return 10;
            if (enter_from_0) {
              return 0;
            } else {
              return xScale(currentData[currentData.length - 1].value);
            }
          })
          .attr("stroke", d => getColor(d))
          .attr("class", function() {
            return "barInfo";
          })
          .attr("y", 50)
          .attr("stroke-width", "0px")
          .attr("fill-opacity", 0)
          .transition()
          .delay(500 * interval_time)
          .duration(2490 * interval_time)
          .text(function(d) {
            if (use_type_info) {
              return d[divide_by] + "-" + d.name;
            }
            return d.name;
          })
          .attr("x", d => {
            if (long) return 10;
            return xScale(xValue(d)) - 10;
          })
          .attr("fill-opacity", function(d) {
            if (xScale(xValue(d)) - 10 < display_barInfo) {
              return 0;
            }
            return 1;
          })
          .attr("y", 2)
          .attr("dy", ".5em")
          .attr("text-anchor", function() {
            if (long) return "start";
            return "end";
          })
          .attr("stroke-width", function(d) {
            if (xScale(xValue(d)) - 10 < display_barInfo) {
              return "0px";
            }
            return "1px";
          });
        if (long) {
          barInfo.tween("text", function(d) {
            var self = this;
            self.textContent = d.value;
            var i = d3.interpolate(self.textContent, Number(d.value)),
              prec = (Number(d.value) + "").split("."),
              round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
            return function(t) {
              self.textContent =
                d[divide_by] +
                "-" +
                d.name +
                "  数值:" +
                d3.format(format)(Math.round(i(t) * round) / round);
            };
          });
        }
        if (!long) {
          barEnter
            .append("text")
            .attr("x", function() {
              if (long) {
                return 10;
              }
              if (enter_from_0) {
                return 0;
              } else {
                return xScale(currentData[currentData.length - 1].value);
              }
            })
            .attr("y", 50)
            .attr("fill-opacity", 0)
            .style("fill", d => getColor(d))
            .transition()
            .duration(2990 * interval_time)
            .tween("text", function(d) {
              var self = this;
              self.textContent = d.value * 0.9;
              var i = d3.interpolate(self.textContent, Number(d.value)),
                prec = (Number(d.value) + "").split("."),
                round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
              return function(t) {
                self.textContent =
                  d3.format(format)(Math.round(i(t) * round) / round) +
                  config.postfix;
              };
            })
            .attr("fill-opacity", 1)
            .attr("y", 0)
            .attr("class", function(d) {
              return "value";
            })
            .attr("x", d => {
              return xScale(xValue(d)) + 10;
            })
            .attr("y", 22);
        }
        var barUpdate = bar
          .transition("2")
          .duration(2990 * interval_time)
          .ease(d3.easeLinear);

        barUpdate
          .select("rect")
          .style("fill", d => getColor(d))
          .attr("width", d => xScale(xValue(d)));
        if (config.showLabel) {
          barUpdate
            .select(".label")
            .attr("class", function(d) {
              return "label ";
            })
            .style("fill", d => getColor(d))
            .attr("width", d => xScale(xValue(d)));
        }
        if (!long) {
          barUpdate
            .select(".value")
            .attr("class", function(d) {
              return "value";
            })
            .style("fill", d => getColor(d))
            .attr("width", d => xScale(xValue(d)));
        }
        barUpdate.select(".barInfo").attr("stroke", function(d) {
          return getColor(d);
        });

        if (config.use_img) {
          barUpdate.select("circle").attr("stroke", function(d) {
            return getColor(d);
          });
        }

        var barInfo = barUpdate
          .select(".barInfo")
          .text(function(d) {
            if (use_type_info) {
              return d[divide_by] + "-" + d.name;
            }
            return d.name;
          })
          .attr("x", d => {
            if (long) return 10;
            return xScale(xValue(d)) - 10;
          })
          .attr("fill-opacity", function(d) {
            if (xScale(xValue(d)) - 10 < display_barInfo) {
              return 0;
            }
            return 1;
          })
          .attr("stroke-width", function(d) {
            if (xScale(xValue(d)) - 10 < display_barInfo) {
              return "0px";
            }
            return "1px";
          });

        if (long) {
          barInfo.tween("text", function(d) {
            var self = this;
            var str = d[divide_by] + "-" + d.name + "  数值:";

            var i = d3.interpolate(
                self.textContent.slice(str.length, 99),
                Number(d.value)
              ),
              prec = (Number(d.value) + "").split("."),
              round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
            return function(t) {
              self.textContent =
                d[divide_by] +
                "-" +
                d.name +
                "  数值:" +
                d3.format(format)(Math.round(i(t) * round) / round);
            };
          });
        }
        if (!long) {
          barUpdate
            .select(".value")
            .tween("text", function(d) {
              var self = this;

              // if postfix is blank, do not slice.
              if (config.postfix == "") {
                var i = d3.interpolate(self.textContent, Number(d.value));
              } else {
                var i = d3.interpolate(
                  self.textContent.slice(0, -config.postfix.length),
                  Number(d.value)
                );
              }

              var i = d3.interpolate(
                deformat(self.textContent, config.postfix),
                Number(d.value)
              );

              var prec = (Number(d.value) + "").split("."),
                round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
              return function(t) {
                self.textContent =
                  d3.format(format)(Math.round(i(t) * round) / round) +
                  config.postfix;
              };
            })
            .duration(2990 * interval_time)
            .attr("x", d => xScale(xValue(d)) + 10);
        }
        avg =
          (Number(currentData[0]["value"]) +
            Number(currentData[currentData.length - 1]["value"])) /
          2;

        var barExit = bar
          .exit()
          .attr("fill-opacity", 1)
          .transition()
          .duration(2500 * interval_time);
        barExit
          .attr("transform", function(d) {
            if (always_up) {
              return "translate(0," + "-100" + ")";
            }
            if (Number(d.value) > avg && allow_up) {
              return "translate(0," + "-100" + ")";
            }
            return "translate(0," + "1000" + ")";
          })
          .remove()
          .attr("fill-opacity", 0);
        barExit
          .select("rect")
          .attr("fill-opacity", 0)
          .attr("width", () => {
            if (always_up) return xScale(0);
            return xScale(currentData[currentData.length - 1]["value"]);
          });
        if (!long) {
          barExit
            .select(".value")
            .attr("fill-opacity", 0)
            .attr("x", () => {
              if (always_up) return xScale(0);
              return xScale(currentData[currentData.length - 1]["value"]);
            });
        }
        barExit
          .select(".barInfo")
          .attr("fill-opacity", 0)
          .attr("stroke-width", function(d) {
            return "0px";
          })
          .attr("x", () => {
            if (long) return 10;
            if (always_up) return xScale(0);
            return xScale(currentData[currentData.length - 1]["value"]);
          });
        barExit.select(".label").attr("fill-opacity", 0);
        if (config.use_img) {
          barExit.select("circle").attr("fill-opacity", 0);
        }
      }

      function change() {
        yScale
          .domain(currentData.map(d => d.name).reverse())
          .range([innerHeight, 0]);
        if (animation == "linear") {
          g.selectAll(".bar")
            .data(currentData, function(d) {
              return d.name;
            })
            .transition("1")
            .ease(d3.easeLinear)
            .duration(baseTime * update_rate * interval_time)
            .attr("transform", function(d) {
              return "translate(0," + yScale(yValue(d)) + ")";
            });
        } else {
          g.selectAll(".bar")
            .data(currentData, function(d) {
              return d.name;
            })
            .transition("1")
            .duration(baseTime * update_rate * interval_time)
            .attr("transform", function(d) {
              return "translate(0," + yScale(yValue(d)) + ")";
            });
        }
      }

      var i = 0;
      var p = config.wait;
      var update_rate = config.update_rate;
      var inter = setInterval(function next() {
        while (p) {
          p -= 1;
          return;
        }
        currentdate = time[i];
        getCurrentData(time[i]);
        i++;

        if (i >= time.length) {
          setTimeout(() => window.clearInterval(inter), 0);
        }
      }, baseTime * interval_time);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/history-chart.css";
</style>
