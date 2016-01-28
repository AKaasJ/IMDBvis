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
    <script src="/js/menu.js" type="text/javascript"></script>
    <script src="/node_modules/c3/c3.min.js" type="text/javascript"></script>

    <link rel="stylesheet" type="text/css" href="stylesheets/d3.slider.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="stylesheets/style.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="stylesheets/colorLegendStyle.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="stylesheets/bottomSliderMenuStyle.css" media="screen" />
    <link href="node_modules/c3/c3.css" rel="stylesheet" type="text/css">


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
                            <circle r="10" cy="90.625" cx="28" id="svg_7" fill="black"/>
                            <text id="svg_5" transform="matrix(0.46270298957824707,0,0,0.807692289352417,-15.455684315413237,36.057695746421814) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="22" y="166.15997" x="93.93026" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Rating 9.2</text>
                            <circle r="20" cy="197.625" cx="27" id="svg_8" fill="black"/>
                            <text id="svg_6" transform="matrix(0.46270298957824707,0,0,0.807692289352417,-15.455684315413237,36.057695746421814) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="22" y="46.06473" x="93.93026" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Rating 8</text>
  <text font-weight="bold" transform="matrix(0.51873122473312,0,0,0.6399999856948853,8.429535981941974,-4.8399999141693115) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="22" id="svg_11" y="33.8125" x="35.80279" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Node size</text>
                        </g>
                    </svg>
                </div>
            </td>
        </tr>
    </table>
</div>

<div id="loading"></div>




<div id="o-wrapper" class="o-wrapper">

    <div class="c-buttons">
        <div id="mainCanvas"></div>
<!--        <button id="c-button--slide-bottom" class="c-button">Slide Botton</button>-->
    </div>

    <!-- other content in here -->

</div><!-- /o-wrapper -->

<!-- menus here -->

<div id="c-mask" class="c-mask"></div><!-- /c-mask -->


<nav id="c-menu--slide-bottom" class="c-menu c-menu--slide-bottom">
    <button class="c-menu__close">&larr; Close Menu</button>
    <table id="c-menu-table">
        <tr>
            <td width="25%">
                <div id="movie_info">
                    <h1 id="title"></h1>
                    <div id="rating"></div>
                    <div id="Summary"></div>
                    <div id="Poster"></div>
                </div>
            </td>
            <td width="75%">
                <div id="chart"></div>
            </td>

        </tr></table>

<!---->
<!--    <ul class="c-menu__items">-->
<!--        <li class="c-menu__item"><a href="#" class="c-menu__link">Home</a></li>-->
<!--    </ul>-->
</nav>

</body>
</html>

