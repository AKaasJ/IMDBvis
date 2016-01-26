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
        <input type="button" onclick="sayHello()" value="Update" class="submit">
    </form>
    <div id="linearLegendVertical" class="legend2"></div>
</div>

<div id="loading"></div>

<div id="mainCanvas"></div>


</body>
</html>

