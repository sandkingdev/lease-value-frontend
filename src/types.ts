
export type FloorLevelOptionType = {
  value: string,
  label: string,
};

export type FeaturesOptionType = {
  value: string,
  label: string,
};

export type PremiumType = {
  lostRent: number,
  landlordValue: number,
  marriageValue: number,
};

export type RelativityRateType = {
  status: boolean,
  result: string,
  value: number,
};

export type RangeType = {
  label: string,
  capitalisationRate: number,
};

export type ChartDataType = {
  data: {
    yearsLeft: number;
    premium: number;
  }[];
  color: string;
  label: string;
};

export type HighlightPointType = {
  yearsLeft: number;
  premium: number;
};

export type BarChartLegendType = {
  label: string,
  value: number,
  color: string,
}