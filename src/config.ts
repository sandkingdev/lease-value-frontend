import { BarChartLegendType, ChartDataType, FeaturesOptionType, FloorLevelOptionType, HighlightPointType, PremiumType } from "./types";

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  alert("VITE_SUPABASE_ANON_KEY is required");
  throw new Error("VITE_SUPABASE_ANON_KEY is required");
}

if (!import.meta.env.VITE_SUPABASE_URL) {
  alert("VITE_SUPABASE_URL is required");
  throw new Error("VITE_SUPABASE_URL is required");
}

// console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
// console.log(import.meta.env.VITE_SUPABASE_URL);
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;

export const floorLevelOptions: FloorLevelOptionType[] = [
  { value: "basement", label: "Basement" },
  { value: "ground", label: "Ground" },
  { value: "first", label: "First" },
  { value: "second", label: "Second" },
  { value: "third", label: "Third" },
  { value: "ground and first", label: "Ground and First" },
  { value: "first and second", label: "First and Second" },
  { value: "second and third", label: "Second and Third" },
];


export const featuresOptions: FeaturesOptionType[] = [
  { value: "no garden", label: "No Garden" },
  { value: "a private garden", label: "Private Garden" },
  { value: "a communal garden", label: "Communal Garden" },
  { value: "a patio", label: "Patio" },
  { value: "a terrace", label: "Terrace" },
  { value: "a garage", label: "Garage" },
  { value: "a garden and off road parking", label: "A Garden and Off Road Parking" },
];

export const extensionYears = 90;

export const getRemainingYears = (startDate: Date, endDate: Date) => {
  try {
    if (endDate <= startDate) {
      return 0;
    }
    const timeDiff = endDate.getTime() - startDate.getTime();
    const durationInYears = timeDiff / (1000 * 60 * 60 * 24 * 365.25);

    return durationInYears;
  } catch (error) {
    console.error("Error parsing date:", error);
    return 0;
  }
}

export const getStringOfRemainingYears = (startDate: Date, endDate: Date) => {
  if (!endDate) return {
    status: false,
    result: 'You should select lease end date at first'
  };
  if (!startDate) return {
    status: false,
    result: 'You should select valuation date at first'
  };

  const numberOfYearsRemainingVal = getRemainingYears(startDate, endDate);

  if (numberOfYearsRemainingVal <= 0) {
    return {
      status: false,
      result: 'Error in parsing date'
    }
  } else {
    return {
      status: true,
      result: `Years remaining on your lease: ${numberOfYearsRemainingVal.toFixed(2)}`
    }
  }
}

export const calculatePremium = (years: number, groundRent: number, propertyValue: number, yieldRate: number, defermentRate: number, level: number) => {
  // Lost Rent
  const lostRent = ((1 - (1 / Math.pow(1 + yieldRate / 100, years))) / (yieldRate / 100)) * groundRent;

  // Remainder Term
  const remainderTerm = propertyValue / Math.pow(1 + defermentRate / 100, years);
  const remainderNinetyTerm = propertyValue / Math.pow(1 + defermentRate / 100, years + 90);
  const landlordValue = remainderTerm - remainderNinetyTerm;

  // Land Current Interest
  const landCurrentInterest = lostRent + remainderTerm;

  // Hypothetical logic from your code
  let talentedCurrentInterest;
  if (years > 95) {
    talentedCurrentInterest = propertyValue * 0.972;
  } else {
    talentedCurrentInterest = (
      (0.106 + 0.894 * (1 - Math.pow(0.972, years))) -
      ((-0.002 * years) + 0.1706)
    ) * propertyValue * level;
  }

  const beforeMarriageValue = landCurrentInterest + talentedCurrentInterest;
  const landTotal = propertyValue + remainderNinetyTerm;
  const difference = landTotal - beforeMarriageValue;
  const marriageValue = years > 80 ? 0 : difference / 2;

  // Premium
  const premium = {
    lostRent,
    landlordValue,
    marriageValue,
  };

  return premium;
}

export const getPremiumValue = (premium: PremiumType) => {
  const {
    lostRent,
    landlordValue,
    marriageValue,
  } = premium;

  return lostRent + landlordValue + marriageValue;
}

