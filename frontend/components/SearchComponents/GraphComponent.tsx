import React, { memo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataInterface {
  name: string,
  uv: number, pv: number, amt: number
}

interface StyleInterface {
  width: string,
  height: string,
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};


const GraphComponent = ({ data, styles }) => {

    return (
        <div style={{
            width: styles.width,
            height: styles.height
        }}>
            
                <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
            top: 15,
            right: 30,
            left: 5,
            bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            {/* <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />}  /> */}
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Line
              name="검색량 추이"
            type="monotone"
            dataKey="ratio"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                    </LineChart>
                    </ResponsiveContainer>
        </div>
  );
};

export default memo(GraphComponent);
