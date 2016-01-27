<!DOCTYPE html>
<html>
<head>
    <title>IMDB Vis</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

    <script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>

    <script src="/js/zoomvisualization.js" type="text/javascript"></script>
    <script src="/js/appInit.js" type="text/javascript"></script>
    <script src="/js/d3.slider.js" type="text/javascript"></script>
    <script src="/js/colorLegend.js" type="text/javascript"></script>

    <link rel="stylesheet" type="text/css" href="stylesheets/d3.slider.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="stylesheets/style.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="stylesheets/colorLegendStyle.css" media="screen" />

    <style>

        .link {
            stroke: #aaa;
        }

        .node text {
            stroke:#333;
            cursos:pointer;
        }

        .node circle{
            stroke:#fff;
            stroke-width:3px;
            fill:#555;
        }

    </style>


</head>

<body onload="initializeApplication()">

<div id="slidersCanvas">
    <form>
        <div class="panel-header">IMDBVis control panel</div>
        <input type="button" onclick="sayHello()" value="Apply Filters" class="submit">
    </form>

<!--    legends-->
    <table style="border: 0px; padding: 0px">
        <tr>
            <th>Legend</th>
        </tr>
        <tr>
            <td>
                <div id="productionYearLegend" class="legend2"></div>
            </td>
            <td>
                <div id="lineThicknessLegend" class="legend2"></div>
            </td>
            <td>
                <div id="nodeSizeLegend" class="legend2">
                    <svg width="58" height="253" xmlns="http://www.w3.org/2000/svg">
                        <!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->
                        <g>
                            <title>Layer 1</title>
                            <path fill="#050505" stroke="#000000" stroke-width="0" stroke-linejoin="null" stroke-linecap="null" d="m11.5,243.375l17,-26.75l17,26.75l-34,0z" id="svg_3"/>
                            <circle r="10" cy="70.625" cx="28" id="svg_7" fill="black"/>
                            <text id="svg_5" transform="matrix(0.46270298957824707,0,0,0.807692289352417,-15.455684315413237,36.057695746421814) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="22" y="79.4933" x="93.93026" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Rating 8.8</text>
                            <circle r="20" cy="127.625" cx="27" id="svg_8" fill="black"/>
                            <text id="svg_6" transform="matrix(0.46270298957824707,0,0,0.807692289352417,-15.455684315413237,36.057695746421814) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="22" y="21.30282" x="93.93026" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Rating 8</text>
  <text transform="matrix(0.46270298957824707,0,0,0.807692289352417,-15.455684315413237,36.057695746421814) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="22" y="216.90997" x="97.17208" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000" id="svg_9">(top 10)</text>
  <text id="svg_10" transform="matrix(0.46270298957824707,0,0,0.807692289352417,-15.455684315413237,36.057695746421814) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="22" y="191.52753" x="92.85261" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Rating &gt; 8.8</text>
  <text font-weight="bold" transform="matrix(0.51873122473312,0,0,0.6399999856948853,8.429535981941974,-4.8399999141693115) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="22" id="svg_11" y="33.8125" x="35.80279" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Node size</text>
                        </g>
                    </svg>
                </div>
            </td>
        </tr>
    </table>
</div>

<div id="loading"></div>

<div id="mainCanvas"></div>


</body>
</html>