export const formatAndRoundToTens = (numString: string) => {
  // Remove commas
  let raw = numString.replace(/,/g, '');
  // Parse number
  let num = parseFloat(raw);
  if (isNaN(num)) return numString; // fallback

  // Round to nearest tens
  num = Math.round(num / 10) * 10;

  // Re-apply commas
  return num.toLocaleString('en-GB');
}

export const levels = {
  low: 1.01,
  medium: 1,
  high: 0.99,
}

export const premiumCalculationYears = [
  1,
  2,
  5,
  10,
];

export const getRelativityRate = async (durationInYears: number) => {
  if (durationInYears >= 80) {
    return {
      status: false,
      result: "Not applicable / No marriage value",
      value: 0,
    };
  }

  try {
    // Load CSV
    // @ts-ignore
    const d3 = window.d3;
    const data = await d3.csv("/relativity.csv");

    // Parse terms from data
    const terms = data.map((d: any) => parseFloat(d.Term));

    // Find lower and upper bounding rows
    const lower = Math.max(...terms.filter((item: any) => item <= durationInYears));
    const upper = Math.min(...terms.filter((item: any) => item >= durationInYears));

    const lowerRow = data.find((row: any) => parseFloat(row.Term) === lower);
    const upperRow = data.find((row: any) => parseFloat(row.Term) === upper);

    let relativityRate;
    if (lowerRow && upperRow && lower !== upper) {
      // Interpolate
      const ratio = (durationInYears - lower) / (upper - lower);
      const lowerRel = parseFloat(lowerRow.Relativity);
      const upperRel = parseFloat(upperRow.Relativity);
      relativityRate = lowerRel + ratio * (upperRel - lowerRel);
    } else if (lowerRow) {
      // Exact match
      relativityRate = parseFloat(lowerRow.Relativity);
    } else {
      relativityRate = 0;
    }

    const result = {
      status: true,
      result: `Relativity Rate: ${relativityRate.toFixed(2)}% (${durationInYears.toFixed(2)} yrs)`,
      value: relativityRate,
    };

    return result; // ✅ This properly returns the value

  } catch (error) {
    console.error("CSV load error:", error);
    return {
      status: false,
      result: "There was an error in loading csv",
      value: 0,
    };
  }
};

export const generatePremiumData = (groundRent: number, longLeaseValueOfTheFlat: number, yieldRate: number, defermentRate: number, level: number, xMin: number, xMax: number) => {
  const data = [];
  for (let years = xMin; years <= xMax; years++) {
    const premium = calculatePremium(years, groundRent, longLeaseValueOfTheFlat, yieldRate, defermentRate, level);
    data.push({
      yearsLeft: years,
      premium: getPremiumValue(premium),
    });
  }
  return data;
}

