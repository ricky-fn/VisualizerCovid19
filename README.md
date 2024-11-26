# COVID-19 Visualizer

An interactive COVID-19 (coronavirus) visualizer that highlights countries around the world based on the most recent cases. 

Visit [demo](https://ricky-fn.github.io/VisualizerCovid19/) see if you like it!

![screenshot of this project](https://raw.githubusercontent.com/rickysna/VisualizerCovid19/master/frontend/src/assets/screenshot.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Create your own AWS account, [install](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and [configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) AWS CLI on your system.

### Installing

Clone this repository to your local file system then run command as below.

```
npm install
```

### Developing

Run command as below to launch a server for Serverless API at port 3000 and a website at port 4000.

```
npm run start
```

### Break down into end to end tests

This project's tests covered by cypress.

```
npm run test
```

## Deployment

For releasing static assets:
```
npm run build_frontend
```

Deploy Serverless application and static assets:
```
npm run build_and_deploy
```

## Analysis

Visualize size of webpack output files with an interactive zoomable treemap.  
```
npm run analysis_bundle
```

## Built With

* [Serverless](https://www.serverless.com/) - The Serverless framework used to manage AWS
* [cypress](https://www.cypress.io/) - End to End test framework
* [AMCHARTS](https://www.amcharts.com/) - Used to render chart UI 
* [TypeScript](https://www.typescriptlang.org/) - a typed superset of JavaScript that compiles to plain JavaScript 
* [Webpack](https://webpack.js.org/) - Used to bundle assets 

## Authors

* **Ricky Jiang** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/ricky-jiang)

## Acknowledgments
I referred the UI from [covidvisualizer](https://www.covidvisualizer.com). The goal of this
project is practicing a complex chart UI with Serverless technology