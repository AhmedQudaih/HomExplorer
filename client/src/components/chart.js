import React, { useCallback, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer
} from "recharts";

const Chart= (props) => {

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
   const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
   const sin = Math.sin(-RADIAN * midAngle);
   const cos = Math.cos(-RADIAN * midAngle);
   const sx = cx + (outerRadius + 10) * cos;
   const sy = cy + (outerRadius + 10) * sin;
   const mx = cx + (outerRadius + 30) * cos;
   const my = cy + (outerRadius + 30) * sin;
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name +" ("+ (percent * 100).toFixed(2)+"%)"}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}`} stroke={fill} fill="none" />
       <circle cx={mx} cy={my} r={2} fill={fill} stroke="none" />
    </g>
  );
};

if(props.type === "bar"){
  return(
    <ResponsiveContainer width='100%' height={300}>
        <BarChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 50
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip  />
          <Legend />
          <Bar dataKey="Villa" barSize={40} fill="#039B5E" />
          <Bar dataKey="Apartment" barSize={40} fill="#01bf71" />
        </BarChart>
        </ResponsiveContainer>

  );
}

if(props.type === "pie"){
return(
  <ResponsiveContainer height={400}>
        <PieChart>
          <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={props.data}
         innerRadius={60}
         outerRadius={80}
          fill="#04AF6B"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
    </PieChart>
      </ResponsiveContainer>
  );
}

};
export default Chart;