// Draw the main premium chart
export const drawPremiumChart = (dataSets: ChartDataType[], highlightPoint: HighlightPointType, xMin: number, xMax: number) => {
  // @ts-ignore
  const d3 = window.d3;
  d3.select("#chart").html("");

  const margin = {
    top: 20,
    right: 30,
    bottom: 50,
    left: 100
  },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Max premium
  const maxPremium = d3.max(dataSets, (ds: any) => d3.max(ds.data, (d: any) => d.premium));
  const x = d3.scaleLinear().domain([xMax, xMin]).range([0, width]);
  const y = d3.scaleLinear().domain([0, maxPremium * 1.1]).nice().range([height, 0]);

  // X-axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(5))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "#000")
    .style("font-size", "17px")
    .style("text-anchor", "middle")
    .text("Years Left on Lease");

  // Y-axis
  svg.append("g")
    .call(d3.axisLeft(y).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -80)
    .attr("fill", "#000")
    .style("font-size", "18px")
    .style("text-anchor", "middle")
    .text("Premium Payable (£)");

  // Lines
  const lineGenerator = d3.line()
    .curve(d3.curveMonotoneX)
    .x((d: any) => x(d.yearsLeft))
    .y((d: any) => y(d.premium));

  dataSets.forEach((ds: any) => {
    svg.append("path")
      .datum(ds.data)
      .attr("fill", "none")
      .attr("stroke", ds.color)
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);
  });

  // Legend
  const legend = svg.selectAll('.legend')
    .data(dataSets)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', (_: any, i: number) => `translate(10,${i * 20 + 10})`);

  legend.append('rect')
    .attr('x', 0)
    .attr('y', 4)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', (d: any) => d.color);

  legend.append('text')
    .attr('x', 24)
    .attr('y', 13)
    .attr('dy', '.35em')
    .style('text-anchor', 'start')
    .style('font-size', '12px')
    .text((d: any) => d.label);

  // Interactivity
  const focus = svg.append('g').style('display', 'none');
  focus.append('circle').attr('r', 5).attr('fill', 'black');
  focus.append('text').attr('x', 9).attr('dy', '.35em');

  const originalData = dataSets.find((ds: any) => ds.label === 'Medium Premium')!.data;
  svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .on('mouseover', () => focus.style('display', null))
    .on('mouseout', () => focus.style('display', 'none'))
    .on('mousemove', mousemove);

  function mousemove(event: MouseEvent) {
    const bisect = d3.bisector((d: any) => d.yearsLeft).left;
    const mouseX = d3.pointer(event)[0];
    const x0 = x.invert(mouseX);
    const i = bisect(originalData, x0, 1);
    const d0 = originalData[i - 1];
    const d1 = originalData[i];
    let d;
    if (!d1) {
      d = d0;
    } else {
      d = x0 - d0.yearsLeft > d1.yearsLeft - x0 ? d1 : d0;
    }
    focus.attr('transform', `translate(${x(d.yearsLeft)},${y(d.premium)})`);
    focus.select('text')
      .text(`(${d.yearsLeft.toFixed(1)}, £${(d.premium.toFixed(0))})`)
      .attr('x', 9)
      .attr('y', -10)
      .style('font-size', '12px');
  }

  // Highlight the user's point in red
  if (highlightPoint) {
    svg.append("circle")
      .attr("cx", x(highlightPoint.yearsLeft))
      .attr("cy", y(highlightPoint.premium))
      .attr("r", 5)
      .attr("fill", "red");

    svg.append("text")
      .attr("x", x(highlightPoint.yearsLeft) + 10)
      .attr("y", y(highlightPoint.premium) - 10)
      .text(`(${highlightPoint.yearsLeft.toFixed(1)} yrs, £${(highlightPoint.premium.toFixed(0))})`)
      .attr("fill", "black")
      .style("font-size", "16px");
  }
}

export const drawPremiumBarChart = (lostRent: number, landlordValue: number, marriageValue: number) => {
  // @ts-ignore
  const d3 = window.d3;
  d3.select("#premium-bar-chart").html("");

  const data = [{
    label: "Ground Rent Compensation",
    value: lostRent,
    color: "#ccf2ff"
  },
  {
    label: "Property Value Componentx",
    value: landlordValue,
    color: "#1ac6ff"
  },
  {
    label: "Marriage Value",
    value: marriageValue,
    color: "#0099cc"
  }
  ];

  const margin = {
    top: 20,
    right: 120,
    bottom: 40,
    left: 200
  };
  const width = 700;
  const height = 200;

  const svg = d3.select("#premium-bar-chart")
    .append("svg")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMin meet");

  // Scales - note x and y are swapped for horizontal bars
  const x = d3.scaleLinear()
    .domain([0, d3.max(data, (d: BarChartLegendType) => d.value)])
    .range([0, width - margin.left - margin.right]);

  const y = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([margin.top, height - margin.bottom])
    .padding(0.3);

  // Add the horizontal bars
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", margin.left)
    .attr("y", (d: any) => y(d.label))
    .attr("width", (d: any) => x(d.value))
    .attr("height", y.bandwidth())
    .attr("fill", (d: any) => d.color);

  // Add X axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(5).tickFormat((d: any) => `£${(d)}`));

  // Add Y axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // Labels
  svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .filter((d: any) => d.value !== 0)
    .attr("x", (d: any) => margin.left + x(d.value) + 5)
    .attr("y", (d: any) => y(d.label) + y.bandwidth() / 2 + 4)
    .style("font-size", "11px")
    .text((d: any) => `£${(d.value.toFixed(0))}`);

  // Legend
  const legend = d3.select("#chart-legend").html("");
  data.forEach(d => {
    legend.append("div")
      .style("display", "flex")
      .style("align-items", "center")
      .style("gap", "5px")
      .html(`
      <div style="width: 15px; height: 15px; background-color: ${d.color};"></div>
      <span>${d.label}</span>
    `);
  });
}