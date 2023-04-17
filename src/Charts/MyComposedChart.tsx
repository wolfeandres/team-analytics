import React from 'react';
import { FaSquare } from 'react-icons/fa';
import { Label, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Area, ResponsiveContainer, ComposedChart } from 'recharts';

type CustomLegendIconProps = {
    color: string;
    selected: boolean;
};

const CustomLegendIcon1: React.FC<CustomLegendIconProps> = ({ color, selected }) => (
    <svg width="10" height="10">
        <line x1="0" y1="5" x2="10" y2="5" stroke={selected ? color : '#ccc'} strokeWidth="2" />
    </svg>
);

const CustomLegendIcon2: React.FC<CustomLegendIconProps> = ({ color, selected }) => (
    <svg width="10" height="10">
        <line x1="0" y1="5" x2="10" y2="5" stroke={selected ? color : '#ccc'} strokeWidth="2" strokeDasharray="2 2 2" />
    </svg>
);


 
type ChartProps = {
    data: any[];
    json1: any;
    json2?: any;
    options: any;
}

interface Labels {
    [key: string]: string[];
}

const labels: Labels = {
    'heart_rate': ['Heart Rate', 'bpm'],
    'distance': ['Distance', 'm'],
    'steps': ['Steps', 'steps'],
    'calories': ['Calories', 'kcal'],
    'speed': ['Speed', 'km/h']
}

const MyComposedChart = ( props: ChartProps ) => {
    const { data, json1, json2 = null, options } = props;

    return (
        <ComposedChart
            width={1350}
            height={525}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
            }}
        >
            <defs>
                <linearGradient id="elevation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#66d0de" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#66d0de" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey='timestamp' stroke="black">
                <Label value="Time" offset={-10} position="insideBottomLeft" />
            </XAxis>
            <YAxis hide={!options['heart_rate']} yAxisId={0} allowDecimals={false} domain={options['heart_rate'] ? ['auto', json1['workout']['heart_rate']['target_heart_rate'] + 5]: ['dataMin - 5', 'dataMax + 5']}>
                <Label value={labels['heart_rate'][0] + ' (' + labels['heart_rate'][1] + ')'} offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <YAxis hide yAxisId={1} dataKey='elevation' domain={['auto', 'auto']}/>
            <YAxis hide={!options['distance']} yAxisId={2} domain={['auto', 'auto']}>
                <Label value={labels['distance'][0] + ' (' + labels['distance'][1] + ')'} offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <YAxis hide={!options['steps']} yAxisId={3} domain={['auto', 'auto']}>
                <Label value={labels['steps'][0]} offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <YAxis hide={!options['calories']} yAxisId={4} domain={['auto', 'auto']}>
                <Label value={labels['calories'][0] + ' (' + labels['calories'][1] + ')'} offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <YAxis hide={!options['speed']} yAxisId={5} domain={['auto', 'auto']}>
                <Label value={labels['speed'][0] + ' (' + labels['speed'][1] + ')'} offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <Tooltip />
            <Legend
                formatter={(value, entry, index) => {
                    let selected = false;
                    switch (index) {
                    case 0:
                        selected = options.elevation;
                        break;
                    case 1:
                        selected = options.heart_rate;
                        break;
                    case 2:
                        selected = options.heart_rate;
                        break;
                    case 3:
                        selected = options.distance;
                        break;
                    case 4:
                        selected = options.distance;
                        break;
                    case 5:
                        selected = options.steps;
                        break;
                    case 6:
                        selected = options.steps;
                        break;
                    case 7:
                        selected = options.calories;
                        break;
                    case 8:
                        selected = options.calories;
                        break;
                    case 9:
                        selected = options.speed;
                        break;
                    case 10:
                        selected = options.speed;
                        break;
                    default:
                        selected = false;
                        break;
                    }
                    return (
                    <span style={{ color: entry.color && selected ? entry.color : 'gray', display: 'flex', alignItems: 'center' }}>
                        {index === 0 ? (
                        <FaSquare color={entry.color && selected ? entry.color : 'gray'} />
                        ) : index % 2 === 0 ? (
                        <CustomLegendIcon2 color={entry.color ?? 'black'} selected={selected} />
                        ) : (
                        <CustomLegendIcon1 color={entry.color ?? 'black'} selected={selected} />
                        )}
                        {value}
                    </span>
                    );
                }}
                verticalAlign="top"
                align="right"
                iconSize={0}
                />



            <ReferenceLine y={options['heart_rate'] ? json1['workout']['heart_rate']['target_heart_rate'] : null} label={options['heart_rate'] ? "Target" : ''} stroke="#8884d8" ifOverflow='extendDomain' />
            <ReferenceLine y={options['heart_rate'] ? json2['workout']['heart_rate']['target_heart_rate'] : null} label={options['heart_rate'] ? "Target" : ''} stroke="#8884d8" ifOverflow='extendDomain' strokeDasharray='5 3' />
            <Area hide={!options['elevation']} unit='m' type='monotone' name='Elevation' yAxisId={1} dataKey='elevation' stroke='#66d0de' fill='url(#elevation)' fillOpacity={1}/>
            <Line hide={!options['heart_rate']} unit={labels['heart_rate'][1]} name={json1['name'] + ' Heart Rate'} type="monotone" dataKey='heartRate1' stroke="#8884d8" yAxisId={0} dot={false}/>
            <Line hide={!options['heart_rate']} unit={labels['heart_rate'][1]} name={json2['name'] + ' Heart Rate'} type="monotone" dataKey='heartRate2' stroke="#8884d8" yAxisId={0} dot={false} strokeDasharray='5 3'/>
            <Line hide={!options['distance']} unit={labels['distance'][1]} name={json1['name'] + ' Distance'} type="monotone" dataKey='distance1' stroke="#9240de" yAxisId={2} dot={false}/>
            <Line hide={!options['distance']} unit={labels['distance'][1]} name={json2['name'] + ' Distance'} type="monotone" dataKey='distance2' stroke="#9240de" yAxisId={2} dot={false} strokeDasharray='5 3'/>
            <Line hide={!options['steps']} unit={labels['steps'][1]} name={json1['name'] + ' Steps'} type="monotone" dataKey='steps1' stroke="#de4077" yAxisId={3} dot={false}/>
            <Line hide={!options['steps']} unit={labels['steps'][1]} name={json2['name'] + ' Steps'} type="monotone" dataKey='steps2' stroke="#de4077" yAxisId={3} dot={false} strokeDasharray='5 3'/>
            <Line hide={!options['calories']} unit={labels['calories'][1]} name={json1['name'] + ' Calories'} type="monotone" dataKey='calories1' stroke="#55e081" yAxisId={4} dot={false}/>
            <Line hide={!options['calories']} unit={labels['calories'][1]} name={json2['name'] + ' Calories'} type="monotone" dataKey='calories2' stroke="#55e081" yAxisId={4} dot={false} strokeDasharray='5 3'/>
            <Line hide={!options['speed']} unit={labels['speed'][1]} name={json1['name'] + ' Speed'} type="monotone" dataKey='speed1' stroke="#fa9b48" yAxisId={5} dot={false}/>
            <Line hide={!options['speed']} unit={labels['speed'][1]} name={json2['name'] + ' Speed'} type="monotone" dataKey='speed2' stroke="#fa9b48" yAxisId={5} dot={false} strokeDasharray='5 3'/>
        </ComposedChart>
    )
}



export default MyComposedChart;
