<template>
  <section class="container">
    <div style="font-size: 24px; font-weight: bold; margin-top: 30px;">실시간 검색어</div>
    <div>매일 일어난 실시간 검색어를 12시간 누적데이터 기준으로 정리하여 제공합니다.</div>
    <div style="margin-top: 20px; color: ##5C5C5C; font-weight: bold;">{{date}} ~ 현재</div>
    <svg width="1024" height="400" />
    <div v-for="index in 10" :key="index">
      <div style="color: ##5C5C5C; font-weight: bold;">누적 검색 {{index}}위</div>
      <div style="display: flex; margin: 10px 30px 20px 30px;">
        <img style="width: 40px; height: 40px;" src />
        <div style="margin-left: 20px;">
          <div>title</div>
          <div>desc</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "../assets/js/history-chart/config.js";
import dummy from "../assets/js/history-chart/example.json";
import { async } from 'q';
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

    const chartData = dummy;

    var holder = {};
    chartData.forEach(d => {
      if (holder.hasOwnProperty(d.name)) {
        holder[d.name] = holder[d.name] + d.value;
      } else {
        holder[d.name] = d.value;
      }
      d.value = holder[d.name];
    });
    var totalResult = [];
    for (var prop in holder) {
      totalResult.push({ name: prop, value: holder[prop] });
    }
    const temp = totalResult.sort((a, b) => b.value - a.value).slice(0, 10);
    this.requestTop10(temp);
    this.draw(chartData);
  },
  methods: {
    async requestTop10(top10) {
      const newsURL = "https://test.signal.bz/api/news/";
      const imageURL = "https://test.signal.bz/api/ogimage/?url=";
    
      top10.forEach(async d => {
        const result =  await this.$axios.get(newsURL, {params: { keyword: d.name}});
        if(result.status == 200 && result.data && result.data.items && result.data.items.length > 0) {
          const item = result.data.items[0];
          const imageResult = await this.$axios.get(imageURL + item.link);
          if (imageResult.data.image.startsWith("http") && (imageResult.data.image.endsWith("png") || imageResult.data.image.endsWith("jpg"))) {
            item.image = imageResult.data.image;
          }else {
            item.image = '';
          }
          this.totalResultTop10.push(item);
        }
      });
      console.log("#@# result", this.totalResultTop10)
    },
    draw(data) {
      const config = {
        // 数据源的编码方式。
        // 默认为UTF-8。
        // 如果是国内用户，且使用旧版Execl处理数据，保存的编码很可能是GBK的，如果出现乱码则将这里改成GBK。
        // 不建议修改这里。而是建议将自己制作完毕的csv文件的内容复制到example.csv中。因为example.csv的编码格式是所有语言都支持的。
        // Encoding is not recommended to be modified.
        // Instead, it is recommended to copy the contents of the CSV file produced by yourself to example.csv.
        // The encoding format of example.csv is supported by all languages.
        encoding: "UTF-8",

        // 每个时间节点最多显示的条目数。
        max_number: 20,

        // 控制是否显示顶部附加信息文字。
        showMessage: false,

        // 时间自动排序。
        // !!!请确保打开此项时，使用的是标准日期格式！(即：YYYY-MM-DD HH:MM)
        // 如果关闭，排序顺序为csv表格的时间字段自上而下的出现顺序。
        // 如果你的日期格式为标准的日期格式，则可以无视数据排序，达到自动按照日期顺序排序的效果。
        // 开启auto_sort可以实现时间的自动补间。
        // Auto Sort by Time
        // Please ensure using standard datetime format (YYYY-MM-DD HH:MM) when this term is enabled!!!
        auto_sort: false,

        // 时间格式化
        timeFormat: "%Y-%m-%d",

        // 倒序，使得最短的条位于最上方
        reverse: false,

        // 类型根据什么字段区分？如果是name，则关闭类型显示
        divide_by: "type",

        // 颜色根据什么字段区分？
        divide_color_by: "name",

        // 字段的值与其对应的颜色值
        color: {
          Chinese: "#1177CC",
          Japanese: "#667788"
        },

        // 颜色渐变：颜色绑定增长率
        changeable_color: false,

        // 添加功能：不同类型的增长率所用渐变色不同(暗→亮)
        // 如果该项为false，那么所有条目全部按照color_range变色
        // 如果该项为true，那么按照src/color_ranges.js中的color_ranges变色，默认色板为color_range
        // 一个具体的设置模板见src/_color_ranges.js，将其更名为color_ranges.js再设置即可
        divide_changeable_color_by_type: false,
        color_range: [
          "#ff7e5f",
          "#feb47b",
          "#3a6073",
          "#3a7bd5",
          "#11998e",
          "#38ef7d"
        ],
        // color_ranges: {
        //   label1: ["#3a6073", "#3a7bd5"],
        //   label2: ["#11998e", "#38ef7d"]
        // },

        // 附加信息内容。
        // left label
        itemLabel: "左侧文字",

        // right label
        typeLabel: "右侧文字",

        // 榜首项目信息的水平位置 。
        // Top item information horizontal location
        item_x: 250,

        // 时间点间隔时间。
        interval_time: 1,

        // 上方文字水平高度。
        text_y: -50,

        // 右侧文字横坐标
        text_x: 1000,
        // 偏移量
        offset: 350,

        // 长度小于display_barInfo的bar将不显示barInfo。
        // Hide barInfo if bar is shorter than barInfo
        display_barInfo: 0,

        // 使用计数器
        // 注意！使用计时器和使用类型目前不能兼容，即不能同时开启！
        // 计数器会出现在右上角，记录着当前榜首的持续时间。
        use_counter: false,
        // 每个时间节点对于计数器的步长。
        // 比如时间节点日期的间隔可能为1周（七天），那么step的值就应该为7。
        step: 1,

        //////////////////////////////////////////////////////////////////////////////
        // 格式化数值
        // 这里控制着数值的显示位数。主要靠修改中间的数字完成，如果为1则为保留一位小数。
        // 逗号表示每隔三位数用","分割
        // '.2f' means keeping two decimals.
        format: ",.0f",

        // 后缀
        postfix: "",

        // 如果看不懂这是在干什么的话，建议不要修改这里。
        // 反格式化函数:
        // 格式化操作可能会导致NaN问题。此函数将格式化后的数值反格式化为JS可以识别的数字。
        deformat: function(val, postfix) {
          return Number(val.replace(postfix, "").replace(/\,/g, ""));
        },
        //////////////////////////////////////////////////////////////////////////////

        // 图表左右上下间距。
        // 注意，left_margin不包括左侧的label，修改数值较小会导致左侧label不显示
        left_margin: 50,
        right_margin: 150,
        top_margin: 50,
        bottom_margin: 50,

        // 是否开启时间标签。
        dateLabel_switch: true,
        // 时间标签坐标。建议x：1000 y：-50开始尝试，默认位置为x:null,y:null
        dateLabel_x: null,
        dateLabel_y: null,

        // 允许大于平均值的条消失时上浮。
        allow_up: false,

        // 所有条目上浮 - 用于反向排行榜等情况
        always_up: false,

        // 设置动画效果，如果为true，则新进入的条目从0开始。
        enter_from_0: true,

        // 如果所有数字都很大，导致拉不开差距则开启此项使得坐标原点变换为（最小值）*2-（最大值）
        big_value: true,

        // 如果要使用半对数坐标，则开启此项
        use_semilogarithmic_coordinate: false,

        // barinfo太长？也许可以试试这个
        long: false,

        // 延迟多少个时间节点开始
        wait: 0,

        // 单独控制交换动画速度倍率
        update_rate: 1,

        // 开启匀速动画效果
        // animation:'linear',
        showLabel: false,

        // label x轴位置
        labelx: -10,

        use_img: false,
        // 全局背景颜色
        background_color: "#FFFFFF",

        // 矩形柱是否为圆角矩形
        rounded_rectangle: true,

        // 是否显示x轴轴线
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
      if (auto_sort) {
        var time = date.sort((x, y) => new Date(x) - new Date(y));
      } else {
        var time = date;
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

      // 选择颜色
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

      var showMessage = config.showMessage;
      var allow_up = config.allow_up;
      var always_up = config.always_up;
      var interval_time = config.interval_time;
      var text_y = config.text_y;
      var itemLabel = config.itemLabel;
      var typeLabel = config.typeLabel;
      // 长度小于display_barInfo的bar将不显示barInfo
      var display_barInfo = config.display_barInfo;
      // 显示类型
      if (config.use_type_info) {
        var use_type_info = config.use_type_info;
      } else if (divide_by != "name") {
        var use_type_info = true;
      } else {
        var use_type_info = false;
      }
      // 使用计数器
      var use_counter = config.use_counter;
      // 每个数据的间隔日期
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
      //dateLabel位置
      if (dateLabel_x == null || dateLabel_y == null) {
        dateLabel_x = innerWidth; //默认
        dateLabel_y = innerHeight; //默认
      } //是否隐藏
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
        // indexList = [];
        let tail = "";
        data.forEach(element => {
          if (element["date"] == date && parseFloat(element["value"]) != 0) {
            if (element.name.length > config.bar_name_max) {
              tail = "...";
            } else {
              tail = "";
            }
            element.name =
              element.name.slice(0, config.bar_name_max - 1) + tail;
            currentData.push(element);
          }
        });

        rate["MAX_RATE"] = 0;
        rate["MIN_RATE"] = 1;
        currentData.forEach(e => {
          // _cName = e.name;
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
        currentData = currentData.slice(0, max_number);
        dataSort();

        d3.transition("2")
          .each(redraw)
          .each(change);
        lastData = currentData;
      }

      if (showMessage) {
        // 左1文字
        var topInfo = g
          .insert("text")
          .attr("class", "growth")
          .attr("x", 0)
          .attr("y", text_y)
          .text(itemLabel);

        // 右1文字
        g.insert("text")
          .attr("class", "growth")
          .attr("x", text_x)
          .attr("y", text_y)
          .text(typeLabel);

        // 榜首日期计数
        if (use_counter == true) {
          var days = g
            .insert("text")
            .attr("class", "days")
            .attr("x", text_x + offset)
            .attr("y", text_y);
        } else {
          // 显示榜首type
          if (use_type_info == true) {
            var top_type = g
              .insert("text")
              .attr("class", "days")
              .attr("x", text_x + offset)
              .attr("y", text_y);
          }
        }
      }

      var lastname;
      var counter = {
        value: 1
      };

      var avg = 0;
      var enter_from_now = true;

      function redraw() {
        if (currentData.length == 0) return;
        // yScale
        //     .domain(currentData.map(d => d.name).reverse())
        //     .range([innerHeight, 0]);
        // x轴范围
        // 如果所有数字很大导致拉不开差距

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
              // var prec = (new Date(d.date) + "").split(".");
              // var round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;
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

        if (showMessage) {
          // 榜首文字
          topLabel.data(currentData).text(function(d) {
            if (lastname == d.name) {
              counter.value = counter.value + step;
            } else {
              counter.value = 1;
            }
            lastname = d.name;
            if (d.name.length > 24) return d.name.slice(0, 23) + "...";
            return d.name;
          });
          if (use_counter == true) {
            // 榜首持续时间更新
            days
              .data(currentData)
              .transition()
              .duration(baseTime * interval_time)
              .ease(d3.easeLinear)
              .tween("text", function(d) {
                var self = this;
                var i = d3.interpolate(self.textContent, counter.value),
                  prec = (counter.value + "").split("."),
                  round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

                return function(t) {
                  self.textContent = d3.format(format)(
                    Math.round(i(t) * round) / round
                  );
                };
              });
          } else if (use_type_info == true) {
            // 榜首type更新
            top_type.data(currentData).text(function(d) {
              return d["type"];
            });
          }
        }

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

        // bar上文字
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
              // 初始值为d.value的0.9倍
              self.textContent = d.value * 0.9;
              var i = d3.interpolate(self.textContent, Number(d.value)),
                prec = (Number(d.value) + "").split("."),
                round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
              // d.value = self.textContent
              return function(t) {
                self.textContent =
                  d3.format(format)(Math.round(i(t) * round) / round) +
                  config.postfix;
                // d.value = self.textContent
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
              // d.value = self.textContent
              return function(t) {
                self.textContent =
                  d3.format(format)(Math.round(i(t) * round) / round) +
                  config.postfix;
                // d.value = self.textContent
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
        // 空过p回合
        while (p) {
          p -= 1;
          return;
        }
        currentdate = time[i];
        getCurrentData(time[i]);
        i++;

        if (i >= time.length) {
          window.clearInterval(inter);
        }
      }, baseTime * interval_time);
      // setInterval(() => {
      //     d3.transition()
      //         .each(change)
      // }, baseTime * update_rate * interval_time)
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/history-chart.css";
</style>
