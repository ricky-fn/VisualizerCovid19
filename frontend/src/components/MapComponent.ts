import type { MapPolygonSeries, MapPolygon, MapChart } from "@amcharts/amcharts4/maps";
import type { iRGB } from "@amcharts/amcharts4/.internal/core/utils/Colors";
import type { Color } from "@amcharts/amcharts4/core";
import { am4core, am4maps } from "../libs/am4chart";
import BaseComponent from "./BaseComponent";
import { CountriesData, CountriesSortedByActive, CountryData } from "../models";
import { ChartComponentMoveAnimation, MapReady } from "../events";
import * as tools from "../libs/tools";
import { TDisplayModel } from "../views/ChartView";

interface IMapColorDefinitionParameter {
  itemsPercent: number, // <= 1 本分组占总数据句比例
  levelBasicColor: iRGB, // 当前分级基准颜色
}

interface IMapColorDefinition extends IMapColorDefinitionParameter {
  boundary: {
    min: number,
    max: number
  }
}

export default class MapComponent extends BaseComponent<MapPolygonSeries> {
  private displayModel: TDisplayModel;

  private mapColorDefinition: IMapColorDefinition[] = [];

  private mapPolygons: {[key:string]: MapPolygon} = {};

  private containerBox:DOMRect;

  constructor(
    private renderData: CountriesData,
    private dataSort: CountriesSortedByActive,
  ) {
    super();
  }

  init(chart: MapChart): this {
    this.target = chart.series.push(new am4maps.MapPolygonSeries());

    return this;
  }

  setConfiguration(): this {
    this.target.calculateVisualCenter = true;
    this.target.useGeodata = true;

    this.setColorDefinition();
    return this;
  }

  inject(): this {
    return this;
  }

  setStyles(): this {
    const strokeColor = am4core.color("#450000"); // 区块边框颜色
    let backgroundColor = am4core.color("#242424");

    this.target.tooltip.background.disabled = true;

    this.target.tooltip.dom.setAttribute("class", "tooltip-animation");

    this.target.mapPolygons.each((mapPolygon) => {
      // @ts-ignore
      const countryID = mapPolygon.dataItem.dataContext.id;
      const countryData = this.renderData[countryID];

      if (countryData) {
        const sortIndex = this.dataSort.length - this.dataSort.indexOf(countryID) - 1;
        backgroundColor = this.generateColorObject(sortIndex);
      }
      mapPolygon.fill = backgroundColor;
      mapPolygon.stroke = strokeColor;
      mapPolygon.strokeWidth = 0.1;
      mapPolygon.nonScalingStroke = true;

      mapPolygon.tooltipPosition = "fixed";
      mapPolygon.showTooltipOn = "hit";
      mapPolygon.tooltip.pointerOrientation = "down";
      mapPolygon.tooltipHTML = this.getTooltipTemplate(countryData);

      this.mapPolygons[countryID] = mapPolygon;
    });

    return this;
  }

  registerHooks(): this {
    this.target.mapPolygons.template.events.on(
      "hit",
      (ev) => this.events.triggerEvent(ChartComponentMoveAnimation, { data: ev.target }),
    );

    this.target.events.on("inited", () => {
      this.setStyles();
      this.events.triggerEvent(MapReady);
      this.containerBox = this.target.dom.getBBox();
    });

    this.target.tooltip.adapter.add("pixelX", () => this.centralizeTooltip("pixelX"));
    this.target.tooltip.adapter.add("pixelY", () => this.centralizeTooltip("pixelY"));

    return this;
  }

  private centralizeTooltip(type: "pixelX" | "pixelY"): number {
    const {
      x, y, width, height,
    } = this.containerBox;

    let offsetX = 30;
    const offsetY = 490;

    if (this.displayModel === "mobile") {
      offsetX = 0;
    }

    if (type === "pixelX") {
      return x + width / 2 + offsetX;
    }

    if (type === "pixelY") {
      return y + height / 2 + offsetY;
    }

    return 0;
  }

  private setColorDefinition() {
    const colorParams:IMapColorDefinitionParameter[] = [
      {
        itemsPercent: 0.4,
        levelBasicColor: {
          r: 100,
          g: 0,
          b: 0,
        },
      },
      {
        itemsPercent: 0.3,
        levelBasicColor: {
          r: 155,
          g: 0,
          b: 0,
        },
      },
      {
        itemsPercent: 0.25,
        levelBasicColor: {
          r: 200,
          g: 0,
          b: 0,
        },
      },
      {
        itemsPercent: 0.05,
        levelBasicColor: {
          r: 255,
          g: 0,
          b: 0,
        },
      },
    ];

    const countriesAmount = this.dataSort.length;
    let percentSub = 0;
    this.mapColorDefinition = colorParams.map((param) => {
      const minPercent = percentSub;
      percentSub += param.itemsPercent;
      const boundary = {
        min: Math.floor(countriesAmount * minPercent),
        max: Math.floor(countriesAmount * percentSub),
      };

      param.levelBasicColor.a = 1;

      return { ...param, boundary };
    });
  }

  private generateColorObject(index: number):Color {
    // eslint-disable-next-line no-restricted-syntax
    for (const element of this.mapColorDefinition) {
      const { min, max } = element.boundary;
      if (
        index >= element.boundary.min
        && index <= element.boundary.max
      ) {
        const alpha = ((index - min) / (max - min) / 2).toFixed(2);

        return am4core.color({ ...element.levelBasicColor, a: Number(alpha) + 0.5 });
      }
    }
    return am4core.color("#242424");
  }

  private getTooltipTemplate(data: CountryData | undefined) {
    if (!data) {
      return `
          <div class="earth-overlay">
              <img src="{flag}">
              <div class="title">
                  <span>
                      <em>{name}</em>
                      <span><br>
                          <span class="tiny">None</span>
                      </span>
                  </span>
              </div>
          </div>
      `;
    }

    const {
      name, cases, reports, recovered, flag, deaths
    } = data;

    return `
      <div class="earth-overlay">
        <div class="country-flag" style="background-image: url(${flag});"></div>
        <div class="title">
          <span>
            <em>${name}</em>
            <span><br>
              <span class="tiny">${tools.formatNumber(cases)} total cases</span>
            </span>
          </span>
        </div>
        <div class="info">
          <span><span class="_active">${tools.formatNumber(reports)}</span> active</span><br>
          <span><span class="_dead">${tools.formatNumber(deaths)}</span> deceased</span><br>
          <span><span class="_recovered">${tools.formatNumber(recovered)}</span><br>recovered</span><br>
        </div>
      </div>
    `;
  }

  selectCountry(countryID: string) {
    const mapPolygon = this.mapPolygons[countryID];
    if (mapPolygon instanceof am4maps.MapPolygon) {
      const eventPointerdown = new Event("pointerdown");
      const eventMouseenter = new Event("mouseenter");
      // @ts-ignore
      eventMouseenter.buttons = 0;
      // @ts-ignore
      eventMouseenter.which = 0;
      // @ts-ignore
      eventMouseenter.relatedTarget = null;
      mapPolygon.dom.dispatchEvent(eventPointerdown);
      document.dispatchEvent(eventMouseenter);
    }
  }

  onResize(model: TDisplayModel) {
    this.target.tooltip.visible = false;
    this.displayModel = model;
    this.containerBox = this.target.dom.getBBox();
  }
}
