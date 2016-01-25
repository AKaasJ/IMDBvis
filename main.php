<!DOCTYPE html>
<html>
<head>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

    <script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>

    <script src="/js/zoomvisualization.js" type="text/javascript"></script>

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

<body>

<div id="mysql_info_div">

</div>
Type ID:  <input type="text" name="ID_input" id="ID_input">
<input type="button" onclick="sayHello()" value="Say it!">

<div id="mainCanvas">
</div>

</body>
</html>

