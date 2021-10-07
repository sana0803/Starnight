import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { memo } from "react";
import styles from '../../styles/MiddlePieGraph.module.scss';


const MiddlePieGraph = ({ data }) => {
    
    const { relKeyword,
        monthlyPcQcCnt,
        monthlyMobileQcCnt,
        plAvgDepth } = data;
    console.log(data)

    data.sort((e1, e2) => {
        return parseInt(e2.monthlyPcQcCnt) - parseInt(e1.monthlyPcQcCnt)  
    });
    let sortedThreeData = data.slice(0,3);
    let legendName = ['월간 PC 검색 수', '월간 모바일 검색 수'];
    let legendObject = {
        monthlyPcQcCnt: "월간 PC 검색 수",
        monthlyMobileQcCnt: "월간 모바일 검색 수",
    };
    return (
        <div className={styles.middlePieGraphDiv}>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart
                width={500}
                height={300}
                data={sortedThreeData }
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="relKeyword" />
                <YAxis />
                    <Tooltip formatter={
                        (value, name, props) => {
                            console.log(props);
                            return [value, legendObject[name]]
                        }
                    }/>
                    <Legend formatter={(value, entry, index) => (
                        legendName[index]
                )}/>
                <Bar dataKey="monthlyPcQcCnt" fill="#2C2E43" />
                <Bar dataKey="monthlyMobileQcCnt" fill="#D7D7DD" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );


}

export default memo(MiddlePieGraph);