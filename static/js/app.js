function init() {
    d3.json("samples.json").then(function(data) {
        var names = data.names;
        names.forEach((name) => {
            d3.select("#selDataset").append("option").text(name);
        });

        getdata(names[0]);
        getgraph(names[0]);
    });
}

function getdata(sampledata) {
    d3.json("samples.json").then(function(data) {
        var metadata = data.metadata;
        var result = metadata.filter(object => object.id === sampledata)[0];
        var panel = d3.select("sample-metadata");
        panel.html("");
        Object.defineProperties(result).forEach(([key, value]) => {
            panel.append("h5").text(key.toUpperCase() + ": " + value);
        });
    });
}

function getgraph(sampledata) {
    d3.json("samples.json").then(function(data) {
        var samples = data.samples;
        var results = samples.filter(object => object.id === sampledata)[0];
        var otu_ids = results.otu_ids;
        var otu_labels = results.otu_labels;
        var sample_values = results.sample_values;

        var bardata = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };

        var barlayout = {
            title: "Top 10 Bacterias",
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50
            }
        };

        Plotly.newPlot("bar", bardata, barlayout);

        var bubdata =[{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            }
        }];

        var bublayout = {
            title: "Bacteria in Bubble Graph",
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50
            }
        };

        Plotly.newPlot("bubble", bubdata, bublayout);
    });
}

function optionChanged(newsampledata) {
    getdata(newsampledata);
    getgraph(newsampledata);
}

init();