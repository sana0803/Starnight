import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, Customized, LabelList, Legend, Tooltip, XAxis, YAxis } from "recharts";
import styles from '../../styles/MainGraph.module.scss';
import { FaMedal } from "react-icons/fa";
const color = [
    'gold',
    'silver',
    '#CD7F32'
]

const grade = [
    '1st',
    '2nd',
    '3rd'
];

const LabelListComponent = (props) => {
    const { name, width, height, x,y } = props;
    console.log(props)
    return (
        <g className={styles.labelText}>
            <text x={x + width / 2} y={ y+ height/2} textAnchor="middle">
            { name }
            </text>
        </g>
    );

}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
    //console.log(active, payload, label)
      return (
        <div className="custom-tooltip">
          <p className="label">{label}</p>
          <p className="intro">{payload[0].payload.name}</p>
        </div>
      );
    }
  
    return null;
};

const CustomizedYAxis = (props) => {
    //console.log(props)
    const { x, y,index } = props;
    return (
        <>
            {<FaMedal {...props} x={x - 27} y={y - 27}
                style={{
                    fill: `${color[index]}`,
                    fontSize: "30px"
                }}
            />}
    
            <text {...props} fill={`${color[index]}`} x={55+2*index}>
                
                <tspan dy="1.3em">{props.payload.value}</tspan>
            </text>
    
            
        </>
    );
}

const MainGraph = ({ data }) => {
    
    
    if (data) {

        const parsing = (e) => {
            return parseInt(e.traffic.slice(0, e.traffic.length - 1).replace(",", ""))/1000-15;
        }


        data = data.map((e) => {
            return {
                "name": e.title,
                "traffic": parsing(e)
            }
        });

        data.sort((e1, e2) => {
            return e2.traffic - e1.traffic;
        })

        data = data.map((e,idx) => {
            return {
                ...e,
                traffic: 3 - idx,
                grade: grade[idx]
            }
        });

        //console.log(data)
    }

    return (
        <>
            {data ? 

                <BarChart width={730} layout="vertical" height={250} data={data.slice(0,3)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                        type="category"
                        dataKey="grade"
                        tick={<CustomizedYAxis />}
                    />
                    <Tooltip
                        position={{
                            x: 500, y:150
                        }}
                        content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                    {/* /<Legend /> */}
                    <Bar dataKey="traffic" >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} stroke={color[index]} fill={"white"}  strokeWidth={1}>
                                
                            </Cell>
                        ))
                        }
                        
                        <LabelList dataKey="name" position="center"/>
                    </Bar>
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                </BarChart>
                :
                <></>
            }
        </>
    );

}

export default MainGraph;

