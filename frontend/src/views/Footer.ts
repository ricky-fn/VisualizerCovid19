import { Worldwide } from "../models";
import * as tools from "../libs/tools";

const infoSVG = require("../assets/info.svg");

export default class Footer {
  constructor(elementId: string, data: Worldwide, timestamp: string) {
    const { deaths, reports, recovered } = data;
    const totalCases = tools.formatNumber(reports - recovered - deaths);
    const totalCount = tools.formatNumber(reports);
    const totalDeaths = tools.formatNumber(deaths);
    const totalRecovered = tools.formatNumber(recovered);
    const mortalityRate = `(${Math.ceil((deaths / reports) * 10000) / 100})%`;
    const recoveryRate = `(${Math.ceil((recovered / reports) * 10000) / 100})%`;
    const timestampString = tools.convertDateToString(tools.dateDiffer(new Date(timestamp)));
    const htmlStr = Footer.renderTemplate(
      totalCases,
      totalCount,
      totalDeaths,
      totalRecovered,
      mortalityRate,
      recoveryRate,
      timestampString,
    );
    document.getElementById(elementId).innerHTML = htmlStr;
  }

  static renderTemplate(
    totalCases: string,
    totalCount: string,
    totalDeaths: string,
    totalRecovered: string,
    mortalityRate: string,
    recoveryRate: string,
    timestamp: string,
  ) {
    return `
        <p>
            <span class="tiny">TOTAL COUNTS (as of <span class="timestamp">${timestamp}</span>)</span>
            <br>
            ACTIVE:&nbsp;<span class="total-cases">${totalCases}</span><span class="tiny total-count">/${totalCount}</span><span class="muted disappear">&nbsp;•</span>
            DEATHS:&nbsp;
            <span class="total-deaths">${totalDeaths}</span><span class="tiny mortality-rate">${mortalityRate}</span>
            <span class="tooltip">
                <img src="${infoSVG.default}">
                <span class="tooltiptext">Deaths out of<br><em>total</em> cases</span>
            </span>
            <span class="muted disappear">•</span><br>
            &nbsp;RECOVERIES:&nbsp;
            <span class="total-recovered">${totalRecovered}</span>
            <span class="tiny">${recoveryRate}</span>
            <span class="tooltip">
                <img src="${infoSVG.default}">
                <span class="tooltiptext">Recoveries out of<br><em>total</em> cases</span>
            </span>
        </p>
    `;
  }
}